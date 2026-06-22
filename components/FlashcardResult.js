import { useState } from 'react'

export default function FlashcardResult({ flashcards, topic, onReset }) {
  const [flippedIndex, setFlippedIndex] = useState(null)

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index)
  }

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Flashcard: {topic}</h2>
          <p className="text-gray-600 text-sm mt-1">
            Klik kartu untuk membalik dan melihat jawaban.
          </p>
        </div>
        <button
          onClick={onReset}
          className="btn-primary text-sm py-2.5 px-5 inline-flex items-center gap-2 whitespace-nowrap"
        >
          <i className="bi bi-plus-lg"></i>
          Buat Baru
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((card, index) => (
          <div
            key={index}
            className="perspective-container"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div
              className={`flashcard-inner ${flippedIndex === index ? 'flipped' : ''}`}
              onClick={() => handleFlip(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFlip(index) }}
            >
              <div className="flashcard-front">
                <div className="w-full h-full flex flex-col items-center justify-center p-5">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
                    <i className="bi bi-question-lg text-primary-600 text-lg"></i>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 text-center leading-relaxed">
                    {card.question}
                  </p>
                  <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                    <i className="bi bi-hand-index-thumb"></i>
                    Klik untuk jawaban
                  </p>
                </div>
              </div>
              <div className="flashcard-back">
                <div className="w-full h-full flex flex-col items-center justify-center p-5">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-3">
                    <i className="bi bi-check-lg text-green-600 text-lg"></i>
                  </div>
                  <p className="text-sm text-gray-700 text-center leading-relaxed">
                    {card.answer}
                  </p>
                  <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                    <i className="bi bi-hand-index-thumb"></i>
                    Klik kembali
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">
          {flashcards.length} kartu flashcard
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {flashcards.map((_, index) => (
            <button
              key={index}
              onClick={() => handleFlip(index)}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 ${
                flippedIndex === index
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
        <div className="flex items-start gap-3">
          <i className="bi bi-info-circle-fill text-yellow-600 mt-0.5"></i>
          <div>
            <p className="text-sm font-medium text-yellow-800">Informasi Penting</p>
            <p className="text-xs text-yellow-700 mt-0.5">
              Flashcard ini dihasilkan oleh AI dan mungkin memerlukan verifikasi lebih lanjut.
              Gunakan sebagai referensi belajar dan tetap kritis terhadap informasi yang diterima.
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="btn-primary text-sm py-2.5 px-5 inline-flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <i className="bi bi-plus-lg"></i>
          Buat Flashcard Baru
        </button>
      </div>
    </div>
  )
}
