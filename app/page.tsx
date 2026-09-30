"use client"
import { useState } from 'react';

const PLATOS = [
  { id:1, nombre:"Entrecot con patatas", precio:21, cat:"Principales" },
  { id:2, nombre:"Solomillo de ternera", precio:22, cat:"Principales" },
  { id:3, nombre:"Picapollo Dominicano", precio:18, cat:"Principales" },
  { id:4, nombre:"Tarta de queso", precio:6, cat:"Postres" },
  { id:5, nombre:"Arroz con leche", precio:6, cat:"Postres" },
  { id:6, nombre:"Flan de huevo", precio:4, cat:"Postres" },
];

export default function Home() {
  const [mesa, setMesa] = useState("Mesa 1");
  const [personas, setPersonas] = useState(2);
  const [carrito, setCarrito] = useState<any[]>([]);

  const total = carrito.reduce((s,p)=>s+p.precio,0);
  const fecha = new Date().toISOString().slice(0,10);
  
  const add = (p:any) => setCarrito([...carrito, p]);
  
  const reservar = () => {
    const texto = `${mesa} · ${personas} pers · ${fecha} 21:00%0A${carrito.length} platos - Total ${total}€%0A${carrito.map((c:any)=>c.nombre).join(", ")}`;
    window.open(`https://wa.me/34600000000?text=${texto}`, "_blank");
    fetch("/api/pedidos", { method:"POST", headers:{'Content-Type':'application/json'}, body: JSON.stringify({ mesa, total: total+"€", hora: new Date().toLocaleTimeString(), items: carrito, personas, fecha }) });
  };

  return (
    <div style={{minHeight:'100vh', background:'#0f172a', color:'white', fontFamily:'sans-serif', padding:20, backgroundImage:'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0)', backgroundSize:'cover'}}>
      <h1 style={{textAlign:'center', fontWeight:900, fontSize:28}}>⚓ GALEÓN AZUL - Villaviciosa</h1>
      
      <div style={{display:'flex', gap:10, justifyContent:'center', margin:'20px 0'}}>
        <select value={mesa} onChange={e=>setMesa(e.target.value)} style={{padding:8, borderRadius:8, color:'black'}}><option>Mesa 1</option><option>Mesa 2</option><option>Mesa 3</option><option>Mesa 4</option><option>Terraza</option></select>
        <select value={personas} onChange={e=>setPersonas(Number(e.target.value))} style={{padding:8, borderRadius:8, color:'black'}}><option value={1}>1 pers</option><option value={2}>2 pers</option><option value={3}>3 pers</option><option value={4}>4 pers</option></select>
      </div>

      <div style={{background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', borderRadius:16, padding:16, border:'1px solid rgba(255,255,255,0.2)'}}>
        <h3 style={{color:'#fbbf24'}}>Principales</h3>
        {PLATOS.filter(p=>p.cat==="Principales").map(p=>
          <div key={p.id} style={{background:'rgba(0,0,0,0.6)', padding:14, borderRadius:12, marginBottom:10, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span>{p.nombre}</span><span style={{fontWeight:800}}>{p.precio}€ <button onClick={()=>add(p)} style={{marginLeft:10, background:'#1e3a5f', color:'white', border:0, padding:'6px 12px', borderRadius:8}}> + </button></span>
          </div>
        )}
        <h3 style={{color:'#fbbf24', marginTop:20}}>Postres</h3>
        {PLATOS.filter(p=>p.cat==="Postres").map(p=>
          <div key={p.id} style={{background:'rgba(0,0,0,0.6)', padding:14, borderRadius:12, marginBottom:10, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span>{p.nombre}</span><span style={{fontWeight:800}}>{p.precio}€ <button onClick={()=>add(p)} style={{marginLeft:10, background:'#1e3a5f', color:'white', border:0, padding:'6px 12px', borderRadius:8}}> + </button></span>
          </div>
        )}
      </div>

      {carrito.length>0 && (
        <div style={{background:'white', color:'black', borderRadius:16, padding:20, marginTop:20, textAlign:'center'}}>
          <b style={{fontSize:20}}>{mesa} · {personas} pers · {fecha} 21:00</b>
          <p style={{color:'#666'}}>{carrito.length} platos - Total {total}€</p>
          <button onClick={reservar} style={{background:'#14532d', color:'white', width:'100%', padding:18, borderRadius:14, border:0, fontSize:18, fontWeight:800}}>🍽️ Reservar {mesa} por WhatsApp</button>
        </div>
      )}
      <p style={{textAlign:'center', color:'#aaa', marginTop:20, fontSize:12}}>Galeón Restaurante - Villaviciosa, Asturias</p>
    </div>
  )
}
