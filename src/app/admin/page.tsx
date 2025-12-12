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
        <form action="/api/vouchers/upload" method="post" className="card p-4 space-y-3">
          <textarea name="csv" className="w-full h-40 text-black rounded" placeholder="code,value_amount,currency"></textarea>
          <div className="flex justify-end">
            <button className="btn-primary">Upload</button>
          </div>
        </form>
      </section>
    </div>
  )
}
