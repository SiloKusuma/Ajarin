const features = [
  {
    icon: 'bi-robot',
    title: 'AI Cerdas',
    description: 'Ditenagai AI Groq dengan model terbaru untuk menghasilkan materi pembelajaran yang akurat dan relevan.',
  },
  {
    icon: 'bi-file-text',
    title: 'Materi Terstruktur',
    description: 'Materi pembelajaran disusun secara sistematis dengan ringkasan, tujuan, penjelasan, contoh, dan kesimpulan.',
  },
  {
    icon: 'bi-lightning-charge',
    title: 'Proses Cepat',
    description: 'Hasil materi pembelajaran langsung muncul dalam hitungan detik. Tidak perlu menunggu lama.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Verifikasi Aman',
    description: 'Dilengkapi Cloudflare Turnstile untuk memastikan keamanan dan mencegah penyalahgunaan.',
  },
  {
    icon: 'bi-phone',
    title: 'Akses di Mana Saja',
    description: 'Tampilan responsif yang bisa diakses dari smartphone, tablet, maupun desktop.',
  },
  {
    icon: 'bi-bookmark-heart',
    title: 'Gratis & Mudah',
    description: 'Tidak perlu login atau berlangganan. Langsung bisa digunakan kapan saja.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Kenapa Memilih Ajarin?</h2>
          <p className="section-subtitle">
            Platform pembelajaran berbasis AI yang dirancang untuk membantu kamu memahami 
            materi dengan lebih baik dan lebih cepat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card group hover:border-primary-100 fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
                <i className={`bi ${feature.icon} text-2xl text-primary-600`}></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
