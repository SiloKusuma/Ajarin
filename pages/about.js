import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>Tentang Ajarin - Platform Edukasi Berbasis AI</title>
        <meta name="description" content="Kenali Ajarin, platform edukasi berbasis AI yang membantu kamu sukses belajar dengan teknologi kecerdasan buatan." />
        <link rel="canonical" href="https://ajarin.vercel.app/about" />
        <meta property="og:title" content="Tentang Ajarin - Platform Edukasi Berbasis AI" />
        <meta property="og:description" content="Kenali Ajarin, platform edukasi berbasis AI yang membantu kamu sukses belajar dengan teknologi kecerdasan buatan." />
      </Head>

      <div className="min-h-screen bg-white">
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Sukses bersama{' '}
                  <span className="text-primary-600">AI</span>
                </h1>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="/placeholder-sukses.png"
                  alt="Sukses bersama AI"
                  className="w-full max-w-lg rounded-2xl shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
