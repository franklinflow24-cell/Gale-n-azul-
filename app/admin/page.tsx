"use client"
import { useEffect, useState } from "react"

export default function Admin(){
  const [pedidos,setPedidos]=useState<any[]>([])
  const cargar = async () => {
    const r = await fetch("https://api.npoint.io/095d2379ae022a7f47b8", { cache:"no-store" })
    const j = await r.json()
    setPedidos(Array.isArray(j)?j:[])
  }
  useEffect(()=>{cargar()},[])

  return(
    <div style={{padding:'15px', fontFamily:'Arial', background:'#f0f2f5', minHeight:'100vh'}}>
      <h2 style={{fontWeight:'900', fontSize:'20px'}}>⚓ Galeón Azul - Panel</h2>
      <div style={{display:'flex', gap:'8px', marginTop:'10px'}}>
        <button onClick={cargar} style={{padding:'10px 16px', background:'#0f2d1f', color:'white', borderRadius:'8px', border:'none', fontWeight:'bold'}}>Recargar pedidos</button>
        <a href="/" style={{padding:'10px', fontSize:'13px'}}>← Web</a>
      </div>
      <div style={{marginTop:'15px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px'}}>
        <div style={{background:'white', padding:'12px', borderRadius:'12px', borderLeft:'4px solid #2563eb'}}><div>Pedidos Hoy</div><div style={{fontSize:'28px', fontWeight:'bold'}}>{pedidos.length}</div></div>
        <div style={{background:'white', padding:'12px', borderRadius:'12px', borderLeft:'4px solid #16a34a'}}><div>Reservas Hoy</div><div style={{fontSize:'28px', fontWeight:'bold'}}>{pedidos.length}</div></div>
        <div style={{background:'white', padding:'12px', borderRadius:'12px', borderLeft:'4px solid #eab308'}}><div>Estado</div><div style={{fontWeight:'bold', color:'green'}}>● Abierto</div></div>
      </div>
      <div style={{marginTop:'15px'}}>
        {pedidos.map((p:any,i:number)=>(
          <div key={i} style={{background:'white', marginTop:'10px', padding:'14px', borderRadius:'12px', boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
            <b>{p.nombre} - {p.telefono}</b><br/>
            <span style={{fontSize:'13px', color:'#555'}}>Mesa {p.mesa} - {p.personas} pers - {p.fecha} {p.hora} - {p.tipo}</span><br/>
            <span style={{fontSize:'13px'}}>{p.items?.map((x:any)=>x.n).join(', ')} - <b>Total {p.total}</b></span>
          </div>
        ))}
      </div>
    </div>
  )
}
