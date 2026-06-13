"use client";

import { useMemo, useState } from 'react';

const subjects = [
  { id: 'bahasa', name: 'Bahasa Indonesia' },
  { id: 'informatika', name: 'Informatika' },
];

const levels = [
  { id: 'sd', name: 'SD' },
  { id: 'smp', name: 'SMP' },
  { id: 'sma', name: 'SMA' },
];

const defaultInterest = {
  hobi: '',
  makanan: '',
  minuman: '',
  barang: '',
};

const generatePrompt = (state: any) => {
  const { subject, level, topic, interests } = state;
  if (!subject || !level || !topic) return '';
  return `Buatkan materi pembelajaran singkat dan soal latihan berdasarkan:
- Mata pelajaran: ${subject}
- Tingkatan: ${level}
- Materi: ${topic}
- Hobi: ${interests.hobi}
- Makanan kesukaan: ${interests.makanan}
- Minuman kesukaan: ${interests.minuman}
- Barang kesukaan: ${interests.barang}

Buat materi yang menarik untuk pelajar ${level} dan sertakan 3 soal pilihan ganda serta pembahasan jawaban.`;
};

export default function HomePage() {
  const [step, setStep] = useState(0);
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');
  const [topic, setTopic] = useState('');
  const [interests, setInterests] = useState(defaultInterest);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [generated, setGenerated] = useState('');
  const [quizAnswer, setQuizAnswer] = useState('A');

  const prompt = useMemo(
    () => generatePrompt({ subject, level, topic, interests }),
    [subject, level, topic, interests]
  );

  const topics = subject === 'bahasa'
    ? ['Teks Eksplanasi', 'Pancasila', 'Kebudayaan']
    : ['Algoritma Dasar', 'Bahasa Pemrograman', 'Jaringan Komputer'];

  const handleGenerate = async () => {
    if (!subject || !level || !topic) return;
    const simulated = `Materi ${topic} untuk ${levels.find((item) => item.id === level)?.name || ''}.

1. Pengantar ${topic}
2. Konsep dasar yang penting
3. Contoh yang sesuai dengan hobi ${interests.hobi}

Soal latihan:
A. Pilihan A
B. Pilihan B
C. Pilihan C
D. Pilihan D

Jawaban benar: A
Pembahasan: ...`;
    setGenerated(simulated);
    setStep(4);
    setShowResult(false);
    setFeedback('');
  };

  const handleAnswerSubmit = () => {
    const correct = 'A';
    const isCorrect = quizAnswer === correct;
    setFeedback(isCorrect ? 'Benar! Jawaban kamu tepat.' : 'Salah. Jawaban yang benar adalah A.');
    setShowResult(true);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-brand-100 px-4 py-1 text-sm font-semibold text-brand-700">
              AI Learning Platform
            </span>
            <h1 className="text-4xl font-semibold sm:text-5xl">
              Belajar lebih personal dengan AI yang membuat materi dan latihan sesuai dirimu.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Mulai dengan memilih pelajaran, tingkatan, dan minatmu. AI akan membuatkan materi yang pas dan soal latihan agar belajar jadi lebih menyenangkan.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setStep(1)}
                className="shadow-button inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-3 text-base font-semibold text-white transition hover:bg-brand-600"
              >
                Mulai Belajar
              </button>
              <a
                href="#fitur"
                className="inline-flex items-center justify-center rounded-full border border-brand-200 bg-white px-8 py-3 text-base font-semibold text-brand-700 transition hover:bg-brand-50"
              >
                Lihat Fitur
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-brand-50 p-8 shadow-soft">
            <div className="space-y-5">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Ringkasan AI</p>
                <p className="mt-3 text-slate-700">AI akan membuat materi dan soal berdasarkan hobi, makanan, minuman, dan barang favoritmu.</p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">Topik</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">Personal Learning</p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">Platform</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">Modern & Clean</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="fitur" className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              { title: 'Personalisasi lengkap', description: 'Materi disesuaikan dengan hobi, makanan, minuman, dan barang favoritmu.' },
              { title: 'Pilihan pelajaran', description: 'Bahasa Indonesia dan Informatika untuk SD, SMP, dan SMA.' },
              { title: 'Latihan interaktif', description: 'Langsung coba jawab, jika salah kamu diberi jawaban dan pembahasan.' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Form Belajar</p>
            <h2 className="text-3xl font-semibold text-slate-900">Isi data belajarmu dan dapatkan materi yang dibuat AI.</h2>
            <p className="max-w-xl text-slate-600">Jawab beberapa pertanyaan berikut agar AI dapat menyesuaikan materi pembelajaran untukmu.</p>
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Mau belajar apa?</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {subjects.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSubject(item.id)}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${subject === item.id ? 'border-brand-500 bg-brand-50 text-brand-900' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300'}`}
                    >
                      <p className="font-semibold">{item.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Kamu duduk di bangku mana?</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {levels.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setLevel(item.id)}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${level === item.id ? 'border-brand-500 bg-brand-50 text-brand-900' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300'}`}
                    >
                      <p className="font-semibold">{item.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Materi apa yang ingin kamu pelajari?</label>
                <select
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-brand-500"
                >
                  <option value="">Pilih materi</option>
                  {topics.map((item) => (
                    <option value={item} key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Hobi</span>
                  <input
                    value={interests.hobi}
                    onChange={(event) => setInterests({ ...interests, hobi: event.target.value })}
                    placeholder="Contoh: menggambar"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-brand-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Makanan kesukaan</span>
                  <input
                    value={interests.makanan}
                    onChange={(event) => setInterests({ ...interests, makanan: event.target.value })}
                    placeholder="Contoh: bakso"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-brand-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Minuman kesukaan</span>
                  <input
                    value={interests.minuman}
                    onChange={(event) => setInterests({ ...interests, minuman: event.target.value })}
                    placeholder="Contoh: teh manis"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-brand-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Barang kesukaan</span>
                  <input
                    value={interests.barang}
                    onChange={(event) => setInterests({ ...interests, barang: event.target.value })}
                    placeholder="Contoh: sepeda"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-brand-500"
                  />
                </label>
              </div>
              <button
                onClick={handleGenerate}
                className="shadow-button w-full rounded-full bg-brand-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-brand-600"
              >
                Buat Materi dan Soal
              </button>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">Preview Hasil AI</h3>
            <p className="mt-3 text-slate-600">Konten akan muncul di sini setelah kamu memilih semua data belajar.</p>
            <div className="mt-6 space-y-4 rounded-3xl bg-slate-50 p-5 text-slate-700">
              {generated ? (
                <pre className="whitespace-pre-wrap text-sm leading-7">{generated}</pre>
              ) : (
                <p className="text-slate-500">Tidak ada konten. Lengkapi langkah di atas lalu tekan tombol.</p>
              )}
            </div>
            {generated && (
              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-lg font-semibold text-slate-900">Jawab Soal</p>
                <div className="mt-4 space-y-3">
                  {['A', 'B', 'C', 'D'].map((option) => (
                    <label key={option} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 transition hover:border-brand-300">
                      <input
                        type="radio"
                        name="quiz"
                        value={option}
                        checked={quizAnswer === option}
                        onChange={() => setQuizAnswer(option)}
                        className="h-5 w-5 accent-brand-500"
                      />
                      <span className="text-slate-700">Pilihan {option}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleAnswerSubmit}
                  className="mt-5 w-full rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                >
                  Kirim Jawaban
                </button>
                {showResult && (
                  <p className={`mt-4 rounded-2xl px-4 py-3 text-sm ${feedback.includes('Benar') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {feedback}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
