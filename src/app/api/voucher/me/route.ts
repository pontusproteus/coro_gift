import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { discordUserId: (session.user as any).discordUserId } })
  if (!user) return NextResponse.json({})
  const voucher = await prisma.voucher.findFirst({ where: { assignedUserId: user.id } })
  if (!voucher) return NextResponse.json({})
  const masked = '••••••••••'
  return NextResponse.json({ id: voucher.id, masked })
}

