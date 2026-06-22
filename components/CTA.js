import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 fade-in">
          Siap untuk Belajar Lebih Efektif?
        </h2>
        <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-10 fade-in stagger-1">
          Mulai sekarang juga! Tidak perlu login, tidak perlu bayar. 
          Cukup masukkan topik yang ingin kamu pelajari, dan biarkan AI membantu.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in stagger-2">
          <Link
            href="/home"
            className="bg-white text-primary-700 font-semibold py-4 px-10 rounded-xl text-lg transition-colors duration-200 inline-flex items-center gap-2 hover:bg-primary-50"
          >
            Mulai Belajar Gratis
            <i className="bi bi-arrow-right"></i>
          </Link>
          <Link
            href="#features"
            className="border-2 border-white/30 text-white hover:bg-white/10 font-medium py-4 px-10 rounded-xl text-lg transition-all duration-200 inline-flex items-center gap-2"
          >
            <i className="bi bi-info-circle"></i>
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </div>
    </section>
  )
}
