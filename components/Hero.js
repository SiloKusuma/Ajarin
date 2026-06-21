import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <div className="absolute inset-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-36">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8 fade-in">
            <i className="bi bi-stars"></i>
            Platform Edukasi Berbasis AI
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6 slide-up">
            Belajar Jadi Lebih{' '}
            <span className="bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">
              Mudah & Cerdas
            </span>{' '}
            dengan AI
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 slide-up stagger-1">
            Ajarin menggunakan kecerdasan buatan untuk menghasilkan materi pembelajaran 
            yang personal, terstruktur, dan mudah dipahami. Tinggal masukkan topik, 
            dan biarkan AI yang mengajarimu.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up stagger-2">
            <Link
              href="/home"
              className="btn-primary text-base inline-flex items-center gap-2"
            >
              Mulai Belajar Gratis
              <i className="bi bi-arrow-right"></i>
            </Link>
            <Link
              href="#how-it-works"
              className="btn-outline text-base inline-flex items-center gap-2"
            >
              <i className="bi bi-play-circle"></i>
              Lihat Cara Kerja
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 slide-up stagger-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <i className="bi bi-lightning-charge-fill text-primary-500"></i>
              <span>Respons Cepat</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <i className="bi bi-shield-check-fill text-primary-500"></i>
              <span>Terpercaya</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <i className="bi bi-graph-up-arrow text-primary-500"></i>
              <span>Materi Terstruktur</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <i className="bi bi-globe text-primary-500"></i>
              <span>Bahasa Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
