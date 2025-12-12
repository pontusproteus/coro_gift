import './globals.css'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto p-6">
          {children}
        </div>
      </body>
    </html>
  )
}

