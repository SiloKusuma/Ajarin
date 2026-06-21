import Link from 'next/link'

const steps = [
  {
    number: 1,
    icon: 'bi-pencil-square',
    title: 'Masukkan Materi',
    description: 'Tulis topik atau materi yang ingin kamu pelajari. Bisa apa saja, dari matematika hingga sejarah.',
  },
  {
    number: 2,
    icon: 'bi-shield-check',
    title: 'Verifikasi Keamanan',
    description: 'Selesaikan verifikasi Cloudflare Turnstile untuk memastikan kamu bukan robot.',
  },
  {
    number: 3,
    icon: 'bi-magic',
    title: 'Dapatkan Hasil',
    description: 'AI akan memproses dan menghasilkan materi yang terstruktur, mudah dipahami',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Bagaimana Cara Kerjanya?</h2>
          <p className="section-subtitle">
            Hanya 3 langkah mudah untuk mulai belajar. Tidak perlu ribet, tidak perlu daftar.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i className={`bi ${step.icon} text-3xl text-primary-600`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="text-center mt-12 fade-in">
          <Link href="/home" className="btn-primary inline-flex items-center gap-2">
            Mulai Sekarang
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
