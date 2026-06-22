import { useState, useEffect } from 'react'

const loadingMessages = [
  'Menganalisis topik flashcard...',
  'Membuat pertanyaan-pertanyaan...',
  'Menyusun jawaban yang informatif...',
  'Mengoptimalkan kartu belajar...',
  'Menyiapkan tampilan interaktif...',
]

export default function FlashcardLoading() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fade-in">
      <div className="card max-w-lg mx-auto text-center py-12">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 bg-primary-200 rounded-full loading-pulse" />
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">AI Sedang Membuat Flashcard</h2>
        <p className="text-gray-500 text-sm mb-6">
          {loadingMessages[messageIndex]}
        </p>

        <div className="max-w-xs mx-auto">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Biasanya memakan waktu 10-30 detik
        </p>
      </div>
    </div>
  )
}
