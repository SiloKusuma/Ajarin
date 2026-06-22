import Head from 'next/head'
import { useState, useRef } from 'react'
import FlashcardInput from '@/components/FlashcardInput'
import FlashcardLoading from '@/components/FlashcardLoading'
import FlashcardResult from '@/components/FlashcardResult'

export default function FlashcardPage() {
  const [step, setStep] = useState(1)
  const [material, setMaterial] = useState('')
  const [topic, setTopic] = useState('')
  const [flashcards, setFlashcards] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const resultRef = useRef(null)

  const handleInputSubmit = (inputTopic, inputMaterial) => {
    setTopic(inputTopic)
    setMaterial(inputMaterial)
    generateFlashcards(inputTopic, inputMaterial)
  }

  const generateFlashcards = async (inputTopic, inputMaterial) => {
    setLoading(true)
    setError(null)
    setStep(2)

    try {
      const res = await fetch('/api/generate-flashcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: inputTopic,
          material: inputMaterial,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Terjadi kesalahan')
      }

      setFlashcards(data.flashcards)
      setStep(3)
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      setError(err.message)
      setStep(1)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStep(1)
    setMaterial('')
    setTopic('')
    setFlashcards(null)
    setError(null)
    setLoading(false)
  }

  const steps = [
    { num: 1, label: 'Masukkan Topik' },
    { num: 2, label: 'Proses AI' },
    { num: 3, label: 'Flashcard' },
  ]

  return (
    <>
      <Head>
        <title>Flashcard - Ajarin | Platform Edukasi AI</title>
        <meta name="description" content="Buat flashcard interaktif dengan Ajarin. Masukkan topik pembelajaran dan dapatkan kartu belajar dengan sistem 3D flip card yang menarik." />
        <meta name="keywords" content="flashcard, kartu belajar, belajar AI, flashcards interaktif, 3D flip card, edukasi AI Indonesia" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ajarin.vercel.app/flashcard" />

        <meta property="og:title" content="Flashcard - Ajarin | Platform Edukasi AI" />
        <meta property="og:description" content="Buat flashcard interaktif dengan sistem 3D flip card yang menarik." />
        <meta property="og:url" content="https://ajarin.vercel.app/flashcard" />

        <meta name="twitter:title" content="Flashcard - Ajarin | Platform Edukasi AI" />
        <meta name="twitter:description" content="Buat flashcard interaktif dengan sistem 3D flip card yang menarik." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Flashcard Interaktif</h1>
            <p className="text-gray-600 mt-2">Buat kartu belajar dengan efek 3D flip yang menarik</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center max-w-lg mx-auto">
              {steps.map((s, i) => (
                <div key={s.num} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    {i > 0 && (
                      <div className={`flex-1 h-0.5 ${step > i ? 'bg-green-400' : 'bg-gray-200'}`} />
                    )}
                    {i === 0 && <div className="flex-1" />}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                      ${step === s.num ? 'step-number' :
                        step > s.num ? 'step-number-completed' : 'step-number-inactive'}
                    `}>
                      {step > s.num ? <i className="bi bi-check-lg"></i> : s.num}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 ${step > s.num ? 'bg-green-400' : 'bg-gray-200'}`} />
                    )}
                    {i === steps.length - 1 && <div className="flex-1" />}
                  </div>
                  <span className={`text-xs mt-2 hidden sm:block text-center ${step >= s.num ? 'text-primary-600 font-medium' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-100 rounded-xl fade-in">
              <div className="flex items-center gap-3">
                <i className="bi bi-exclamation-triangle-fill text-red-500"></i>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="min-h-[400px]">
            {step === 1 && (
              <FlashcardInput onSubmit={handleInputSubmit} initialTopic={topic} initialMaterial={material} />
            )}

            {step === 2 && (
              <FlashcardLoading />
            )}

            {step === 3 && flashcards && (
              <div ref={resultRef}>
                <FlashcardResult flashcards={flashcards} topic={topic} onReset={handleReset} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
