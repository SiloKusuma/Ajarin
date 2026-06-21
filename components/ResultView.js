export default function ResultView({ result, onReset }) {
  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Hasil Pembelajaran</h2>
          <p className="text-gray-600 text-sm mt-1">
            Materi pembelajaran telah siap untuk kamu pelajari.
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

      <div className="card !p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-blue-500 px-6 py-4">
          <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
            <i className="bi bi-robot"></i>
            <span>Dihasilkan oleh AI</span>
          </div>
          <p className="text-white text-sm opacity-90">
            Selamat belajar! Materi ini dibuat khusus untukmu.
          </p>
        </div>

        <div className="px-6 py-8">
          <div
            className="prose prose-sm sm:prose-base max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-code:text-primary-600 prose-code:bg-primary-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
        <div className="flex items-start gap-3">
          <i className="bi bi-info-circle-fill text-yellow-600 mt-0.5"></i>
          <div>
            <p className="text-sm font-medium text-yellow-800">Informasi Penting</p>
            <p className="text-xs text-yellow-700 mt-0.5">
              Materi ini dihasilkan oleh AI dan mungkin memerlukan verifikasi lebih lanjut. 
              Gunakan sebagai referensi belajar dan tetap kritis terhadap informasi yang diterima.
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="btn-primary text-sm py-2.5 px-5 inline-flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <i className="bi bi-plus-lg"></i>
          Buat Materi Baru
        </button>
      </div>
    </div>
  )
}
