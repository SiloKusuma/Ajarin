import Head from 'next/head'
import { useState, useRef, useCallback } from 'react'
import StepInput from '@/components/StepInput'
import StepVerify from '@/components/StepVerify'
import StepLoading from '@/components/StepLoading'
import ResultView from '@/components/ResultView'

export default function HomePage() {
  const [step, setStep] = useState(1)
  const [material, setMaterial] = useState('')
  const [topic, setTopic] = useState('')
  const [turnstileToken, setTurnstileToken] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const resultRef = useRef(null)

  const handleInputSubmit = useCallback((inputTopic, inputMaterial) => {
    setTopic(inputTopic)
    setMaterial(inputMaterial)
    setStep(2)
  }, [])

  const handleVerify = useCallback((token) => {
    setTurnstileToken(token)
    generateContent(token)
  }, [])

  const generateContent = async (token) => {
    setLoading(true)
    setError(null)
    setStep(3)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          material,
          turnstileToken: token,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Terjadi kesalahan')
      }

      setResult(data.result)
      setStep(4)
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      setError(err.message)
      setStep(2)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStep(1)
    setMaterial('')
    setTopic('')
    setTurnstileToken(null)
    setResult(null)
    setError(null)
    setLoading(false)
  }

  const handleBack = () => {
    if (step === 2) setStep(1)
  }

  const steps = [
    { num: 1, label: 'Masukkan Materi' },
    { num: 2, label: 'Verifikasi' },
    { num: 3, label: 'Proses AI' },
    { num: 4, label: 'Hasil' },
  ]

  return (
    <>
      <Head>
        <title>Mulai Belajar - Ajarin | Platform Edukasi AI</title>
        <meta name="description" content="Mulai belajar dengan Ajarin. Masukkan topik pembelajaran, verifikasi keamanan, dan dapatkan materi pembelajaran terstruktur yang dihasilkan oleh AI secara instan." />
        <meta name="keywords" content="belajar AI, materi pembelajaran, kursus online, edukasi AI Indonesia, belajar gratis" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ajarin.vercel.app/home" />

        <meta property="og:title" content="Mulai Belajar - Ajarin | Platform Edukasi AI" />
        <meta property="og:description" content="Masukkan topik pembelajaran dan dapatkan materi terstruktur dari AI secara instan." />
        <meta property="og:url" content="https://ajarin.vercel.app/home" />

        <meta name="twitter:title" content="Mulai Belajar - Ajarin | Platform Edukasi AI" />
        <meta name="twitter:description" content="Masukkan topik pembelajaran dan dapatkan materi terstruktur dari AI secara instan." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mulai Belajar</h1>
            <p className="text-gray-600 mt-2">Ikuti 3 langkah mudah untuk mendapatkan materi pembelajaran</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                      ${step === s.num ? 'step-number shadow-lg shadow-primary-200' :
                        step > s.num ? 'step-number-completed' : 'step-number-inactive'}
                    `}>
                      {step > s.num ? <i className="bi bi-check-lg"></i> : s.num}
                    </div>
                    <span className={`text-xs mt-2 hidden sm:block ${step >= s.num ? 'text-primary-600 font-medium' : 'text-gray-400'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 mt-[-1.5rem] transition-colors duration-300 ${
                      step > s.num ? 'bg-green-400' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="min-h-[400px]">
            {step === 1 && (
              <StepInput onSubmit={handleInputSubmit} initialTopic={topic} initialMaterial={material} />
            )}

            {step === 2 && (
              <StepVerify
                onVerify={handleVerify}
                onBack={handleBack}
                error={error}
              />
            )}

            {step === 3 && (
              <StepLoading />
            )}

            {step === 4 && result && (
              <div ref={resultRef}>
                <ResultView result={result} onReset={handleReset} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
