import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Page() {
  const session = await getServerSession(authOptions)
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Secret Santa</h1>
      {!session && (
        <a href="/api/auth/signin" className="inline-block bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded">Login with Discord</a>
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

