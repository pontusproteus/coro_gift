import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import RevealCodeButton from '@/components/RevealCodeButton'

export default async function RedeemPage() {
  await new Promise(resolve => setTimeout(resolve, 600))
  const session = await getServerSession(authOptions)
  if (!session) return <div>Login required</div>
  const user = await prisma.user.findUnique({ where: { discordUserId: (session.user as any).discordUserId } })
  const voucher = user ? await prisma.voucher.findFirst({ where: { assignedUserId: user.id } }) : null
  async function assign() {
    'use server'
    const sessionLocal = await getServerSession(authOptions)
    if (!sessionLocal) return
    const usr = await prisma.user.findUnique({ where: { discordUserId: (sessionLocal.user as any).discordUserId } })
    if (!usr) return
    const existing = await prisma.voucher.findFirst({ where: { assignedUserId: usr.id } })
    if (existing) return redirect('/redeem')
    const available = await prisma.voucher.findFirst({ where: { status: 'available' } })
    if (!available) return redirect('/no-vouchers')
    try {
      await prisma.voucher.update({ where: { id: available.id }, data: { status: 'assigned', assignedUserId: usr.id, assignedAt: new Date() } })
    } catch {}
    return redirect('/redeem')
  }
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl">Secure the bag</h2>
      {!voucher && (
        <form action={assign} className="flex justify-center w-full">
          <button className="btn-cta w-full sm:w-auto">Assign me a voucher</button>
        </form>
      )}
      {voucher && (
        <div className="space-y-2 max-w-md mx-auto">
          <div>Voucher: ••••••••••</div>
          <RevealCodeButton />
        </div>
      )}
    </div>
  )
}
