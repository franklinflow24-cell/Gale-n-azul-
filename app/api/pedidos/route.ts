export const dynamic = 'force-dynamic'
let pedidos: any[] = (globalThis as any)._pedidos || [];
(globalThis as any)._pedidos = pedidos;

export async function GET(){
  return Response.json((globalThis as any)._pedidos || []);
}

export async function POST(req:Request){
  const data = await req.json();
  const lista = (globalThis as any)._pedidos || [];
  lista.unshift({...data, id: Date.now(), hora: new Date().toLocaleString()});
  (globalThis as any)._pedidos = lista;
  return Response.json({ok:true});
}
