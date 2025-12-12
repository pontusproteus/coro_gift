import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { decrypt } from '@/lib/crypto'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { discordUserId: (session.user as any).discordUserId } })
  if (!user) return NextResponse.json({ error: 'no user' }, { status: 400 })
  const voucher = await prisma.voucher.findFirst({ where: { assignedUserId: user.id } })
  if (!voucher) return NextResponse.json({ error: 'no voucher' }, { status: 404 })
  await prisma.voucherView.create({ data: { voucherId: voucher.id, viewerUserId: user.id } })
  const code = decrypt(voucher.codeCiphertext)
  await prisma.voucher.update({ where: { id: voucher.id }, data: { status: 'redeemed', redeemedAt: new Date() } })
  return NextResponse.json({ code })
}

