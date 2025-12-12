'use client'
import { useState } from 'react'
import PendingOverlay from '@/components/PendingOverlay'

export default function RevealCodeButton() {
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/voucher/reveal', { method: 'POST' })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setCode(String(data.code || ''))
    } catch {
      setError('Unable to reveal code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      {code && <div className="text-xl font-mono bg-black/30 px-4 py-2 rounded">{code}</div>}
      {!code && (
        <button onClick={onClick} disabled={loading} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-full sm:w-auto">
          Reveal code
        </button>
      )}
      {error && <div className="text-sm text-red-300">{error}</div>}
      <PendingOverlay active={loading} />
    </div>
  )
}

