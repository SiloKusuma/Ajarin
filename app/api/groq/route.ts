import { NextRequest, NextResponse } from 'next/server';

interface GroqRequestBody {
  prompt: string;
  userProfile: {
    subject: string;
    grade: string;
    material: string;
    interests: {
      hobby: string;
      favoriteFood: string;
      favoriteDrink: string;
      favoriteItem: string;
    };
  };
  type: 'material' | 'question' | 'explanation';
}

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      );
    }

    const body: GroqRequestBody = await req.json();

    const systemPrompt = `Anda adalah asisten pengajar AI yang ahli. Buatlah konten pembelajaran yang dipersonalisasi untuk siswa.

Informasi Siswa:
- Mata Pelajaran: ${body.userProfile.subject}
- Tingkat: ${body.userProfile.grade}
- Materi: ${body.userProfile.material}
- Hobi: ${body.userProfile.interests.hobby}
- Makanan Favorit: ${body.userProfile.interests.favoriteFood}
- Minuman Favorit: ${body.userProfile.interests.favoriteDrink}
- Barang Favorit: ${body.userProfile.interests.favoriteItem}

Sesuaikan semua konten dengan preferensi dan minat siswa. Gunakan contoh yang relevan dengan hobi dan kesukaan mereka. Buat konten yang engaging dan mudah dipahami.`;

    const messages = [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: body.prompt,
      },
    ];

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages,
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate content', details: errorData },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return NextResponse.json({ content });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
