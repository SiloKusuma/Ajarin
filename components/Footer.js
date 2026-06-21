import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white">
                <i className="bi bi-book-fill text-sm"></i>
              </div>
              <span className="text-xl font-bold text-white">
                Ajar<span className="text-primary-400">in</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Platform edukasi berbasis AI yang membantu kamu belajar lebih cerdas, 
              lebih cepat, dan lebih efektif. Materi pembelajaran dihasilkan secara 
              otomatis oleh AI untuk pengalaman belajar yang personal.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/#features" className="text-sm text-gray-400 hover:text-white transition-colors">Fitur</Link></li>
              <li><Link href="/#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">Cara Kerja</Link></li>
              <li><Link href="/home" className="text-sm text-gray-400 hover:text-white transition-colors">Mulai Belajar</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Ikuti Kami</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"><i className="bi bi-github"></i> GitHub</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"><i className="bi bi-twitter-x"></i> Twitter</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"><i className="bi bi-instagram"></i> Instagram</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"><i className="bi bi-linkedin"></i> LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {year} Ajarin. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
