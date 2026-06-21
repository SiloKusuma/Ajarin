import { useEffect, useRef, useState } from 'react'

export default function StepVerify({ onVerify, onBack, error }) {
  const widgetRef = useRef(null)
  const containerRef = useRef(null)
  const [token, setToken] = useState(null)
  const [widgetReady, setWidgetReady] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let attempts = 0
    const maxAttempts = 20

    const loadTurnstile = () => {
      if (window.turnstile) {
        setWidgetReady(true)
        if (containerRef.current && !widgetRef.current) {
          widgetRef.current = window.turnstile.render(containerRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAADon_UHtd4lagTDi',
            theme: 'light',
            callback: (t) => setToken(t),
            'expired-callback': () => setToken(null),
            'error-callback': () => setToken(null),
          })
        }
      } else if (attempts < maxAttempts) {
        attempts++
        setTimeout(loadTurnstile, 250)
      }
    }

    if (!document.querySelector('script[src*="turnstile"]')) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      script.onload = loadTurnstile
      document.head.appendChild(script)
    } else {
      loadTurnstile()
    }

    return () => {
      if (widgetRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetRef.current) } catch (e) {}
      }
    }
  }, [retryCount])

  const handleSubmit = () => {
    if (token) onVerify(token)
  }

  const handleRetry = () => {
    if (widgetRef.current && window.turnstile) {
      try { window.turnstile.remove(widgetRef.current) } catch (e) {}
      widgetRef.current = null
      setToken(null)
    }
    setRetryCount((c) => c + 1)
  }

  return (
    <div className="fade-in">
      <div className="card max-w-lg mx-auto text-center">
        <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <i className="bi bi-shield-check text-3xl text-primary-600"></i>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Verifikasi Keamanan</h2>
        <p className="text-gray-600 text-sm mb-6">
          Selesaikan verifikasi di bawah ini untuk memastikan kamu bukan robot.
        </p>

        <div className="flex justify-center mb-6">
          <div ref={containerRef} className="min-h-[65px]" />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 flex items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill"></i>
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2"
          >
            <i className="bi bi-arrow-left"></i>
            Kembali
          </button>
          <button
            onClick={handleSubmit}
            disabled={!token}
            className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              token ? 'btn-primary' : 'btn-disabled'
            }`}
          >
            Verifikasi & Lanjutkan
            <i className="bi bi-shield-fill-check"></i>
          </button>
        </div>

        <button
          onClick={handleRetry}
          className="mt-4 text-xs text-gray-400 hover:text-primary-600 transition-colors flex items-center gap-1 mx-auto"
        >
          <i className="bi bi-arrow-clockwise"></i>
          Muat ulang verifikasi
        </button>
      </div>
    </div>
  )
}
