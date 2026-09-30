"use client"
import { useState } from "react"

const platos = [
  {id:1, n:"Arroz con pollo", p:350},
  {id:2, n:"Moro de guandules", p:400},
  {id:3, n:"Sancocho", p:500},
  {id:4, n:"Pescado frito", p:450},
]

export default function Home(){
  const [mesa,setMesa]=useState(1)
  const [personas,setPersonas]=useState(2)
  const [fecha,setFecha]=useState("")
  const [hora,setHora]=useState("20:30")
  const [nombre,setNombre]=useState("")
  const [telefono,setTelefono]=useState("")
  const [tipo,setTipo]=useState("comer")
  const [pedido,setPedido]=useState<any[]>([])
  const total = pedido.reduce((s,i)=>s+i.p,0)

  const reservar = async () => {
    if(!nombre || !fecha) return alert('Pon nombre y fecha')
    const telGaleon="18295435381"
    let txtPlatos = pedido.length ? `\n\nPlatos:\n${pedido.map(x=>`- ${x.n} (${x.p}€)`).join('\n')}\nTotal: ${total}€` : ''
    const servicio = tipo==='comer' ? `COMER AQUÍ - Mesa ${mesa} para ${personas} pers` : `PARA RECOGER para ${personas} pers`
    const msg=`Hola Galeón! 👋 Soy ${nombre} - Tel: ${telefono}\n${servicio}\nDía: ${fecha} a las ${hora}${txtPlatos}`

    await fetch("/api/pedidos", {
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ mesa, total: total+"€", items: pedido, personas, fecha, hora, nombre, telefono, tipo })
    });

    window.open(`https://wa.me/${telGaleon}?text=${encodeURIComponent(msg)}`,'_blank')
  }

  return(
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 bg-cover bg-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1559339352-11d035aa65de')"}}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[420px] overflow-hidden">
        <div className="bg-[#0f2d1f] text-center py-4">
          <h1 className="text-white tracking-[0.3em] font-bold text-xl">GALEÓN</h1>
          <p className="text-white/60 text-[10px] tracking-widest">VILLAVICIOSA - ASTURIAS</p>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={()=>setTipo('comer')} className={`py-2 rounded-lg text-sm font-bold ${tipo==='comer'?'bg-[#0f2d1f] text-white':'bg-gray-100'}`}>Comer aquí</button>
            <button onClick={()=>setTipo('recoger')} className={`py-2 rounded-lg text-sm font-bold ${tipo==='recoger'?'bg-[#0f2d1f] text-white':'bg-gray-100'}`}>Para recoger</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs">Tu nombre</label><input value={nombre} onChange={e=>setNombre(e.target.value)} className="w-full border rounded-lg p-2 text-sm"/></div>
            <div><label className="text-xs">Tu WhatsApp</label><input value={telefono} onChange={e=>setTelefono(e.target.value)} className="w-full border rounded-lg p-2 text-sm"/></div>
            <div><label className="text-xs">Fecha</label><input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} className="w-full border rounded-lg p-2 text-sm"/></div>
            <div><label className="text-xs">Hora</label><input type="time" value={hora} onChange={e=>setHora(e.target.value)} className="w-full border rounded-lg p-2 text-sm"/></div>
          </div>

          <div>
            <p className="text-xs mb-2">Personas</p>
            <div className="grid grid-cols-5 gap-2">
              {[1,2,3,4,5,6,7,8,9,10].map(n=>(
                <button key={n} onClick={()=>setPersonas(n)} className={`py-1.5 rounded-lg text-sm ${personas===n?'bg-[#0f2d1f] text-white':'bg-gray-100'}`}>{n}{n===10?' +':''}</button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs mb-2">Mesa (1 al 15)</p>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({length:15},(_,i)=>i+1).map(n=>(
                <button key={n} onClick={()=>setMesa(n)} className={`py-1.5 rounded-lg text-xs ${mesa===n?'bg-[#d4a017] text-black font-bold':'bg-gray-100'}`}>Mesa {n}</button>
              ))}
            </div>
          </div>

          <div className="border-t pt-3">
            <p className="font-bold text-sm mb-2">Menú - Añadir platos</p>
            {platos.map(p=>(
              <div key={p.id} className="flex justify-between items-center py-1.5 text-sm">
                <span>{p.n} - {p.p}€</span>
                <button onClick={()=>setPedido([...pedido,p])} className="bg-white border px-3 py-1 rounded-full text-xs">+ Añadir</button>
              </div>
            ))}
            <p className="text-sm mt-2">Total: <b>{total}€</b> - {pedido.length} platos {pedido.length>0 && <button onClick={()=>setPedido([])} className="text-red-500 text-xs ml-2">vaciar</button>}</p>
          </div>

          <button onClick={reservar} className="w-full bg-[#0f2d1f] text-white py-3 rounded-xl font-bold">Reservar por WhatsApp</button>
          <a href="/admin" className="block text-center text-xs text-gray-400 underline mt-2">Ver admin →</a>
        </div>
      </div>
    </main>
  )
}
