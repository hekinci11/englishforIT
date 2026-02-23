import './globals.css'

export const metadata = {
  title: 'EnglishForIT - Master English for IT Professionals',
  description: 'AI-powered English learning platform designed specifically for IT professionals. Learn technical vocabulary, documentation, and professional communication.',
  keywords: ['English learning', 'IT English', 'technical English', 'programming English', 'developer English'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
