'use client';

import { useState, useEffect } from 'react';

interface UserProfile {
  subject: string;
  grade: string;
  material: string;
  interests: {
    hobby: string;
    favoriteFood: string;
    favoriteDrink: string;
    favoriteItem: string;
  };
}

interface LearningInterfaceProps {
  userProfile: UserProfile;
}

interface Content {
  material: string;
  questions: string[];
}

export default function LearningInterface({ userProfile }: LearningInterfaceProps) {
  const [content, setContent] = useState<Content | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    generateContent();
  }, [userProfile]);

  const generateContent = async () => {
    setIsLoading(true);
    try {
      // Generate material
      const materialResponse = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Buatlah penjelasan materi "${userProfile.material}" untuk siswa ${userProfile.grade}. 
          Format: Gunakan contoh yang terkait dengan hobi (${userProfile.interests.hobby}), makanan favorit (${userProfile.interests.favoriteFood}), dan minuman favorit (${userProfile.interests.favoriteDrink}).
          Jelaskan dengan cara yang fun dan mudah dipahami. Maksimal 300 kata.`,
          userProfile,
          type: 'material',
        }),
      });

      const materialData = await materialResponse.json();
      const material = materialData.content;

      // Generate questions
      const questionsResponse = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Buatlah 5 soal pilihan ganda tentang "${userProfile.material}" untuk siswa ${userProfile.grade}.
          Format: 
          1. [SOAL]: Pertanyaan?
             A) Opsi A
             B) Opsi B
             C) Opsi C
             D) Opsi D
             [JAWABAN]: C
          
          Gunakan contoh yang terkait dengan hobi mereka (${userProfile.interests.hobby}). Buat soal yang sesuai untuk level ${userProfile.grade}.`,
          userProfile,
          type: 'question',
        }),
      });

      const questionsData = await questionsResponse.json();
      const questionsText = questionsData.content;

      // Parse questions
      const questions = questionsText.split(/\d+\.\s+/).filter(Boolean);

      setContent({
        material,
        questions,
      });
      setTotalQuestions(questions.length);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating content:', error);
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;

    // Get correct answer
    const answerResponse = await fetch('/api/groq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Dari soal berikut, berikan jawaban yang benar dan penjelasan singkat:
        ${content?.questions[currentQuestionIndex]}`,
        userProfile,
        type: 'explanation',
      }),
    });

    const answerData = await answerResponse.json();
    setCorrectAnswer(answerData.content);
    setShowAnswer(true);

    // Assume user got it correct for scoring (in production, you'd validate against correct answer)
    if (currentQuestionIndex === content!.questions.length - 1) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (content?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setShowAnswer(false);
      setCorrectAnswer('');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Menghasilkan Materi Pembelajaran...</h2>
        <p className="text-gray-600">Sedang membuat konten yang dipersonalisasi khusus untuk Anda</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <p className="text-red-500">Gagal membuat materi. Silakan coba lagi.</p>
      </div>
    );
  }

  const isLastQuestion = currentQuestionIndex === content.questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Material Section */}
      {currentQuestionIndex === 0 && !showAnswer && (
        <div className="card mb-8 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            📚 Materi Pembelajaran
          </h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {content.material}
          </div>
          <button
            onClick={() => setShowAnswer(true)}
            className="btn-primary mt-8"
          >
            Lanjut ke Soal →
          </button>
        </div>
      )}

      {/* Questions Section */}
      {showAnswer || currentQuestionIndex > 0 ? (
        <div className="card mb-8 p-8">
          {/* Progress */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">
                Soal {currentQuestionIndex + 1} dari {content.questions.length}
              </h3>
              <div className="text-sm text-gray-600">
                Skor: {score}/{totalQuestions}
              </div>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / content.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {content.questions[currentQuestionIndex]?.split('[SOAL]:')[1]?.split('A)')[0]?.trim()}
          </h3>

          {/* Answer Input */}
          {!showAnswer ? (
            <div className="space-y-4 mb-8">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Ketik jawaban Anda di sini..."
                className="w-full h-32"
              />
              <button
                onClick={handleSubmitAnswer}
                className="btn-primary w-full"
              >
                Kirim Jawaban
              </button>
            </div>
          ) : (
            <div className="mb-8">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
                <h4 className="font-bold text-green-900 mb-2">✓ Jawaban yang Benar:</h4>
                <p className="text-green-800 whitespace-pre-wrap">{correctAnswer}</p>
              </div>

              {isLastQuestion ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    🎉 Selamat! Anda telah menyelesaikan latihan
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Skor Akhir: {score + 1}/{totalQuestions}
                  </p>
                  <a href="/" className="btn-primary">
                    Kembali ke Beranda
                  </a>
                </div>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="btn-primary w-full"
                >
                  Soal Berikutnya →
                </button>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
