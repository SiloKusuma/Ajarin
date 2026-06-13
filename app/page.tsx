"use client";

import Head from 'next/head';
import FadeIn from './components/FadeIn';
import ContactButton from './components/ContactButton';
import Magnet from './components/Magnet';
import AnimatedText from './components/AnimatedText';
import { useRef, useEffect, useState } from 'react';

export default function Home() {
  const marqueeRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = marqueeRef.current as HTMLDivElement | null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const o = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(o);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const marqueeRow1 = [
    'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
    'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
    'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
    'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
    'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
    'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  ];

  const marqueeRow2 = [
    'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
    'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
    'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
    'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
    'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
    'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
    'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
    'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
    'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
  ];

  return (
    <main className="min-h-screen main-wrapper" style={{ background: '#0C0C0C', fontFamily: 'Kanit, sans-serif' }}>
      <Head>
        <title>Jack -- 3D Creator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="h-screen relative overflow-x-clip">
        <FadeIn as="nav" className="flex justify-between items-center text-[#D7E2EA] font-medium uppercase tracking-wider px-6 md:px-10 pt-6 md:pt-8 text-sm md:text-lg lg:text-[1.4rem]" delay={0} y={-20}>
          <div />
          <div className="flex gap-6 md:gap-8 lg:gap-12">
            <a href="#about" className="hover:opacity-70 transition duration-200">About</a>
            <a href="#services" className="hover:opacity-70 transition duration-200">Price</a>
            <a href="#projects" className="hover:opacity-70 transition duration-200">Projects</a>
            <a href="#contact" className="hover:opacity-70 transition duration-200">Contact</a>
          </div>
        </FadeIn>

        <div className="relative flex h-full items-center justify-center">
          <div className="overflow-hidden w-full">
            <FadeIn delay={0.15} y={40}>
              <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">Hi, i&apos;m jack</h1>
            </FadeIn>
          </div>

          <FadeIn delay={0.6} y={30}>
            <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 -translate-y-1/2">
              <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
                <img src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" alt="portrait" className="w-full rounded-3xl object-cover" />
              </Magnet>
            </div>
          </FadeIn>

          <div className="absolute inset-x-0 bottom-0 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
            <div className="flex justify-between items-end">
              <FadeIn delay={0.35} y={20}>
                <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)', maxWidth: '260px' }}>
                  a 3d creator driven by crafting striking and unforgettable projects
                </p>
              </FadeIn>

              <FadeIn delay={0.5} y={20}>
                <ContactButton />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section ref={marqueeRef} style={{ background: '#0C0C0C', paddingTop: '6rem', paddingBottom: '2.5rem' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 will-change-transform" style={{ transform: `translateX(${offset - 200}px)` }}>
              {Array.from({ length: 3 }).flatMap(() => marqueeRow1).map((src, idx) => (
                // eslint-disable-next-line
                <img key={idx + 'r1'} src={src} width={420} height={270} loading="lazy" className="rounded-2xl object-cover" />
              ))}
            </div>
            <div className="flex gap-3 will-change-transform" style={{ transform: `translateX(${-(offset - 200)}px)` }}>
              {Array.from({ length: 3 }).flatMap(() => marqueeRow2).map((src, idx) => (
                // eslint-disable-next-line
                <img key={idx + 'r2'} src={src} width={420} height={270} loading="lazy" className="rounded-2xl object-cover" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen relative px-5 sm:px-8 md:px-10 py-20">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)', color: '#D7E2EA' }}>
            About me
          </h2>
        </FadeIn>

        <div className="relative mt-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0.1} x={-80} y={0}>
            <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="dec" className="absolute top-[4%] left-[1%] w-[120px] sm:w-[160px] md:w-[210px]" />
          </FadeIn>

          <FadeIn delay={0.15} x={80} y={0}>
            <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="dec" className="absolute top-[4%] right-[1%] w-[120px] sm:w-[160px] md:w-[210px]" />
          </FadeIn>

          <FadeIn delay={0.25} x={-80} y={0}>
            <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="dec" className="absolute bottom-[8%] left-[3%] w-[100px] sm:w-[140px] md:w-[180px]" />
          </FadeIn>

          <FadeIn delay={0.3} x={80} y={0}>
            <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="dec" className="absolute bottom-[8%] right-[3%] w-[130px] sm:w-[170px] md:w-[220px]" />
          </FadeIn>

          <p className="max-w-[560px] text-center text-[#D7E2EA] font-medium leading-relaxed" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
            <AnimatedText text={"With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"} />
          </p>

          <ContactButton />
        </div>
      </section>

      <section id="services" className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
        <h2 className="text-[#0C0C0C] font-black uppercase text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Services
        </h2>

        <div className="mx-auto mt-16 max-w-5xl">
          {[
            {
              num: '01',
              title: '3D Modeling',
              desc: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
            },
            {
              num: '02',
              title: 'Rendering',
              desc: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
            },
            {
              num: '03',
              title: 'Motion Design',
              desc: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
            },
            {
              num: '04',
              title: 'Branding',
              desc: 'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
            },
            {
              num: '05',
              title: 'Web Design',
              desc: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
            },
          ].map((it, i) => (
            <FadeIn key={it.num} delay={i * 0.1} y={20}>
              <div className="flex items-start gap-6 border-b" style={{ borderColor: 'rgba(12,12,12,0.15)', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <div className="flex-shrink-0">
                  <div className="font-black text-[#0C0C0C]" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>{it.num}</div>
                </div>
                <div>
                  <div className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>{it.title}</div>
                  <div className="mt-2 max-w-2xl font-light" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}>{it.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="projects" className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10">
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[#D7E2EA]" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Project
        </h2>

        <div className="mx-auto max-w-6xl px-6 py-12">
          {[
            {
              num: '01',
              title: 'Nextlevel Studio',
              col1a: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
              col1b: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
              col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
            },
            {
              num: '02',
              title: 'Aura Brand Identity',
              col1a: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
              col1b: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
              col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
            },
            {
              num: '03',
              title: 'Solaris Digital',
              col1a: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
              col1b: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
              col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
            },
          ].map((proj, idx) => (
            <div key={proj.num} style={{ height: '85vh', position: 'relative' }}>
              <div style={{ position: 'sticky', top: '6rem' }}>
                <div style={{ transform: `translateY(${idx * 28}px) scale(${1 - (3 - 1 - idx) * 0.03})` }} className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-black text-[#0C0C0C]" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>{proj.num}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm uppercase text-[#D7E2EA] tracking-widest">Client</div>
                      <div className="mt-2 text-xl font-semibold text-[#D7E2EA]">{proj.title}</div>
                      <div className="mt-3">
                        <button className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm text-[#D7E2EA] uppercase tracking-widest">Live Project</button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-10 gap-4">
                    <div className="col-span-4 flex flex-col gap-4">
                      <img src={proj.col1a} className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover" style={{ height: 'clamp(130px, 16vw, 230px)' }} />
                      <img src={proj.col1b} className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover" style={{ height: 'clamp(160px, 22vw, 340px)' }} />
                    </div>
                    <div className="col-span-6">
                      <img src={proj.col2} className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover" style={{ height: '100%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
