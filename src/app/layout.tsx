import './globals.css'
import { ReactNode } from 'react'
import Image from 'next/image'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen brand-gradient text-white">
        <header className="border-b border-red-700/40">
          <div className="max-w-3xl mx-auto px-6 py-5 flex items-center gap-3">
            <Image src="/santa-coro.png" alt="Coro-mmunity Secret Santa" width={48} height={48} className="rounded" />
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Coro-mmunity Secret Santa</h1>
          </div>
        </header>
        <main className="max-w-3xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
