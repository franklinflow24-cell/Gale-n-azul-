'use client'
import { useState } from 'react'

export default function Page() {
  const [nombre, setNombre] = useState('')
  const [mesa, setMesa] = useState('2')
  const [hora, setHora] = useState('20:00')

  const reservar = () => {
    if (!nombre) { alert('Pon tu nombre'); return }
    const tel = "34635559767"
    const msg = `Hola! Soy ${nombre}, quiero reservar mesa para ${mesa} personas a las ${hora} en El Galeón - C/ Villaviciosa Nº13, Villaviciosa, Asturias`
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div style={{minHeight:'100vh', background:'#0a1929', color:'white', fontFamily:'system-ui'}}>
      <div style={{minHeight:'100vh', backgroundImage:'linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0)', backgroundSize:'cover', padding:'40px 20px', textAlign:'center'}}>
        <div style={{border:'1px solid #d4af37', display:'inline-block', padding:'6px 18px', borderRadius:'20px', color:'#d4af37', fontSize:'13px', letterSpacing:'3px'}}>VILLAVICIOSA</div>
        <h1 style={{fontSize:'50px', fontWeight:'900', lineHeight:'0.9', marginTop:'25px'}}>GALEÓN<br/>RESTAURANTE</h1>
        <p style={{color:'#b0c4de', marginTop:'12px'}}>C/ Villaviciosa Nº13 - Villaviciosa, Asturias, España</p>
        <div style={{background:'white', color:'black', maxWidth:'360px', margin:'35px auto', padding:'22px', borderRadius:'16px', textAlign:'left'}}>
          <b>Reserva tu mesa</b>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Tu nombre" style={{width:'100%', padding:'12px', marginTop:'10px', border:'1px solid #ccc', borderRadius:'8px'}}/>
          <div style={{display:'flex', gap:'8px', marginTop:'10px'}}>
            <select value={mesa} onChange={e=>setMesa(e.target.value)} style={{flex:1, padding:'12px', borderRadius:'8px'}}><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select>
            <select value={hora} onChange={e=>setHora(e.target.value)} style={{flex:1, padding:'12px', borderRadius:'8px'}}><option>13:00</option><option>14:00</option><option>20:00</option><option>21:00</option><option>22:00</option></select>
          </div>
          <button onClick={reservar} style={{width:'100%', background:'#0f4c2a', color:'white', padding:'14px', marginTop:'14px', borderRadius:'8px', border:'none', fontWeight:'bold'}}>Reservar por WhatsApp</button>
          <p style={{fontSize:'11px', textAlign:'center', marginTop:'10px', color:'#666'}}>📍 C/ Villaviciosa Nº13, 33300 Villaviciosa</p>
        </div>
      </div>
    </div>
  )
}
