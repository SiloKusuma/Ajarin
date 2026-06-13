'use client';

import { useState } from 'react';

interface Interest {
  hobby: string;
  favoriteFood: string;
  favoriteDrink: string;
  favoriteItem: string;
}

interface InterestSelectionProps {
  onSelect: (interests: Interest) => void;
  onBack: () => void;
}

export default function InterestSelection({ onSelect, onBack }: InterestSelectionProps) {
  const [interests, setInterests] = useState<Interest>({
    hobby: '',
    favoriteFood: '',
    favoriteDrink: '',
    favoriteItem: '',
  });

  const [errors, setErrors] = useState<Partial<Interest>>({});

  const handleChange = (field: keyof Interest, value: string) => {
    setInterests({ ...interests, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Interest> = {};

    Object.entries(interests).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof Interest] = 'Wajib diisi';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSelect(interests);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Ceritakan Minat Anda
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Informasi ini membantu kami membuat konten pembelajaran yang personal untuk Anda
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-bold text-gray-900 mb-3">
            🎯 Apa hobi Anda?
          </label>
          <input
            type="text"
            value={interests.hobby}
            onChange={(e) => handleChange('hobby', e.target.value)}
            placeholder="Contoh: Bermain game, membaca, olahraga, dsb"
            className={`w-full ${errors.hobby ? 'border-red-500' : ''}`}
          />
          {errors.hobby && <p className="text-red-500 text-sm mt-1">{errors.hobby}</p>}
        </div>

        <div>
          <label className="block font-bold text-gray-900 mb-3">
            🍕 Apa makanan favorit Anda?
          </label>
          <input
            type="text"
            value={interests.favoriteFood}
            onChange={(e) => handleChange('favoriteFood', e.target.value)}
            placeholder="Contoh: Pizza, soto ayam, nasi goreng, dsb"
            className={`w-full ${errors.favoriteFood ? 'border-red-500' : ''}`}
          />
          {errors.favoriteFood && <p className="text-red-500 text-sm mt-1">{errors.favoriteFood}</p>}
        </div>

        <div>
          <label className="block font-bold text-gray-900 mb-3">
            🥤 Apa minuman favorit Anda?
          </label>
          <input
            type="text"
            value={interests.favoriteDrink}
            onChange={(e) => handleChange('favoriteDrink', e.target.value)}
            placeholder="Contoh: Jus jeruk, teh, kopi, dsb"
            className={`w-full ${errors.favoriteDrink ? 'border-red-500' : ''}`}
          />
          {errors.favoriteDrink && <p className="text-red-500 text-sm mt-1">{errors.favoriteDrink}</p>}
        </div>

        <div>
          <label className="block font-bold text-gray-900 mb-3">
            ✨ Apa barang/item favorit Anda?
          </label>
          <input
            type="text"
            value={interests.favoriteItem}
            onChange={(e) => handleChange('favoriteItem', e.target.value)}
            placeholder="Contoh: Headphone, jam tangan, novel, dsb"
            className={`w-full ${errors.favoriteItem ? 'border-red-500' : ''}`}
          />
          {errors.favoriteItem && <p className="text-red-500 text-sm mt-1">{errors.favoriteItem}</p>}
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary flex-1"
          >
            ← Kembali
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
          >
            Lanjutkan →
          </button>
        </div>
      </form>
    </div>
  );
}
