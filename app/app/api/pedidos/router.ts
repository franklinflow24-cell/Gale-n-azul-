import { NextResponse } from 'next/server'

let pedidosDB: any[] = []

export async function GET() {
  return NextResponse.json(pedidosDB)
}

export async function POST(req: Request) {
  const data = await req.json()
  const nuevo = { id: Date.now(), fecha: new Date().toISOString(), ...data }
  pedidosDB.unshift(nuevo)
  return NextResponse.json({ ok: true, pedido: nuevo })
}
