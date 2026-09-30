"use client"
import { useState, useEffect } from 'react';
export default function Admin(){
  const [p,setP]=useState<any[]>([]);
  useEffect(()=>{
    const c=async()=>{try{const r=await fetch('/api/pedidos'); const d=await r.json(); setP(d);}catch(e){}};
    c(); setInterval(c,3000);
  },[]);
  return (<div style={{padding:20, fontFamily:'sans-serif'}}><h1>Galeón Azul - {p.length} pedidos</h1><p style={{color:'green'}}>En vivo - cada 3s</p>{p.map((x,i)=><div key={i} style={{border:'1px solid #ddd', padding:10, marginBottom:8, borderRadius:8}}><b>{x.mesa}</b> {x.total} - {x.hora}<br/>{x.items?.map((a:any)=>a.nombre).join(", ")}</div>)}</div>)
}
