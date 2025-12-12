import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function RedeemPage() {
  const session = await getServerSession(authOptions)
  if (!session) return <div>Login required</div>
  const user = await prisma.user.findUnique({ where: { discordUserId: (session.user as any).discordUserId } })
  const voucher = user ? await prisma.voucher.findFirst({ where: { assignedUserId: user.id } }) : null
  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Redeem voucher</h2>
      {!voucher && (
        <form action="/api/redeem" method="post">
          <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded">Assign me a voucher</button>
        </form>
      )}
      {voucher && (
        <div className="space-y-2">
          <div>Voucher: ••••••••••</div>
          <form action="/api/voucher/reveal" method="post">
            <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Reveal code</button>
          </form>
        </div>
      )}
    </div>
  )
}
