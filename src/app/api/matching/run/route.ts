import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !(session.user && (session.user as any).isAdmin)) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const users = await prisma.user.findMany({ where: { voucher: { isNot: null } } })
  if (users.length < 2) return NextResponse.json({ error: 'need at least 2 participants' }, { status: 400 })
  let round = await prisma.round.findFirst({ where: { isActive: true } })
  if (!round) round = await prisma.round.create({ data: { name: String(new Date().getFullYear()), isActive: true } })
  const ids = shuffle(users.map(u => u.id))
  const pairs = ids.map((giverId, i) => ({ giverUserId: giverId, receiverUserId: ids[(i + 1) % ids.length] }))
  await prisma.match.deleteMany({ where: { roundId: round.id } })
  await prisma.match.createMany({ data: pairs.map(p => ({ roundId: round!.id, ...p, status: 'pending' })) })
  return NextResponse.json({ created: pairs.length })
}

