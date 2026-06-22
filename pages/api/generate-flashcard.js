const systemPrompt = `Anda adalah asisten pendidikan AI yang ahli dalam membuat flashcard (kartu belajar).
Tugas Anda adalah membuat 10-12 flashcard dalam format JSON array.

Setiap flashcard harus memiliki:
- "question": Pertanyaan singkat dan jelas dalam Bahasa Indonesia
- "answer": Jawaban lengkap dan informatif dalam Bahasa Indonesia

Buatlah flashcard yang bervariasi: dari pertanyaan dasar hingga lanjutan.
Pastikan jawaban akurat, padat, dan mudah dipahami.

Keluarkan HANYA JSON array tanpa markdown formatting atau teks lain.
Contoh format output:
[
  {
    "question": "Apa itu Python?",
    "answer": "Python adalah bahasa pemrograman tingkat tinggi yang mudah dipelajari dan banyak digunakan untuk pengembangan web, data science, dan automasi."
  },
  {
    "question": "Apa itu variabel dalam Python?",
    "answer": "Variabel adalah tempat penyimpanan data yang memiliki nama. Dalam Python, variabel dibuat dengan menulis nama variabel diikuti tanda sama dengan (=) dan nilainya."
  }
]`

const openrouterModels = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'openai/gpt-oss-120b:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'openai/gpt-oss-20b:free',
]

function extractContent(data) {
  return data?.choices?.[0]?.message?.content || null
}

function parseFlashcards(content) {
  if (!content) return null
  let cleaned = content.replace(/```json\s*/gi, '').replace(/```\s*$/g, '').trim()
  try {
    const parsed = JSON.parse(cleaned)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
  } catch {
    try {
      const match = cleaned.match(/\[[\s\S]*\]/)
      if (match) {
        const parsed = JSON.parse(match[0])
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      return null
    }
  }
  return null
}

async function callAPI(url, headers, body) {
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
  const data = await res.json()
  if (!res.ok) {
    const err = new Error(data?.error?.message || `HTTP ${res.status}`)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

async function tryGroq(topic, material) {
  if (!process.env.GROQ_API_KEY) return null
  try {
    const data = await callAPI(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      {
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Topik: ${topic}\n\nDetail materi:\n${material}\n\nBuatkan 10-12 flashcard tentang topik ini dalam Bahasa Indonesia.` },
        ],
        temperature: 0.7,
        max_tokens: 8192,
        top_p: 0.9,
      }
    )
    return parseFlashcards(extractContent(data))
  } catch (e) {
    console.error('Groq error:', e.status, e.message)
    return null
  }
}

async function tryOpenRouter(model, topic, material) {
  if (!process.env.OPENROUTER_API_KEY) return null
  try {
    const data = await callAPI(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://ajarin.vercel.app',
        'X-Title': 'Ajarin',
      },
      {
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Topik: ${topic}\n\nDetail materi:\n${material}\n\nBuatkan 10-12 flashcard tentang topik ini dalam Bahasa Indonesia.` },
        ],
        temperature: 0.7,
        max_tokens: 8192,
        top_p: 0.9,
      }
    )
    return parseFlashcards(extractContent(data))
  } catch (e) {
    console.error(`OpenRouter ${model} error:`, e.status, e.message)
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { topic, material } = req.body

  if (!topic || !material) {
    return res.status(400).json({ error: 'Topik dan materi tidak boleh kosong' })
  }

  let flashcards = await tryGroq(topic, material)

  if (!flashcards) {
    for (const model of openrouterModels) {
      flashcards = await tryOpenRouter(model, topic, material)
      if (flashcards) break
    }
  }

  if (!flashcards) {
    return res.status(503).json({ error: 'Semua model AI sedang sibuk. Silakan coba lagi nanti.' })
  }

  return res.status(200).json({ flashcards })
}
