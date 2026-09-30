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
    const tel="18295435381"
    const msg=`Hola Galeón! Soy ${nombre} Tel:${telefono} ${tipo} Mesa ${mesa} ${personas}pers ${fecha} ${hora} Platos: ${pedido.map(x=>x.n).join(',')} Total ${total}€`
    await fetch("/api/pedidos",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({mesa,total:total+"€",items:pedido,personas,fecha,hora,nombre,telefono,tipo})})
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`,'_blank')
  }

  return(
    <div style={{minHeight:'100vh', background:'#0a2a18', display:'flex', justifyContent:'center', padding:'15px', fontFamily:'Arial'}}>
      <div style={{background:'white', borderRadius:'18px', maxWidth:'420px', width:'100%', overflow:'hidden'}}>
        <div style={{background:'#0f2d1f', textAlign:'center', padding:'18px 0'}}>
          <div style={{color:'white', letterSpacing:'6px', fontWeight:'900', fontSize:'22px'}}>GALEÓN</div>
          <div style={{color:'rgba(255,255,255,0.6)', fontSize:'10px', letterSpacing:'3px', marginTop:'4px'}}>VILLAVICIOSA - ASTURIAS</div>
        </div>
        <div style={{padding:'18px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'12px'}}>
            <button onClick={()=>setTipo('comer')} style={{padding:'10px', borderRadius:'10px', border:'none', fontWeight:'bold', background: tipo==='comer'?'#0f2d1f':'#eee', color: tipo==='comer'?'white':'black'}}>Comer aquí</button>
            <button onClick={()=>setTipo('recoger')} style={{padding:'10px', borderRadius:'10px', border:'none', fontWeight:'bold', background: tipo==='recoger'?'#0f2d1f':'#eee', color: tipo==='recoger'?'white':'black'}}>Para recoger</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
            <div><div style={{fontSize:'12px'}}>Tu nombre</div><input value={nombre} onChange={e=>setNombre(e.target.value)} style={{width:'100%', border:'1px solid #ddd', borderRadius:'8px', padding:'8px'}}/></div>
            <div><div style={{fontSize:'12px'}}>Tu WhatsApp</div><input value={telefono} onChange={e=>setTelefono(e.target.value)} style={{width:'100%', border:'1px solid #ddd', borderRadius:'8px', padding:'8px'}}/></div>
            <div><div style={{fontSize:'12px'}}>Fecha</div><input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={{width:'100%', border:'1px solid #ddd', borderRadius:'8px', padding:'8px'}}/></div>
            <div><div style={{fontSize:'12px'}}>Hora</div><input type="time" value={hora} onChange={e=>setHora(e.target.value)} style={{width:'100%', border:'1px solid #ddd', borderRadius:'8px', padding:'8px'}}/></div>
          </div>
          <div style={{marginTop:'12px'}}><div style={{fontSize:'12px', marginBottom:'6px'}}>Personas</div><div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'6px'}}>{[1,2,3,4,5,6,7,8,9,10].map(n=>(<button key={n} onClick={()=>setPersonas(n)} style={{padding:'8px 0', borderRadius:'8px', border:'none', background:personas===n?'#0f2d1f':'#eee', color:personas===n?'white':'black'}}>{n}{n===10?' +':''}</button>))}</div></div>
          <div style={{marginTop:'12px'}}><div style={{fontSize:'12px', marginBottom:'6px'}}>Mesa (1 al 15)</div><div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'6px'}}>{Array.from({length:15},(_,i)=>i+1).map(n=>(<button key={n} onClick={()=>setMesa(n)} style={{padding:'6px', borderRadius:'8px', border:'none', fontSize:'12px', background:mesa===n?'#d4a017':'#eee', fontWeight:mesa===n?'bold':'normal'}}>Mesa {n}</button>))}</div></div>
          <div style={{marginTop:'14px', borderTop:'1px solid #eee', paddingTop:'10px'}}>
            <div style={{fontWeight:'bold', fontSize:'14px', marginBottom:'8px'}}>Menú - Añadir platos</div>
            {platos.map(p=>(<div key={p.id} style={{display:'flex', justifyContent:'space-between', padding:'6px 0', fontSize:'14px'}}><span>{p.n} - {p.p}€</span><button onClick={()=>setPedido([...pedido,p])} style={{border:'1px solid #ddd', background:'white', borderRadius:'20px', padding:'3px 10px', fontSize:'12px'}}>+ Añadir</button></div>))}
            <div style={{fontSize:'14px', marginTop:'8px'}}>Total: <b>{total}€</b> - {pedido.length} platos {pedido.length>0&&<button onClick={()=>setPedido([])} style={{color:'red', fontSize:'12px', marginLeft:'8px', border:'none', background:'none'}}>vaciar</button>}</div>
          </div>
          <button onClick={reservar} style={{width:'100%', background:'#0f2d1f', color:'white', padding:'14px', borderRadius:'12px', border:'none', fontWeight:'bold', marginTop:'14px', fontSize:'16px'}}>Reservar por WhatsApp</button>
          <a href="/admin" style={{display:'block', textAlign:'center', fontSize:'12px', color:'#999', marginTop:'10px'}}>Ver admin →</a>
        </div>
      </div>
    </div>
  )
}
