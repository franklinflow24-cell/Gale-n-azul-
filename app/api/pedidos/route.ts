export const dynamic = 'force-dynamic'
const NPOINT_URL = 'https://api.npoint.io/e5fffb69fa6201ee049ad'

export async function GET(){
  try{
    const res = await fetch(NPOINT_URL, { cache: 'no-store' })
    const data = await res.json()
    const arr = Array.isArray(data) ? data : []
    return new Response(JSON.stringify(arr), {
      headers: { 'Content-Type':'application/json', 'Cache-Control':'no-store' }
    })
  }catch{
    return new Response(JSON.stringify([]), { headers: { 'Content-Type':'application/json' }})
  }
}

export async function POST(req:Request){
  try{
    const body = await req.json()
    // leer lo que hay
    const res = await fetch(NPOINT_URL, { cache: 'no-store' })
    const existing = await res.json()
    const arr = Array.isArray(existing) ? existing : []
    
    const nuevo = { id: Date.now(), fechaCreacion: new Date().toISOString(), ...body }
    const actualizado = [nuevo, ...arr].slice(0, 200)

    // guardar de nuevo en npoint
    await fetch(NPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(actualizado)
    })

    return Response.json({ok:true})
  }catch(e){
    return new Response(JSON.stringify({error:String(e)}), {status:500})
  }
}
