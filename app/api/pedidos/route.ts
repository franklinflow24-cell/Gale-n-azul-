export const dynamic = 'force-dynamic'
const NPOINT_URL = 'https://api.npoint.io/095d2379ae022a7f47b8'

async function leer() {
  try {
    const res = await fetch(NPOINT_URL, { cache: 'no-store' })
    if (!res.ok) return { pedidos: [], mesas: {} }
    const data = await res.json()
    // Compatibilidad con formato antiguo (array)
    if (Array.isArray(data)) return { pedidos: data, mesas: {} }
    return {
      pedidos: Array.isArray(data.pedidos) ? data.pedidos : [],
      mesas: data.mesas && typeof data.mesas === 'object' ? data.mesas : {}
    }
  } catch {
    return { pedidos: [], mesas: {} }
  }
}

async function guardar(payload: any) {
  await fetch(NPOINT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}

export async function GET() {
  const data = await leer()
  return Response.json(data, {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const actual = await leer()

    // Si envían lista completa (admin)
    if (body.pedidos || body.mesas) {
      const payload = {
        pedidos: body.pedidos ?? actual.pedidos,
        mesas: body.mesas ?? actual.mesas
      }
      await guardar(payload)
      return Response.json({ ok: true })
    }

    // Nueva reserva desde la web
    const nuevo = {
      id: Date.now(),
      fechaCreacion: new Date().toISOString(),
      estado: 'activa',
      ...body
    }
    const pedidos = [nuevo, ...actual.pedidos].slice(0, 300)
    await guardar({ pedidos, mesas: actual.mesas })
    return Response.json({ ok: true, id: nuevo.id })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
}
