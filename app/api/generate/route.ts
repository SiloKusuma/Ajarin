import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const GROQ_API_URL = process.env.GROQ_API_URL ?? 'https://api.groq.com/v1/responses';
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL ?? 'openai/gpt-oss-120b';

function extractTextFromGroqResponse(data: any) {
  if (!data) return '';
  if (typeof data === 'string') return data;

  const output = data.output ?? data.outputs ?? data?.response?.output ?? data?.results ?? data?.choices;
  if (!output) return JSON.stringify(data, null, 2);

  const segments: string[] = [];
  const items = Array.isArray(output) ? output : [output];

  for (const item of items) {
    if (typeof item === 'string') {
      segments.push(item);
      continue;
    }

    const contents = item?.content ?? item?.message?.content ?? item?.text ?? item;
    if (typeof contents === 'string') {
      segments.push(contents);
      continue;
    }

    if (Array.isArray(contents)) {
      for (const contentItem of contents) {
        if (typeof contentItem === 'string') {
          segments.push(contentItem);
        } else if (contentItem?.text) {
          segments.push(contentItem.text);
        } else if (contentItem?.type === 'output_text' && contentItem?.text) {
          segments.push(contentItem.text);
        }
      }
    }
  }

  return segments.join('\n\n') || JSON.stringify(data, null, 2);
}

export async function POST(request: Request) {
  if (!GROQ_API_KEY) {
    return NextResponse.json(
      { error: 'GROQ_API_KEY must be set in environment variables.' },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { prompt } = body;

  if (!prompt || !prompt.toString().trim()) {
    return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        input: prompt,
        temperature: 0.7,
        max_output_tokens: 1200,
      }),
    });

    const responseText = await response.text();
    let data: any;

    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch {
      data = responseText;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'Failed to call Groq API.',
          status: response.status,
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      text: extractTextFromGroqResponse(data),
      raw: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to call Groq API.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
