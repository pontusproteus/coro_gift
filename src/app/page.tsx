import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Image from 'next/image'

export default async function Page() {
  const session = await getServerSession(authOptions)
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center gap-4 pt-6">
        <Image src="/santa-coro.png" alt="coro-mmunity christmas giveaway" width={260} height={260} className="rounded-lg shadow-2xl" />
      </div>
      {!session && (
        <a href="/api/auth/signin/discord" className="inline-block btn-primary">Login with Discord</a>
      )}
      {session && (
        <>
        <div className="flex justify-center">
          <Link href="/redeem" className="btn-cta">Secure the bag</Link>
        </div>
        <div className="space-x-3 text-center pt-2">
          {session.user && (session.user as any).isAdmin && (
            <Link href="/admin" className="underline">Admin</Link>
          )}
          <a href="/api/auth/signout" className="underline">Logout</a>
        </div>
        </>
      )}
      <div className="snow">
        <span className="flake" style={{ ['--x' as any]: '5%', ['--size' as any]: '8px', ['--duration' as any]: '12s', ['--delay' as any]: '0s' }} />
        <span className="flake" style={{ ['--x' as any]: '12%', ['--size' as any]: '10px', ['--duration' as any]: '14s', ['--delay' as any]: '2s' }} />
        <span className="flake" style={{ ['--x' as any]: '20%', ['--size' as any]: '6px', ['--duration' as any]: '11s', ['--delay' as any]: '1s' }} />
        <span className="flake" style={{ ['--x' as any]: '28%', ['--size' as any]: '9px', ['--duration' as any]: '13s', ['--delay' as any]: '3s' }} />
        <span className="flake" style={{ ['--x' as any]: '36%', ['--size' as any]: '7px', ['--duration' as any]: '12s', ['--delay' as any]: '4s' }} />
        <span className="flake" style={{ ['--x' as any]: '44%', ['--size' as any]: '8px', ['--duration' as any]: '10s', ['--delay' as any]: '2s' }} />
        <span className="flake" style={{ ['--x' as any]: '52%', ['--size' as any]: '11px', ['--duration' as any]: '15s', ['--delay' as any]: '1s' }} />
        <span className="flake" style={{ ['--x' as any]: '60%', ['--size' as any]: '7px', ['--duration' as any]: '12s', ['--delay' as any]: '0.5s' }} />
        <span className="flake" style={{ ['--x' as any]: '68%', ['--size' as any]: '10px', ['--duration' as any]: '13s', ['--delay' as any]: '2.5s' }} />
        <span className="flake" style={{ ['--x' as any]: '76%', ['--size' as any]: '6px', ['--duration' as any]: '11s', ['--delay' as any]: '1.5s' }} />
        <span className="flake" style={{ ['--x' as any]: '84%', ['--size' as any]: '9px', ['--duration' as any]: '12s', ['--delay' as any]: '3.5s' }} />
        <span className="flake" style={{ ['--x' as any]: '92%', ['--size' as any]: '8px', ['--duration' as any]: '14s', ['--delay' as any]: '2s' }} />
      </div>
    </div>
  )
}
