"use client"
import { useState, useEffect } from 'react';

export default function Admin() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const checkLogin = () => {
    if(user.toLowerCase().trim() === "galeon" && pass.trim() === "galeonvillaviciosa31"){
      setLogin(true);
      localStorage.setItem("galeon_admin", "true");
    } else {
      alert("Usuario o contraseña incorrecta");
    }
  }

  useEffect(() => {
      useEffect(() => {
    if(localStorage.getItem("galeon_admin") === "true") setLogin(true);
    const cargar = async () => {
      try {
        const res = await fetch('/api/pedidos');
        const data = await res.json();
        setPedidos(data);
      } catch(e){}
    };
    cargar();
    setInterval(cargar, 5000);
  }, []);

  if(!login){
    return (
      <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a2540', padding:16}}>
        <div style={{background:'white', borderRadius:16, padding:32, width:'100%', maxWidth:360}}>
          <h1 style={{textAlign:'center', fontWeight:800, fontSize:24, color:'#0a2540'}}>GALEÓN AZUL</h1>
          <p style={{textAlign:'center', color:'#888', marginBottom:24, fontSize:13}}>Panel Villaviciosa</p>
          <input placeholder="Usuario" onChange={e=>setUser(e.target.value)} style={{width:'100%', border:'1px solid #ccc', padding:12, borderRadius:8, marginBottom:12}} />
          <input placeholder="Contraseña" type="password" onChange={e=>setPass(e.target.value)} style={{width:'100%', border:'1px solid #ccc', padding:12, borderRadius:8, marginBottom:16}} />
          <button onClick={checkLogin} style={{width:'100%', background:'#c5a059', color:'white', padding:12, borderRadius:8, fontWeight:700, border:'none'}}>Entrar al Panel</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh', background:'#f5f7f9', fontFamily:'sans-serif'}}>
      <div style={{background:'#0a2540', color:'white', padding:'16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{fontWeight:700}}>⚓ Galeón Azul - Panel</span>
        <button onClick={()=>{localStorage.removeItem("galeon_admin"); setLogin(false)}} style={{background:'rgba(255,255,255,0.15)', border:'none', color:'white', padding:'6px 12px', borderRadius:6}}>Salir</button>
      </div>

      <div style={{padding:16, maxWidth:800, margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:20}}>
          <div style={{background:'white', padding:16, borderRadius:12, borderLeft:'4px solid #2563eb'}}><small style={{color:'#888'}}>Pedidos Hoy</small><div style={{fontSize:22, fontWeight:800}}>0</div></div>
          <div style={{background:'white', padding:16, borderRadius:12, borderLeft:'4px solid #16a34a'}}><small style={{color:'#888'}}>Reservas Hoy</small><div style={{fontSize:22, fontWeight:800}}>0</div></div>
          <div style={{background:'white', padding:16, borderRadius:12, borderLeft:'4px solid #c5a059'}}><small style={{color:'#888'}}>Estado</small><div style={{fontWeight:700, color:'green'}}>● Abierto</div></div>
        </div>

        <div style={{background:'white', borderRadius:12, padding:16, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
          <h3 style={{fontWeight:700, marginBottom:8}}>📦 Últimos Pedidos</h3>
          <p style={{color:'#999', fontSize:14}}>Aún no hay pedidos web. Cuando un cliente pida desde la web principal, aquí aparecerá.</p>
          <div style={{marginTop:12, background:'#eff6ff', padding:10, borderRadius:8, fontSize:13, color:'#1e40af'}}>Prueba: Haz un pedido desde la web y aparecerá aquí al instante.</div>
        </div>

        <div style={{background:'white', borderRadius:12, padding:16, boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
          <h3 style={{fontWeight:700, marginBottom:8}}>📅 Reservas</h3>
          <p style={{color:'#999', fontSize:14}}>No hay reservas hoy.</p>
        </div>
      </div>
    </div>
  )
}
