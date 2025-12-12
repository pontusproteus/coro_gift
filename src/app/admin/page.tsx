import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session || !(session.user && (session.user as any).isAdmin)) return <div>Admin only</div>
  return (
    <div className="space-y-8">
      <h2 className="text-2xl">Admin</h2>
      <section className="space-y-2">
        <h3 className="text-xl">Upload vouchers</h3>
        <form action="/api/vouchers/upload" method="post">
          <textarea name="csv" className="w-full h-40 text-black" placeholder="code,value_amount,currency"></textarea>
          <div className="mt-2">
            <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded">Upload</button>
          </div>
        </form>
      </section>
      <section className="space-y-2">
        <h3 className="text-xl">Run matching</h3>
        <form action="/api/matching/run" method="post">
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Generate matches</button>
        </form>
      </section>
    </div>
  )
}

