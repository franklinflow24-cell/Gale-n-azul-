"use client"
import { useState, useEffect } from 'react';

export default function Admin() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [pedidos, setPedidos] = useState<any[]>([]);

  const checkLogin = () => {
    if(user.toLowerCase().trim() === "galeon" && pass.trim() === "galeonvillaviciosa31"){
      setLogin(true);
      localStorage.setItem("galeon_admin", "true");
    } else {
      alert("Usuario o contraseña incorrecta");
    }
  }

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
    const intervalo = setInterval(cargar, 5000);
    return () => clearInterval(intervalo);
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
        <span style={{fontWeight:700}}>⚓ Galeón Azul - Panel REAL</span>
        <button onClick={()=>{localStorage.removeItem("galeon_admin"); setLogin(false)}} style={{background:'rgba(255,255,255,0.15)', border:'none', color:'white', padding:'6px 12px', borderRadius:6}}>Salir</button>
      </div>

      <div style={{padding:16, maxWidth:800, margin:'0 auto'}}>
        <div style={{background:'white', padding:16, borderRadius:12, borderLeft:'4px solid #2563eb', marginBottom:16}}>
          <small style={{color:'#888'}}>Pedidos Totales</small>
          <div style={{fontSize:22, fontWeight:800}}>{pedidos.length}</div>
          <small style={{color:'green'}}>Actualiza cada 5 seg</small>
        </div>

        <div style={{background:'white', borderRadius:12, padding:16, boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
          <h3 style={{fontWeight:700, marginBottom:12}}>📦 Últimos Pedidos (En vivo)</h3>
          {pedidos.length === 0 ? (
            <p style={{color:'#999', fontSize:14}}>Aún no hay pedidos. Haz uno desde la web principal para probar.</p>
          ) : (
            pedidos.map((p:any, i:number) => (
              <div key={i} style={{borderBottom:'1px solid #eee', padding:'10px 0'}}>
                <div style={{fontWeight:700}}>{p.total || JSON.stringify(p.items)}</div>
                <div style={{fontSize:12, color:'#666'}}>{p.hora} - {p.tipo}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
