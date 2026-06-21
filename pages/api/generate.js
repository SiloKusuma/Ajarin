const systemPrompt = `Anda adalah asisten pendidikan AI yang ahli dalam membuat materi pembelajaran. 
Tugas Anda adalah membuat materi pembelajaran yang komprehensif, terstruktur, dan mudah dipahami dalam Bahasa Indonesia.

Format output menggunakan HTML yang rapi dengan struktur sebagai berikut:

<h2>Ringkasan Materi</h2>
<p>Paragraf ringkasan singkat tentang topik yang dibahas.</p>

<h2>Tujuan Pembelajaran</h2>
<ul>
<li>Tujuan 1</li>
<li>Tujuan 2</li>
<li>Tujuan 3</li>
</ul>

<h2>Penjelasan Detail</h2>
<p>Penjelasan mendalam tentang materi dengan sub-topik yang relevan.</p>

<h2>Contoh Penerapan</h2>
<p>Contoh konkret dan studi kasus yang relevan.</p>

<h2>Kesimpulan</h2>
<p>Kesimpulan dan poin-poin penting yang perlu diingat.</p>

Gunakan tag HTML semantik. Buatlah konten yang informatif, akurat, dan mudah dipahami oleh pembaca Indonesia. Panjang konten sekitar 800-1500 kata.`

const openrouterModels = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'openai/gpt-oss-120b:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'openai/gpt-oss-20b:free',
]

function extractContent(data) {
  return data?.choices?.[0]?.message?.content || null
}

function wrapContent(content) {
  if (!content) return null
  if (content.startsWith('<h2>') || content.startsWith('<h1>') || content.startsWith('<p>')) return content
  return `<h2>Ringkasan Materi</h2><p>${content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>`
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
          { role: 'user', content: `Topik: ${topic}\n\nDetail materi yang ingin dipelajari:\n${material}\n\nBuatkan materi pembelajaran yang komprehensif dan terstruktur sesuai dengan format yang telah ditentukan. Gunakan Bahasa Indonesia yang baik dan benar.` },
        ],
        temperature: 0.7,
        max_tokens: 8192,
        top_p: 0.9,
      }
    )
    return wrapContent(extractContent(data))
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
          { role: 'user', content: `Topik: ${topic}\n\nDetail materi yang ingin dipelajari:\n${material}\n\nBuatkan materi pembelajaran yang komprehensif dan terstruktur sesuai dengan format yang telah ditentukan. Gunakan Bahasa Indonesia yang baik dan benar.` },
        ],
        temperature: 0.7,
        max_tokens: 8192,
        top_p: 0.9,
      }
    )
    return wrapContent(extractContent(data))
  } catch (e) {
    console.error(`OpenRouter ${model} error:`, e.status, e.message)
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { topic, material, turnstileToken } = req.body

  if (!material || !topic) {
    return res.status(400).json({ error: 'Topik dan materi tidak boleh kosong' })
  }

  if (!turnstileToken) {
    return res.status(400).json({ error: 'Verifikasi Cloudflare diperlukan' })
  }

  try {
    const verifyRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY || '',
          response: turnstileToken,
        }),
      }
    )
    const verifyData = await verifyRes.json()
    if (!verifyData.success) {
      return res.status(400).json({ error: 'Verifikasi Cloudflare gagal. Silakan coba lagi.' })
    }
  } catch {
    return res.status(500).json({ error: 'Gagal memverifikasi Cloudflare. Coba lagi.' })
  }

  let content = await tryGroq(topic, material)

  if (!content) {
    for (const model of openrouterModels) {
      content = await tryOpenRouter(model, topic, material)
      if (content) break
    }
  }

  if (!content) {
    return res.status(503).json({ error: 'Semua model AI sedang sibuk. Silakan coba lagi nanti.' })
  }

  return res.status(200).json({ result: content })
}
