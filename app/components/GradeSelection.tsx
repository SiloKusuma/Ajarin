'use client';

interface GradeSelectionProps {
  onSelect: (grade: string) => void;
  onBack: () => void;
}

export default function GradeSelection({ onSelect, onBack }: GradeSelectionProps) {
  const grades = [
    { id: 'sd', name: 'Sekolah Dasar (SD)', description: 'Kelas 1-6' },
    { id: 'smp', name: 'Sekolah Menengah Pertama (SMP)', description: 'Kelas 7-9' },
    { id: 'sma', name: 'Sekolah Menengah Atas (SMA)', description: 'Kelas 10-12' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Kamu Duduk di Bangku Mana?
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Pilih tingkat sekolah Anda untuk konten yang sesuai
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {grades.map((grade) => (
          <button
            key={grade.id}
            onClick={() => onSelect(grade.id)}
            className="card p-6 text-center transform transition-all duration-300 hover:scale-105"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">{grade.name}</h2>
            <p className="text-gray-600 mb-6">{grade.description}</p>
            <div className="btn-primary inline-flex">
              Pilih
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="btn-secondary w-full"
      >
        ← Kembali
      </button>
    </div>
  );
}
