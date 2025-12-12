'use client'
import { useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'

export default function PendingOverlay({ minMs = 800 }: { minMs?: number }) {
  const { pending } = useFormStatus()
  const [visible, setVisible] = useState(false)
  const startedAt = useRef<number | null>(null)

  useEffect(() => {
    if (pending) {
      startedAt.current = Date.now()
      setVisible(true)
    } else if (startedAt.current !== null) {
      const elapsed = Date.now() - startedAt.current
      const remaining = Math.max(0, minMs - elapsed)
      const t = setTimeout(() => {
        setVisible(false)
        startedAt.current = null
      }, remaining)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
    }
  }, [pending, minMs])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <Image src="/vinyl.png" alt="Loading" width={96} height={96} className="animate-spin drop-shadow-2xl" style={{ animationDuration: '1200ms' }} />
    </div>
  )
}

