import { useState } from 'react'

export default function StepInput({ onSubmit, initialTopic, initialMaterial }) {
  const [topic, setTopic] = useState(initialTopic || '')
  const [material, setMaterial] = useState(initialMaterial || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (topic.trim() && material.trim()) {
      onSubmit(topic.trim(), material.trim())
    }
  }

  const suggestions = [
    'Dasar-dasar Python Programming',
    'Sejarah Indonesia Modern',
    'Kalkulus Diferensial',
    'Tata Surya dan Planet',
    'Grammar Bahasa Inggris',
    'Ekonomi Mikro',
  ]

  return (
    <div className="fade-in">
      <div className="card max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="bi bi-pencil-square text-3xl text-primary-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Apa yang ingin kamu pelajari?</h2>
          <p className="text-gray-600 text-sm mt-2">
            Tulis topik dan materi yang ingin kamu kuasai hari ini.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1.5">
              Topik Pembelajaran
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Pemrograman Python Dasar"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-200 text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1.5">
              Detail Materi
            </label>
            <textarea
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Jelaskan secara detail apa yang ingin kamu pelajari. Semakin detail semakin baik hasilnya..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-200 text-sm resize-none"
              required
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Atau pilih topik rekomendasi:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setTopic(s)
                    setMaterial(`Saya ingin belajar tentang ${s.toLowerCase()}. Berikan materi pembelajaran yang lengkap dan terstruktur.`)
                  }}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-primary-50 text-gray-600 hover:text-primary-600 rounded-lg text-xs border border-gray-100 hover:border-primary-200 transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!topic.trim() || !material.trim()}
            className={`w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              topic.trim() && material.trim()
                ? 'btn-primary'
                : 'btn-disabled'
            }`}
          >
            Lanjutkan
            <i className="bi bi-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  )
}
