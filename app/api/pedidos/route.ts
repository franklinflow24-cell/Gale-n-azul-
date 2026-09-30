export const dynamic = 'force-dynamic'

if (!(globalThis as any)._pedidos) {
  (globalThis as any)._pedidos = []
}

export async function GET(){
  return Response.json((globalThis as any)._pedidos)
}

export async function POST(req:Request){
  const data = await req.json();
  const lista = (globalThis as any)._pedidos || []
  lista.unshift({...data, id: Date.now(), fechaCreacion: new Date().toISOString()})
  ;(globalThis as any)._pedidos = lista
  return Response.json({ok:true});
}

export async function DELETE(){
  (globalThis as any)._pedidos = []
  return Response.json({ok:true});
}
