# Ajarin AI Learning Platform

Website AI Learning Platform dibuat dengan Next.js dan Tailwind CSS.

## Fitur
- Landing page modern dengan tema putih dan oranye.
- Form input belajar: pelajaran, tingkatan, materi, dan minat diri.
- API route `app/api/generate/route.ts` untuk memanggil Groq API dengan model `openai/gpt-oss-120b`.
- Hasil materi dan soal ditampilkan langsung dan bisa menjawab latihan.

## Cara pakai
1. Salin `.env.example` menjadi `.env.local`
2. Isi `GROQ_API_KEY` dengan API key Groq Anda.
3. Jalankan `npm install` lalu `npm run dev`.

## Struktur
- `app/page.tsx`: halaman utama dan logika interaktif.
- `app/api/generate/route.ts`: proxy API ke Groq.
- `app/globals.css`: styling dasar.

## Catatan
- API key tidak disertakan di repositori.
- Jika ingin push ke GitHub, tambahkan remote URL dan jalankan `git push -u origin main`.
