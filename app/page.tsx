'use client'
import { useState } from 'react'

export default function Page(){
  const [nombre,setNombre]=useState('')
  const [mesa,setMesa]=useState('2')
  const [hora,setHora]=useState('20:00')
  const [mostrarReservas,setMostrarReservas]=useState(false)
  const [reservas,setReservas]=useState<any[]>([])

  const reservar=()=>{
    if(!nombre){alert('Pon tu nombre');return}
    const r={mesa,nombre,hora,fecha:new Date().toLocaleString()}
    const nuevas=[...reservas,r]
    setReservas(nuevas)
    localStorage.setItem('reservas',JSON.stringify(nuevas))
    const tel="34635559767"
    const msg=`Hola! Soy ${nombre}, quiero reservar mesa para ${mesa} personas a las ${hora} en El Galeón - C/ Villaviciosa Nº13, Villaviciosa, Asturias`
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`,'_blank')
    setNombre('')
  }

  return(
    <div style={{fontFamily:'serif',background:'#0a1929',color:'white',minHeight:'100vh'}}>
      <div style={{backgroundImage:'linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0)',backgroundSize:'cover',backgroundPosition:'center',padding:'40px 20px',textAlign:'center'}}>
        <div style={{border:'1px solid #d4af37',display:'inline-block',padding:'6px 18px',borderRadius:'30px',color:'#d4af37',letterSpacing:'4px',fontSize:'14px'}}>VILLAVICIOSA</div>
        <h1 style={{fontSize:'56px',fontWeight:'bold',marginTop:'30px',lineHeight:'1'}}>GALEÓN<br/>RESTAURANTE</h1>
        <p style={{color:'#b0c4de',marginTop:'15px',maxWidth:'600px',marginInline:'auto'}}>Sidrería asturiana y cocina marinera. Reserva tu mesa en Villaviciosa, Asturias.</p>
        
        <div style={{background:'white',color:'black',maxWidth:'380px',margin:'30px auto',padding:'20px',borderRadius:'16px',textAlign:'left'}}>
          <h3 style={{fontWeight:'bold'}}>Reserva tu mesa</h3>
          <input placeholder="Tu nombre" value={nombre} onChange={e=>setNombre(e.target.value)} style={{width:'100%',padding:'10px',margin:'8px 0',border:'1px solid #ccc',borderRadius:'8px'}}/>
          <div style={{display:'flex',gap:'10px'}}>
            <select value={mesa} onChange={e=>setMesa(e.target.value)} style={{flex:1,padding:'10px',borderRadius:'8px'}}><option>1 pers</option><option>2 pers</option><option>3 pers</option><option>4 pers</option><option>5 pers</option><option>6 pers</option></select>
            <select value={hora} onChange={e=>setHora(e.target.value)} style={{flex:1,padding:'10px',borderRadius:'8px'}}><option>13:00</option><option>14:00</option><option>15:00</option><option>20:00</option><option>21:00</option><option>22:00</option></select>
          </div>
          <button onClick={reservar} style={{width:'100%',background:'#0f4c2a',color:'white',padding:'12px',marginTop:'12px',borderRadius:'8px',border:'none',fontWeight:'bold'}}>Reservar por WhatsApp</button>
          <p style={{fontSize:'11px',textAlign:'center',marginTop:'8px',color:'#666'}}>📍 C/ Villaviciosa Nº13, Villaviciosa - Asturias, España</p>
        </div>
      </div>
    </div>
  )
}
