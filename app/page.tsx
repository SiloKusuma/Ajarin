'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-amber-600">
            AJARIN
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-600 hover:text-amber-600 transition">Fitur</a>
            <a href="#about" className="text-gray-600 hover:text-amber-600 transition">Tentang</a>
            <Link href="/learn" className="btn-primary">
              Mulai Belajar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Belajar dengan <span className="text-amber-600">AI yang Personal</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Platform belajar cerdas yang memahami Anda. Materi dan soal disesuaikan dengan minat, hobi, dan gaya belajar unik Anda.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link href="/learn" className="btn-primary text-lg px-8 py-3">
              Mulai Sekarang
            </Link>
            <a href="#features" className="btn-secondary text-lg px-8 py-3">
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Mengapa Memilih AJARIN?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalisasi Penuh</h3>
              <p className="text-gray-600">
                Setiap materi disesuaikan berdasarkan minat dan gaya belajar unik Anda.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Canggih</h3>
              <p className="text-gray-600">
                Teknologi AI terbaru untuk menciptakan pengalaman belajar yang efektif.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Berbagai Mata Pelajaran</h3>
              <p className="text-gray-600">
                Bahasa Indonesia, Informatika, dan lebih banyak lagi untuk semua tingkat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-amber-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Bagaimana AJARIN Bekerja?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { num: 1, title: 'Pilih Mata Pelajaran', desc: 'Pilih antara Bahasa Indonesia atau Informatika' },
              { num: 2, title: 'Tentukan Tingkat', desc: 'Pilih tingkat sekolah (SD, SMP, SMA)' },
              { num: 3, title: 'Bagikan Minat', desc: 'Ceritakan hobi dan kesukaan Anda' },
              { num: 4, title: 'Mulai Belajar', desc: 'Dapatkan materi dan soal yang personal' },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="bg-white rounded-lg p-6 text-center h-full border-2 border-amber-600">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Tentang AJARIN
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            AJARIN adalah platform pembelajaran inovatif yang menggabungkan kecerdasan buatan dengan personalisasi mendalam. Kami percaya bahwa setiap siswa memiliki gaya belajar unik, dan platform kami dirancang untuk mengakomodasi kebutuhan individual tersebut.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Dengan memahami minat dan preferensi Anda, kami menciptakan pengalaman belajar yang tidak hanya efektif tetapi juga menyenangkan dan engaging.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-amber-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Siap untuk Belajar?</h2>
          <p className="text-xl mb-12 opacity-90">
            Mulai perjalanan belajar Anda hari ini dengan AJARIN
          </p>
          <Link href="/learn" className="inline-flex items-center justify-center px-8 py-3 bg-white text-amber-600 font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105 text-lg">
            Mulai Sekarang
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 AJARIN. Platform Belajar AI yang Personal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = marqueeRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const o = (window.scrollY - sectionTop + window.innerHeight) * 0.24;
      setOffset(o);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const workCards = [
    {
      title: 'Product Launch',
      subtitle: 'Bold visuals for immersive campaigns',
      accent: 'Neon motion systems',
    },
    {
      title: 'Brand System',
      subtitle: '3D identity, typography, and vivid color',
      accent: 'Gradient lighting',
    },
    {
      title: 'Interactive Scene',
      subtitle: 'Animated assets for web and pitch decks',
      accent: 'Spatial storytelling',
    },
  ];

  const projectRows = [
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517457373958-d7804e6f6b56?auto=format&fit=crop&w=1200&q=80',
  ];

  const galleryItems = [
    { label: 'Concept', accent: '#F6AE2D' },
    { label: 'Render', accent: '#FF6B6B' },
    { label: 'Motion', accent: '#6A4C93' },
    { label: 'Detail', accent: '#3A86FF' },
  ];

  return (
    <main className="min-h-screen main-wrapper bg-[#07070D] text-[#E6EDF6]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,113,173,0.18),_transparent_16%),radial-gradient(circle_at_bottom_right,_rgba(255,156,64,0.12),_transparent_22%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-10">
          <FadeIn as="nav" className="flex flex-wrap items-center justify-between gap-4 text-sm uppercase tracking-[0.32em] text-[#A2B2CC]" delay={0} y={-16}>
            <span className="font-semibold text-white">JACK</span>
            <div className="flex flex-wrap gap-6">
              <a href="#about" className="hover:text-white transition">About</a>
              <a href="#services" className="hover:text-white transition">Services</a>
              <a href="#projects" className="hover:text-white transition">Work</a>
              <a href="#contact" className="hover:text-white transition">Contact</a>
            </div>
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div className="space-y-8 pt-14 lg:pt-20">
              <FadeIn delay={0.1} y={24}>
                <p className="inline-flex rounded-full border border-[#7D7DFF] bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#C6D2EA] shadow-[0_0_40px_rgba(125,125,255,0.08)] backdrop-blur-sm">
                  3D visual storytelling</p>
              </FadeIn>

              <FadeIn delay={0.2} y={24}>
                <h1 className="max-w-3xl text-[clamp(3rem,5vw,5.5rem)] leading-[0.95] text-white">
                  I build modern 3D identity systems, motion-led product stories, and polished portfolio experiences.
                </h1>
              </FadeIn>

              <FadeIn delay={0.3} y={24}>
                <p className="max-w-2xl text-lg leading-8 text-[#B7C8E0]">
                  Inspired by atmospheric lighting and tactile geometry, this portfolio blends bold visual rhythm with subtle motion for a fresh, original 3D creator brand.
                </p>
              </FadeIn>

              <FadeIn delay={0.4} y={24}>
                <div className="flex flex-wrap gap-4">
                  <ContactButton />
                  <LiveProjectButton />
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.5} y={24}>
              <div className="relative mx-auto max-w-[520px]">
                <Magnet padding={170} strength={4} activeTransition="transform 0.25s ease-out" inactiveTransition="transform 0.6s ease-in-out">
                  <div className="relative overflow-hidden rounded-[48px] border border-white/10 bg-[#11101A] p-6 shadow-[0_36px_80px_rgba(0,0,0,0.35)]">
                    <div className="absolute -left-[60px] top-10 h-[220px] w-[220px] rounded-full bg-[#FF6B6B]/10 blur-3xl" />
                    <div className="absolute right-[-50px] top-20 h-[160px] w-[160px] rounded-full bg-[#7D7DFF]/10 blur-3xl" />
                    <div className="relative flex h-[420px] items-center justify-center rounded-[36px] border border-white/5 bg-gradient-to-b from-[#151424] via-[#0A0A11] to-[#0F121F] p-8">
                      <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_48%)]" />
                      <div className="relative flex h-full w-full items-center justify-center">
                        <div className="absolute inset-0 rounded-[32px] border border-white/5" />
                        <div className="relative h-[220px] w-[220px] rounded-full bg-gradient-to-br from-[#B461FF] via-[#6B57FF] to-[#2CD4FF] shadow-[0_40px_100px_rgba(91,124,255,0.28)]">
                          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_48%)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Magnet>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-[#050511] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeIn delay={0} y={24}>
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-[#8B99B7]">Featured work</p>
              <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">A creative system built for bold, modern brands.</h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-3">
            {workCards.map((item, index) => (
              <FadeIn key={item.title} delay={0.15 + index * 0.1} y={24}>
                <div className="rounded-[36px] border border-white/10 bg-[#10101D] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#7B88A4]">{item.accent}</p>
                  <h3 className="mt-5 text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-4 text-base leading-8 text-[#B7C8E0]">{item.subtitle}</p>
                  <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.3em] text-[#DDE7F3]">
                    Explore project
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section ref={marqueeRef} className="bg-[#090916] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeIn delay={0} y={24}>
            <p className="text-sm uppercase tracking-[0.35em] text-[#7E8DA4]">Visual direction</p>
          </FadeIn>

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {galleryItems.map((item, index) => (
              <FadeIn key={item.label} delay={0.1 + index * 0.08} y={24}>
                <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#11101B] to-[#0C0C12] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.2)]">
                  <div className="mb-6 h-48 rounded-[28px] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_40%)]" />
                  <p className="text-lg font-semibold text-white">{item.label}</p>
                  <p className="mt-3 text-sm leading-7 text-[#A9B5D1]">Clean geometry, layered depth, and custom motion textures.</p>
                  <span className="mt-5 inline-flex rounded-full bg-[rgba(255,255,255,0.06)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#C4D0E8]">{item.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <FadeIn delay={0} y={24}>
              <div className="rounded-[40px] border border-white/10 bg-[#04050A] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.2)]">
                <p className="text-sm uppercase tracking-[0.35em] text-[#7E8DA4]">Approach</p>
                <h2 className="mt-6 text-4xl font-semibold text-white">A thoughtful process for usable 3D expressions.</h2>
                <p className="mt-6 text-base leading-8 text-[#B7C8E0]">
                  Every frame is crafted with clarity: strong composition, atmospheric materials, and motion that supports the story instead of distracting from it.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} y={24}>
              <div className="space-y-6 text-[#C7D6EB]">
                <AnimatedText text="My work is built to feel polished, modern, and unmistakably crafted for digital-first brands." />
                <p className="text-base leading-8 text-[#A9B5D1]">
                  I combine 3D surface detail with clean typography, crisp color, and subtle motion to create a premium portfolio presence.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {['Render direction', 'Brand motion', 'Model refinement', 'Presentation design'].map((item) => (
                    <div key={item} className="rounded-[30px] border border-white/10 bg-[#090A12] p-5 text-sm text-[#D7E0F0]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#050510] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-[40px] border border-white/10 bg-[#0B0B15] p-12 text-center shadow-[0_40px_90px_rgba(0,0,0,0.25)]">
          <FadeIn delay={0} y={24}>
            <p className="text-sm uppercase tracking-[0.35em] text-[#7C8DA6]">Let’s build</p>
          </FadeIn>
          <FadeIn delay={0.1} y={24}>
            <h2 className="mt-6 text-4xl font-semibold text-white">Ready to bring your next 3D concept to life?</h2>
          </FadeIn>
          <FadeIn delay={0.2} y={24}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#B7C8E0]">I partner with brands that want premium visuals, motion-driven storytelling, and confident creative direction.</p>
          </FadeIn>
          <FadeIn delay={0.3} y={24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ContactButton />
              <LiveProjectButton />
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
