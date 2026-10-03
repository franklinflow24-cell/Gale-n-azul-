"use client"
import { useEffect, useState } from "react"

const NPOINT = "https://api.npoint.io/095d2379ae022a7f47b8"

export default function Admin(){
  const [pedidos,setPedidos]=useState<any[]>([])
  const [raw,setRaw]=useState("cargando...")

  const cargar = async () => {
    // 1. Intenta desde tu API
    try{
      const r1 = await fetch("/api/pedidos", { cache:"no-store" })
      const j1 = await r1.json()
      if(Array.isArray(j1) && j1.length>0){ setPedidos(j1); setRaw(JSON.stringify(j1).slice(0,200)); return }
    }catch{}

    // 2. Directo a npoint por si Vercel tiene cache
    try{
      const r2 = await fetch(NPOINT, { cache:"no-store" })
      const j2 = await r2.json()
      setPedidos(Array.isArray(j2)?j2:[])
      setRaw("Directo npoint: "+JSON.stringify(j2).slice(0,300))
    }catch(e:any){
      setRaw("Error: "+e.message)
    }
  }

  useEffect(()=>{cargar()},[])

  return(
    <div style={{padding:'15px', fontFamily:'Arial', background:'#f0f2f5', minHeight:'100vh'}}>
      <h2 style={{fontWeight:'900', fontSize:'20px'}}>⚓ Galeón Azul - Panel FIX</h2>
      <div style={{display:'flex', gap:'8px', marginTop:'10px'}}>
        <button onClick={cargar} style={{padding:'10px 16px', background:'#0f2d1f', color:'white', borderRadius:'8px', border:'none', fontWeight:'bold'}}>Recargar pedidos</button>
        <a href="/" style={{padding:'10px', fontSize:'13px'}}>← Web</a>
      </div>
      <div style={{marginTop:'10px', background:'white', padding:'10px', borderRadius:'8px', fontSize:'11px'}}>Debug: {raw}</div>
      
      <div style={{marginTop:'15px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px'}}>
        <div style={{background:'white', padding:'12px', borderRadius:'12px', borderLeft:'4px solid blue'}}><div>Pedidos Hoy</div><div style={{fontSize:'28px', fontWeight:'bold'}}>{pedidos.length}</div></div>
        <div style={{background:'white', padding:'12px', borderRadius:'12px', borderLeft:'4px solid green'}}><div>Reservas Hoy</div><div style={{fontSize:'28px', fontWeight:'bold'}}>{pedidos.length}</div></div>
        <div style={{background:'white', padding:'12px', borderRadius:'12px', borderLeft:'4px solid gold'}}><div>Estado</div><div style={{fontWeight:'bold', color:'green'}}>● Abierto</div></div>
      </div>

      <div style={{marginTop:'15px'}}>
        {pedidos.length===0 ? <div style={{background:'white', padding:'15px', borderRadius:'12px'}}>Aún 0. Haz un pedido en la web principal y dale Recargar.</div> :
          pedidos.map((p:any,i:number)=>(
            <div key={i} style={{background:'white', marginTop:'10px', padding:'12px', borderRadius:'12px'}}>
              <b>{p.nombre || 'Sin nombre'} - {p.telefono}</b><br/>
              <span style={{fontSize:'13px'}}>Mesa {p.mesa} - {p.personas} pers - {p.fecha} {p.hora} - {p.tipo}</span><br/>
              <span style={{fontSize:'13px'}}>{p.items?.map((x:any)=>x.n).join(', ')} - Total {p.total}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}
