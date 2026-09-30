"use client"
import { useState, useEffect } from 'react';
export default function Admin(){
  const [pedidos, setPedidos] = useState<any[]>([]);
  useEffect(()=>{
    const cargar=async()=>{
      try{ const r=await fetch('/api/pedidos'); const d=await r.json(); setPedidos(d);}catch(e){}
    };
    cargar(); setInterval(cargar,3000);
  },[]);
  return (
    <div style={{padding:20, fontFamily:'sans-serif'}}>
      <h1 style={{fontWeight:800}}>Panel Galeón Azul - {pedidos.length} pedidos</h1>
      <p style={{color:'green'}}>Actualiza cada 3 seg - En vivo</p>
      {pedidos.length===0 ? <p>No hay pedidos aún</p> : pedidos.map((p,i)=><div key={i} style={{background:'white', border:'1px solid #eee', padding:12, borderRadius:8, marginBottom:8}}><b>{p.mesa}</b> - {p.total} - {p.hora}<br/><small>{p.items?.map((x:any)=>x.nombre).join(", ")}</small></div>)}
    </div>
  )
}
