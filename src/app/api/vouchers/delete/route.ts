import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !(session.user && (session.user as any).isAdmin)) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const form = await req.formData()
  const discordUserId = (form.get('discord_user_id') as string) || ''
  const voucherId = (form.get('voucher_id') as string) || ''
  if (!discordUserId && !voucherId) return NextResponse.json({ error: 'missing identifier' }, { status: 400 })
  let voucher = null as any
  if (voucherId) {
    voucher = await prisma.voucher.findUnique({ where: { id: voucherId } })
  } else {
    const user = await prisma.user.findUnique({ where: { discordUserId } })
    if (!user) return NextResponse.json({ error: 'user not found' }, { status: 404 })
    voucher = await prisma.voucher.findFirst({ where: { assignedUserId: user.id } })
  }
  if (!voucher) return NextResponse.json({ error: 'voucher not found' }, { status: 404 })
  await prisma.voucherView.deleteMany({ where: { voucherId: voucher.id } })
  await prisma.voucher.delete({ where: { id: voucher.id } })
  return NextResponse.json({ ok: true })
}

