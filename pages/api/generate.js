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
  } catch (cfError) {
    return res.status(500).json({ error: 'Gagal memverifikasi Cloudflare. Coba lagi.' })
  }

  try {
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

    const userPrompt = `Topik: ${topic}

Detail materi yang ingin dipelajari:
${material}

Buatkan materi pembelajaran yang komprehensif dan terstruktur sesuai dengan format yang telah ditentukan. Gunakan Bahasa Indonesia yang baik dan benar.`

    const groqRes = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 8192,
          top_p: 0.9,
        }),
      }
    )

    const groqData = await groqRes.json()

    if (!groqRes.ok) {
      console.error('Groq API error:', groqData)
      const errorMsg = groqData?.error?.message || 'Gagal menghasilkan materi'
      return res.status(500).json({ error: errorMsg })
    }

    const content = groqData.choices?.[0]?.message?.content

    if (!content) {
      return res.status(500).json({ error: 'AI tidak menghasilkan konten. Coba lagi.' })
    }

    const wrappedContent = content.startsWith('<h2>') || content.startsWith('<h1>') || content.startsWith('<p>')
      ? content
      : `<h2>Ringkasan Materi</h2><p>${content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>`

    return res.status(200).json({ result: wrappedContent })
  } catch (error) {
    console.error('Generation error:', error)
    return res.status(500).json({ error: 'Terjadi kesalahan saat menghasilkan materi. Silakan coba lagi.' })
  }
}
