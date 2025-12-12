import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { discordUserId: (session.user as any).discordUserId } })
  if (!user) return NextResponse.json({ error: 'no user' }, { status: 400 })
  const existing = await prisma.voucher.findFirst({ where: { assignedUserId: user.id } })
  if (existing) return NextResponse.json({ message: 'already assigned' })
  const voucher = await prisma.voucher.findFirst({ where: { status: 'available' } })
  if (!voucher) return NextResponse.json({ error: 'no vouchers available' }, { status: 404 })
  try {
    await prisma.voucher.update({
      where: { id: voucher.id },
      data: { status: 'assigned', assignedUserId: user.id, assignedAt: new Date() }
    })
  } catch {
    return NextResponse.json({ error: 'race' }, { status: 409 })
  }
  return NextResponse.json({ ok: true })
}

