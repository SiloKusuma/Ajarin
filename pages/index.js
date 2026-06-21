import Head from 'next/head'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import CTA from '@/components/CTA'

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Ajarin",
    "description": "Platform edukasi berbasis AI untuk membantu belajar lebih efektif. Cukup masukkan topik, AI akan menghasilkan materi pembelajaran terstruktur.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  }

  return (
    <>
      <Head>
        <title>Ajarin - Platform Edukasi Berbasis AI | Belajar Jadi Lebih Mudah</title>
        <meta name="description" content="Ajarin adalah platform edukasi berbasis AI yang membantu kamu belajar lebih cerdas dengan materi pembelajaran otomatis yang terstruktur dan personal. Gratis, tanpa login." />
        <meta name="keywords" content="edukasi AI, belajar online, platform pembelajaran, AI pendidikan, materi belajar, kursus online, belajar gratis, artificial intelligence, pembelajaran personal" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="id" />
        <link rel="canonical" href="https://ajarin.vercel.app" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ajarin - Platform Edukasi Berbasis AI" />
        <meta property="og:description" content="Belajar jadi lebih mudah & cerdas dengan AI. Materi pembelajaran otomatis, terstruktur, dan personal." />
        <meta property="og:url" content="https://ajarin.vercel.app" />
        <meta property="og:site_name" content="Ajarin" />
        <meta property="og:locale" content="id_ID" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ajarin - Platform Edukasi Berbasis AI" />
        <meta name="twitter:description" content="Belajar jadi lebih mudah & cerdas dengan AI. Materi pembelajaran otomatis, terstruktur, dan personal." />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </>
  )
}
