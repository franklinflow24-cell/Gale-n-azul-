"use client"
import { useState } from 'react';

const platos = [
  { nombre: "Cachopo XXL", precio: 28 },
  { nombre: "Entrecot 400gr", precio: 21 },
  { nombre: "Pica Pollo", precio: 18 },
  { nombre: "Ensalada Mixta", precio: 9 },
];

export default function Home() {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [mesa, setMesa] = useState("Mesa 1");
  const total = carrito.reduce((s,p)=>s+p.precio,0);

  const pedir = async () => {
    if(carrito.length===0) return alert("Añade un plato");
    const pedido = {
      hora: new Date().toLocaleString(),
      mesa: mesa,
      items: carrito,
      total: total + "€",
      tipo: "Reserva web"
    };
    await fetch('/api/pedidos', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(pedido)
    });
    const numero = "34600000000"; // <-- AQUI PON TU NUMERO CON 34
    const texto = `Hola Galeon Azul! Reserva ${mesa} - ${carrito.map(p=>p.nombre).join(", ")} - Total ${total}€`;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, '_blank');
  }

  return (
    <div style={{minHeight:'100vh', background:'#f8f9fa', padding:20, fontFamily:'sans-serif'}}>
      <h1 style={{fontWeight:800, textAlign:'center', color:'#0a2540'}}>⚓ GALEÓN AZUL - Villaviciosa</h1>
      <p style={{textAlign:'center'}}>Mesa: 
        <select value={mesa} onChange={e=>setMesa(e.target.value)} style={{marginLeft:8, padding:6, borderRadius:6}}>
          <option>Mesa 1</option><option>Mesa 2</option><option>Mesa 3</option><option>Terraza</option>
        </select>
      </p>
      
      <div style={{maxWidth:500, margin:'20px auto', display:'grid', gap:12}}>
        {platos.map((p,i)=>(
          <div key={i} style={{background:'white', padding:16, borderRadius:12, display:'flex', justifyContent:'space-between', boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
            <span>{p.nombre} - <b>{p.precio}€</b></span>
            <button onClick={()=>setCarrito([...carrito, p])} style={{background:'#0a2540', color:'white', border:'none', padding:'6px 12px', borderRadius:6}}>Añadir</button>
          </div>
        ))}
      </div>

      {carrito.length>0 && (
        <div style={{maxWidth:500, margin:'20px auto', background:'white', padding:16, borderRadius:12, border:'2px solid #c5a059'}}>
          <div style={{fontWeight:700, marginBottom:8}}>{mesa} · {carrito.length} platos · Total {total}€</div>
          {carrito.map((c,i)=><div key={i} style={{fontSize:14}}>- {c.nombre}</div>)}
          <button onClick={pedir} style={{width:'100%', marginTop:12, background:'#25D366', color:'white', padding:14, borderRadius:10, border:'none', fontWeight:800, fontSize:16}}>
            Reservar {mesa} por WhatsApp
          </button>
        </div>
      )}
    </div>
  )
}
