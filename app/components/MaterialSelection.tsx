'use client';

import { useState } from 'react';

interface MaterialSelectionProps {
  subject: string;
  grade: string;
  onSelect: (material: string) => void;
  onBack: () => void;
}

export default function MaterialSelection({ 
  subject, 
  grade, 
  onSelect, 
  onBack 
}: MaterialSelectionProps) {
  const [customMaterial, setCustomMaterial] = useState('');

  const getMaterialOptions = () => {
    const materials: Record<string, string[]> = {
      'bahasa-indonesia': [
        'Tata Bahasa Dasar',
        'Membaca dan Pemahaman',
        'Menulis Kreatif',
        'Puisi dan Sastra',
        'Komunikasi Lisan',
      ],
      'informatika': [
        'Algoritma Dasar',
        'Pemrograman Python',
        'Web Development',
        'Database',
        'Logika dan Struktur Data',
      ],
    };
    return materials[subject] || [];
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMaterial.trim()) {
      onSelect(customMaterial);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Materi Apa yang Ingin Dipelajari?
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Pilih materi standar atau ketik materi khusus Anda
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {getMaterialOptions().map((material) => (
          <button
            key={material}
            onClick={() => onSelect(material)}
            className="card p-6 text-left hover:border-amber-600 hover:shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{material}</h3>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="card p-6 mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Atau Masukkan Materi Khusus</h3>
        <form onSubmit={handleCustomSubmit} className="flex gap-4">
          <input
            type="text"
            value={customMaterial}
            onChange={(e) => setCustomMaterial(e.target.value)}
            placeholder="Contoh: Persamaan Kuadrat, Variable dalam Python, dll"
            className="flex-1"
          />
          <button type="submit" className="btn-primary">
            Gunakan
          </button>
        </form>
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
