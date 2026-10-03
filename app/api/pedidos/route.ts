export const dynamic = 'force-dynamic'
const NPOINT_URL = 'https://api.npoint.io/095d2379ae022a7f47b8'

export async function GET(){
  try{
    const res = await fetch(NPOINT_URL, { cache: 'no-store' })
    if(!res.ok) return new Response(JSON.stringify([]), { headers: { 'Content-Type':'application/json' }})
    const data = await res.json()
    return new Response(JSON.stringify(Array.isArray(data)?data:[]), {
      headers: { 'Content-Type':'application/json', 'Cache-Control':'no-store' }
    })
  }catch{
    return new Response(JSON.stringify([]), { headers: { 'Content-Type':'application/json' }})
  }
}

export async function POST(req:Request){
  try{
    const body = await req.json()
    const res = await fetch(NPOINT_URL, { cache: 'no-store' })
    const existing = res.ok ? await res.json() : []
    const arr = Array.isArray(existing) ? existing : []
    
    const nuevo = { id: Date.now(), fechaCreacion: new Date().toISOString(), ...body }
    const actualizado = [nuevo, ...arr].slice(0, 200)

    await fetch(NPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(actualizado)
    })

    return Response.json({ok:true, id:nuevo.id})
  }catch(e:any){
    return new Response(JSON.stringify({error:String(e)}), {status:500})
  }
}
