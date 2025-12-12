import './globals.css'
import { ReactNode } from 'react'
import Image from 'next/image'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Coro-mmunity Xmas Giveaway 🎄🎁</title>
      </head>
      <body className="min-h-screen brand-gradient text-white">
        <header className="border-b border-red-700/40">
          <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-center gap-3 text-center">
            <Image src="/santa-coro.png" alt="Coro-mmunity Xmas Giveaway" width={56} height={56} className="rounded shadow-md" />
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">🎄 Coro-mmunity Xmas Giveaway ❄️🎁</h1>
          </div>
        </header>
        <main className="max-w-3xl mx-auto p-6 text-center">
          {children}
        </main>
        <div className="snow" aria-hidden="true">
          <span className="flake" style={{ ['--x' as any]: '3%', ['--size' as any]: '8px', ['--duration' as any]: '12s', ['--delay' as any]: '0s' }} />
          <span className="flake" style={{ ['--x' as any]: '8%', ['--size' as any]: '10px', ['--duration' as any]: '15s', ['--delay' as any]: '1s' }} />
          <span className="flake" style={{ ['--x' as any]: '13%', ['--size' as any]: '7px', ['--duration' as any]: '11s', ['--delay' as any]: '2s' }} />
          <span className="flake" style={{ ['--x' as any]: '18%', ['--size' as any]: '9px', ['--duration' as any]: '14s', ['--delay' as any]: '3s' }} />
          <span className="flake" style={{ ['--x' as any]: '23%', ['--size' as any]: '6px', ['--duration' as any]: '10s', ['--delay' as any]: '1.5s' }} />
          <span className="flake" style={{ ['--x' as any]: '28%', ['--size' as any]: '11px', ['--duration' as any]: '16s', ['--delay' as any]: '2.5s' }} />
          <span className="flake" style={{ ['--x' as any]: '33%', ['--size' as any]: '8px', ['--duration' as any]: '12s', ['--delay' as any]: '0.5s' }} />
          <span className="flake" style={{ ['--x' as any]: '38%', ['--size' as any]: '10px', ['--duration' as any]: '13s', ['--delay' as any]: '3.5s' }} />
          <span className="flake" style={{ ['--x' as any]: '43%', ['--size' as any]: '7px', ['--duration' as any]: '11s', ['--delay' as any]: '2.2s' }} />
          <span className="flake" style={{ ['--x' as any]: '48%', ['--size' as any]: '9px', ['--duration' as any]: '14s', ['--delay' as any]: '1.2s' }} />
          <span className="flake" style={{ ['--x' as any]: '53%', ['--size' as any]: '6px', ['--duration' as any]: '10s', ['--delay' as any]: '0.8s' }} />
          <span className="flake" style={{ ['--x' as any]: '58%', ['--size' as any]: '11px', ['--duration' as any]: '16s', ['--delay' as any]: '2.8s' }} />
          <span className="flake" style={{ ['--x' as any]: '63%', ['--size' as any]: '8px', ['--duration' as any]: '12s', ['--delay' as any]: '1.8s' }} />
          <span className="flake" style={{ ['--x' as any]: '68%', ['--size' as any]: '10px', ['--duration' as any]: '13s', ['--delay' as any]: '2.3s' }} />
          <span className="flake" style={{ ['--x' as any]: '73%', ['--size' as any]: '7px', ['--duration' as any]: '11s', ['--delay' as any]: '3.3s' }} />
          <span className="flake" style={{ ['--x' as any]: '78%', ['--size' as any]: '9px', ['--duration' as any]: '14s', ['--delay' as any]: '1.1s' }} />
          <span className="flake" style={{ ['--x' as any]: '83%', ['--size' as any]: '6px', ['--duration' as any]: '10s', ['--delay' as any]: '2.1s' }} />
          <span className="flake" style={{ ['--x' as any]: '88%', ['--size' as any]: '11px', ['--duration' as any]: '16s', ['--delay' as any]: '0.9s' }} />
          <span className="flake" style={{ ['--x' as any]: '93%', ['--size' as any]: '8px', ['--duration' as any]: '12s', ['--delay' as any]: '1.4s' }} />
        </div>
      </body>
    </html>
  )
}
