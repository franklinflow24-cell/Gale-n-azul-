'use client'
import { useState } from 'react'

export default function Page() {
  const [nombre, setNombre] = useState('')
  const [mesa, setMesa] = useState('2')
  const [hora, setHora] = useState('20:00')
  const [fecha, setFecha] = useState('')

  const reservar = () => {
    if (!nombre) { alert('Pon tu nombre'); return }
    if (!fecha) { alert('Pon la fecha'); return }
    const tel = "34635559767"
    const msg = `Hola! Soy ${nombre}, quiero reservar el ${fecha} a las ${hora} para ${mesa} personas en Galeón Restaurante. C/Villaviciosa Nº13`
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div style={{minHeight:'100vh', background:'#0a192f', color:'white', fontFamily:'serif'}}>
      <div style={{minHeight:'100vh', backgroundImage:'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0)', backgroundSize:'cover', backgroundPosition:'center', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
        
        <div style={{maxWidth:'900px', width:'100%', display:'grid', gridTemplateColumns:'1fr 380px', gap:'40px', alignItems:'center'}}>
          
          <div>
            <p style={{color:'#c9a86a', letterSpacing:'3px', fontSize:'12px', marginBottom:'10px'}}>VILLAVICIOSA</p>
            <h1 style={{fontSize:'60px', fontWeight:'bold', lineHeight:'0.9', margin:'0 0 20px 0'}}>GALEÓN<br/>RESTAURANTE</h1>
            <p style={{color:'#b0c4de', marginBottom:'30px'}}>C/Villaviciosa Nº13 - Villaviciosa, Asturias, España</p>
            
            <div style={{background:'rgba(255,255,255,0.05)', border:'1px solid #c9a86a', padding:'20px', borderRadius:'10px'}}>
              <h3 style={{color:'#c9a86a', marginTop:0}}>Nuestro Menú</h3>
              <p style={{fontSize:'14px', lineHeight:'1.8', margin:0}}>
                🥘 Fabada Asturiana<br/>
                🐟 Pescados del Cantábrico<br/>
                🥩 Cachopo de Ternera<br/>
                🍷 Sidra Natural de la Casa<br/>
                🍮 Arroz con Leche Asturiano
              </p>
            </div>
          </div>

          <div style={{background:'white', color:'black', padding:'25px', borderRadius:'12px', boxShadow:'0 20px 40px rgba(0,0,0,0.3)'}}>
            <b style={{fontSize:'18px', display:'block', marginBottom:'5px'}}>Reserva tu mesa</b>
            <p style={{fontSize:'12px', color:'#666', marginTop:0}}>Confirmación directa por WhatsApp</p>
            
            <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Tu nombre" style={{width:'100%', padding:'12px', margin:'10px 0', borderRadius:'8px', border:'1px solid #ddd', boxSizing:'border-box'}} />
            
            <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={{width:'100%', padding:'12px', margin:'0 0 10px 0', borderRadius:'8px', border:'1px solid #ddd', boxSizing:'border-box'}} />

            <div style={{display:'flex', gap:'10px', marginBottom:'15px'}}>
              <select value={mesa} onChange={e=>setMesa(e.target.value)} style={{flex:1, padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}}>
                <option value="1">1 persona</option>
                <option value="2">2 personas</option>
                <option value="3">3 personas</option>
                <option value="4">4 personas</option>
                <option value="5">5 personas</option>
                <option value="6">6+ personas</option>
              </select>
              <select value={hora} onChange={e=>setHora(e.target.value)} style={{flex:1, padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}}>
                <option>13:00</option>
                <option>14:00</option>
                <option>20:00</option>
                <option>21:00</option>
                <option>22:00</option>
              </select>
            </div>

            <button onClick={reservar} style={{width:'100%', padding:'14px', background:'#0a4a2a', color:'white', border:'none', borderRadius:'8px', fontWeight:'bold', cursor:'pointer', fontSize:'15px'}}>
              Reservar por WhatsApp
            </button>
            <p style={{fontSize:'10px', textAlign:'center', color:'#888', marginTop:'10px'}}>C/Villaviciosa Nº13, 33300 Villaviciosa</p>
          </div>

        </div>
      </div>
    </div>
  )
}
