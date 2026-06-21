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

        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Visi & Misi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="bi bi-eye text-2xl text-primary-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Visi</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="bi bi-bullseye text-2xl text-primary-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Misi</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
