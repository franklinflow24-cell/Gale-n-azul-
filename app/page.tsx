'use client'
import { useState, useEffect } from 'react'

export default function Page() {
  const [sel, setSel] = useState<number|null>(null)
  const [reservas, setReservas] = useState<any[]>([])

  useEffect(()=>{
    setReservas(JSON.parse(localStorage.getItem('galeon_res')||'[]'))
  },[])

  const reservar = () => {
    const nombre = (document.getElementById('nombre') as HTMLInputElement)?.value
    const hora = (document.getElementById('hora') as HTMLInputElement)?.value
    if(!sel || !nombre || !hora){ alert('Elige mesa, nombre y hora'); return }
    const r = {mesa:sel, nombre, hora, fecha: new Date().toLocaleString()}
    const nuevas = [...reservas, r]
    setReservas(nuevas)
    localStorage.setItem('galeon_res', JSON.stringify(nuevas))
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(`Hola Galeón, Mesa ${sel} para ${nombre} a las ${hora}. Pago en caja.`)}`,'_blank')
  }

  return (
    <div style={{margin:0,fontFamily:'system-ui',background:'#eaf4fb',color:'#0a2a5a',minHeight:'100vh'}}>
      <style>{`.mesa.ocupada{background:#ddd!important; color:#777}`}</style>
      <div style={{background:'linear-gradient(90deg,#a8d4f0,#0a3d7a)',padding:'12px 16px',display:'flex',justifyContent:'space-between',color:'#fff',position:'sticky',top:0,zIndex:9}}>
        <b>⚓ GALEÓN</b><span style={{background:'#fff',color:'#0a3d7a',padding:'4px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:900}}>VILLAVICIOSA</span>
      </div>
      <div style={{height:'72vh',background:'linear-gradient(to bottom,rgba(0,0,0,0) 30%,#0a3d7a 95%),url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200) center/cover',display:'flex',alignItems:'end',justifyContent:'center',textAlign:'center',padding:'0 20px 30px',color:'#fff'}}>
        <div>
          <h1 style={{fontFamily:'Georgia,serif',fontSize:'64px',margin:0,lineHeight:.9}}>Galeón<br/><span style={{fontSize:'16px',letterSpacing:'10px'}}>SIDRERÍA</span></h1>
          <div style={{marginTop:'12px'}}><a href="#reservar" style={{background:'#5a0a1a',color:'#fff',padding:'14px 28px',borderRadius:'12px',textDecoration:'none',fontWeight:900,margin:'6px',display:'inline-block'}}>RESERVAR MESA</a></div>
          <p style={{fontSize:'12px',marginTop:'10px'}}>Lun a Dom - Cerrado Jueves • 15 mesas • Pago en Caja</p>
        </div>
      </div>
      <div id="reservar" style={{background:'#fff',margin:'14px',borderRadius:'20px',padding:'18px'}}>
        <h2 style={{margin:0,color:'#5a0a1a'}}>Reservar Mesa (15 mesas)</h2>
        <div style={{marginTop:'12px'}}>
          {Array.from({length:15},(_,i)=>{
            const n=i+1
            const ocup = reservas.find(r=>r.mesa===n)
            return <div key={n} onClick={()=>!ocup && setSel(n)} className={ocup?'mesa ocupada':'mesa'} style={{display:'inline-block',width:'31%',margin:'1%',padding:'12px',border:`2px solid ${sel===n?'#5a0a1a':'#a8d4f0'}`,borderRadius:'12px',textAlign:'center',cursor:'pointer',fontWeight:900, background: ocup?'#ddd':'#fff'}}>{ocup?'🔒':''} Mesa {n}<br/><span style={{fontSize:'11px',fontWeight:400}}>{n<=5?'2 pers':n<=10?'4 pers':'6 pers'}</span></div>
          })}
        </div>
        <div style={{marginTop:'12px',display:'flex',gap:'8px'}}>
          <input id="nombre" placeholder="Tu nombre" style={{flex:1,padding:'12px',borderRadius:'10px',border:'1px solid #cbd'}}/>
          <input id="hora" type="time" style={{padding:'12px',borderRadius:'10px',border:'1px solid #cbd'}}/>
        </div>
        <button onClick={reservar} style={{background:'#5a0a1a',color:'#fff',padding:'14px 28px',borderRadius:'12px',fontWeight:900,border:0,width:'100%',marginTop:'10px',cursor:'pointer'}}>Confirmar por WhatsApp</button>
        <p style={{color:'green',fontWeight:900,marginTop:'10px',fontSize:'13px'}}>✅ TRUCO 0 CRÉDITOS: Editas aquí gratis, sin v0</p>
      </div>
    </div>
  )
}
