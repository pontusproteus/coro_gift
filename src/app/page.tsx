import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function Page() {
  await new Promise(resolve => setTimeout(resolve, 600))
  const session = await getServerSession(authOptions)
  const user = session ? await prisma.user.findUnique({ where: { discordUserId: (session.user as any).discordUserId } }) : null
  const voucher = user ? await prisma.voucher.findFirst({ where: { assignedUserId: user.id } }) : null
  async function assign() {
    'use server'
    const sessionLocal = await getServerSession(authOptions)
    if (!sessionLocal) return
    const usr = await prisma.user.findUnique({ where: { discordUserId: (sessionLocal.user as any).discordUserId } })
    if (!usr) return
    const existing = await prisma.voucher.findFirst({ where: { assignedUserId: usr.id } })
    if (existing) return
    const available = await prisma.voucher.findFirst({ where: { status: 'available' } })
    if (!available) return redirect('/no-vouchers')
    try {
      await prisma.voucher.update({ where: { id: available.id }, data: { status: 'assigned', assignedUserId: usr.id, assignedAt: new Date() } })
    } catch {}
    return redirect('/')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center gap-4 pt-6">
        <Image src="/santa-coro.png" alt="Coro-mmunity Xmas Giveaway" width={260} height={260} className="rounded-lg shadow-2xl w-3/4 sm:w-[260px] h-auto" sizes="(max-width: 640px) 75vw, 260px" />
      </div>
      {!session && (
        <a href="/api/auth/signin/discord" className="inline-block btn-primary w-full sm:w-auto">Login with Discord</a>
      )}
      {session && (
        <>
        {!voucher && (
          <form action={assign} className="flex justify-center w-full">
            <button className="btn-cta w-full sm:w-auto">Secure the bag 💼🎁</button>
          </form>
        )}
        {voucher && (
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex justify-center">
              <div className="btn-cta inline-block w-full sm:w-auto">Bag secured ❄️</div>
            </div>
            <div>Voucher: ••••••••••</div>
            <form action="/api/voucher/reveal" method="post">
              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-full sm:w-auto">Reveal code</button>
            </form>
          </div>
        )}
        <div className="space-x-3 text-center pt-2">
          {session.user && (session.user as any).isAdmin && (
            <Link href="/admin" className="underline">Admin</Link>
          )}
          <a href="/api/auth/signout" className="underline">Logout</a>
        </div>
        </>
      )}
    </div>
  )
}
