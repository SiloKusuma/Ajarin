import { NextResponse } from 'next/server';

const GROQ_API_URL = process.env.GROQ_API_URL;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(request: Request) {
  if (!GROQ_API_URL || !GROQ_API_KEY) {
    return NextResponse.json({ error: 'GROQ_API_URL and GROQ_API_KEY must be set in environment variables.' }, { status: 500 });
  }

  const body = await request.json();
  const { prompt } = body;

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      input: prompt,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    return NextResponse.json({ error: 'Failed to call Groq API', details: errorBody }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
