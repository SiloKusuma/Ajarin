import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const isHome = router.pathname === '/home'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [router.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/#features', label: 'Fitur' },
    { href: '/#how-it-works', label: 'Cara Kerja' },
    ...(isHome ? [] : [{ href: '/home', label: 'Mulai Belajar' }]),
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white transition-all duration-200">
              <i className="bi bi-book-fill text-sm"></i>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Ajar<span className="text-primary-600">in</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  router.pathname === link.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isHome && (
              <Link
                href="/home"
                className="ml-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200"
              >
                Mulai Belajar
              </Link>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setMenuOpen(false)} />
          <div className="relative bg-white shadow-lg border-t border-gray-100 px-4 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    router.pathname === link.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!isHome && (
                <Link
                  href="/home"
                  className="mt-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-5 py-3 rounded-lg text-center transition-all duration-200"
                >
                  Mulai Belajar
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
