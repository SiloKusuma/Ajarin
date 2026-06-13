'use client';

interface SubjectSelectionProps {
  onSelect: (subject: string) => void;
}

export default function SubjectSelection({ onSelect }: SubjectSelectionProps) {
  const subjects = [
    {
      id: 'bahasa-indonesia',
      name: 'Bahasa Indonesia',
      emoji: '📖',
      description: 'Pelajari tata bahasa, sastra, dan komunikasi',
    },
    {
      id: 'informatika',
      name: 'Informatika',
      emoji: '💻',
      description: 'Belajar programming, algoritma, dan teknologi',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Apa yang Ingin Kamu Pelajari?
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Pilih mata pelajaran yang ingin Anda pelajari hari ini
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelect(subject.id)}
            className="group card p-8 text-center transform transition-all duration-300 hover:scale-105"
          >
            <div className="text-6xl mb-6">{subject.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{subject.name}</h2>
            <p className="text-gray-600 mb-6">{subject.description}</p>
            <div className="btn-primary inline-flex">
              Pilih
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
