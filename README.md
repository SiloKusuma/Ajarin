# AJARIN - Platform Belajar AI yang Personal Platform

Website AI Learning Platform dibuat dengan Next.js dan Tailwind CSS.

## Fitur
- Landing page modern dengan tema putih dan oranye.
- Form input belajar: pelajaran, tingkatan, materi, dan minat diri.
- API route `app/api/generate/route.ts` untuk memanggil Groq API dengan model `openai/gpt-oss-120b`.
- Hasil materi dan soal ditampilkan langsung dan bisa menjawab latihan.

## Cara pakai
1. Salin `.env.example` menjadi `.env.local`
2. Isi `GROQ_API_KEY` dengan API key Groq Anda.
3. Isi `GROQ_API_URL` dengan `https://api.groq.com/v1/responses`.
4. Jalankan `npm install` lalu `npm run dev`.

## Deploy ke Vercel
- Pastikan project menggunakan preset **Next.js**.
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: kosongkan / biarkan default (jangan gunakan `public`).
- Atur Environment Variables di Vercel:
  - `GROQ_API_KEY`
  - `GROQ_API_URL`
  - `GROQ_MODEL` (opsional, default: `openai/gpt-oss-120b`)

Jika kamu melihat error "No Output Directory named `public` found after the Build completed", itu berarti Vercel sedang disetel untuk output static. Dengan `vercel.json` yang sudah ada, Vercel akan menggunakan build Next.js, jadi biarkan setting output default kosong.

> Pastikan env vars diatur di environment yang benar (Production atau Preview), bukan hanya di Local Development. Nama variabel harus persis sama dan tidak ada spasi ekstra.

## Struktur
- `app/page.tsx`: halaman utama dan logika interaktif.
- `app/api/generate/route.ts`: proxy API ke Groq.
- `app/globals.css`: styling dasar.

## Catatan
- API key tidak disertakan di repositori.
- Jika ingin push ke GitHub, tambahkan remote URL dan jalankan `git push -u origin main`.
