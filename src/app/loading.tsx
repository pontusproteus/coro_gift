import Image from 'next/image'

export default function Loading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <Image src="/vinyl.png" alt="Loading" width={80} height={80} className="animate-spin" style={{ animationDuration: '1400ms' }} />
    </div>
  )
}

