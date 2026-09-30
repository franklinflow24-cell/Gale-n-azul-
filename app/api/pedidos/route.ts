export async function GET() {
  const g = globalThis as any;
  if (!g._pedidos) g._pedidos = [];
  return new Response(JSON.stringify(g._pedidos), { headers: { 'Content-Type': 'application/json' } });
}
export async function POST(req: Request) {
  const g = globalThis as any;
  if (!g._pedidos) g._pedidos = [];
  const data = await req.json();
  g._pedidos.unshift(data);
  return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
}
