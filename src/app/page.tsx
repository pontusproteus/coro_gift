import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Page() {
  const session = await getServerSession(authOptions)
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <p className="text-lg">Welcome to the Coro-mmunity Secret Santa. Login to join, redeem your voucher, and see who you’ll be gifting!</p>
      </div>
      {!session && (
        <a href="/api/auth/signin/discord" className="inline-block btn-primary">Login with Discord</a>
      )}
      {session && (
        <div className="space-x-3">
          <Link href="/redeem" className="underline">Redeem voucher</Link>
          <Link href="/match" className="underline">View match</Link>
          {session.user && (session.user as any).isAdmin && (
            <Link href="/admin" className="underline">Admin</Link>
          )}
          <a href="/api/auth/signout" className="underline">Logout</a>
        </div>
      )}
    </div>
  )
}
