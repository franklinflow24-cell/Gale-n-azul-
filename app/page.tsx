'use client'
import { useState } from 'react'

export default function Page() {
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('20:30')
  const [personas, setPersonas] = useState('2')
  const [numMesa, setNumMesa] = useState('1')

  const reservar = () => {
    if (!nombre) return alert('Escribe tu nombre')
    if (!fecha) return alert('Elige la fecha')
    const tel = "34635559767"
    const msg = `Hola Galeón! 👋 Soy ${nombre}. Quiero reservar la MESA ${numMesa} para ${personas} personas el día ${fecha} a las ${hora}.`
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const Item = ({n,p}:any) => (
    <div style={{display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:'1px solid rgba(255,255,255,0.08)', fontSize:'14px'}}>
      <span style={{paddingRight:'15px'}}>{n}</span><b style={{color:'#d4af37', whiteSpace:'nowrap'}}>{p}</b>
    </div>
  )

  return (
    <div style={{background:'#081425', color:'white', fontFamily:'system-ui'}}>
      <div style={{textAlign:'center', padding:'50px 20px 10px 20px'}}>
        <p style={{color:'#d4af37', letterSpacing:'4px', fontSize:'11px', margin:0}}>VILLAVICIOSA - ASTURIAS</p>
        <h1 style={{fontSize:'48px', margin:'10px 0', fontFamily:'Georgia'}}>GALEÓN<br/>RESTAURANTE</h1>
      </div>

      <div style={{maxWidth:'700px', margin:'0 auto', padding:'20px'}}>
        <div style={{background:'white', color:'#111', padding:'28px', borderRadius:'16px'}}>
          <h2 style={{margin:'0 0 4px 0'}}>Reserva tu mesa</h2>
          <p style={{color:'#666', fontSize:'13px', margin:'0 0 20px 0'}}>Elige mesa, fecha y personas</p>

          <label style={{fontSize:'13px', fontWeight:'bold'}}>Tu nombre</label>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ej: Franklin" style={{width:'100%', padding:'14px', margin:'8px 0 18px 0', borderRadius:'10px', border:'1px solid #ddd', boxSizing:'border-box'}} />

          <label style={{fontSize:'13px', fontWeight:'bold'}}>Fecha</label>
          <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={{width:'100%', padding:'14px', margin:'8px 0 18px 0', borderRadius:'10px', border:'1px solid #ddd', boxSizing:'border-box'}} />

          <label style={{fontSize:'13px', fontWeight:'bold'}}>Hora</label>
          <select value={hora} onChange={e=>setHora(e.target.value)} style={{width:'100%', padding:'14px', margin:'8px 0 18px 0', borderRadius:'10px', border:'1px solid #ddd', boxSizing:'border-box'}}>
            <option>13:00</option><option>13:30</option><option>14:00</option><option>14:30</option><option>15:00</option><option>20:00</option><option>20:30</option><option>21:00</option><option>21:30</option><option>22:00</option>
          </select>

          <label style={{fontSize:'13px', fontWeight:'bold'}}>¿Cuántas personas?</label>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', margin:'8px 0 18px 0'}}>
            {['1','2','3','4','5','6','7','8','9','10+'].map(n => (
              <button key={n} onClick={()=>setPersonas(n)} style={{padding:'12px', borderRadius:'10px', border: personas===n ? '2px solid #0a4a2a' : '1px solid #ddd', background: personas===n ? '#0a4a2a' : 'white', color: personas===n ? 'white' : 'black', fontWeight:'bold', cursor:'pointer'}}>
                {n}
              </button>
            ))}
          </div>

          <label style={{fontSize:'13px', fontWeight:'bold'}}>Elige tu mesa (1 al 15)</label>
          <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:'10px', margin:'8px 0 24px 0'}}>
            {Array.from({length:15}, (_,i)=> (i+1).toString()).map(n => (
              <button key={n} onClick={()=>setNumMesa(n)} style={{padding:'14px 5px', borderRadius:'10px', border: numMesa===n ? '2px solid #d4af37' : '1px solid #ddd', background: numMesa===n ? '#d4af37' : 'white', color: numMesa===n ? 'black' : 'black', fontWeight:'bold', cursor:'pointer'}}>
                Mesa {n}
              </button>
            ))}
          </div>

          <button onClick={reservar} style={{width:'100%', padding:'18px', background:'#25D366', color:'white', border:'none', borderRadius:'12px', fontWeight:'bold', fontSize:'16px', cursor:'pointer'}}>
            Reservar Mesa {numMesa} por WhatsApp
          </button>
        </div>

        {/* CARTA REAL COMPLETA */}
        <h2 style={{color:'#d4af37', textAlign:'center', marginTop:'50px', fontSize:'32px', fontFamily:'Georgia'}}>Nuestra Carta</h2>
        <div style={{background:'rgba(255,255,255,0.05)', padding:'20px', borderRadius:'16px', marginTop:'15px', border:'1px solid rgba(212,175,55,0.2)'}}>
          <h3 style={{color:'#d4af37'}}>Ensaladas</h3>
          <Item n="Ensalada sencilla (LTC)" p="7,00 €" />
          <Item n="Ensalada mixta" p="13,00 €" />
          <Item n="Ensalada Galeón (pixín, gulas, gambas y champiñones)" p="20,00 €" />
          <Item n="Ensalada de cecina con queso de cabra y cebolla caramelizada" p="18,00 €" />
          <h3 style={{color:'#d4af37', marginTop:'25px'}}>Para Picar</h3>
          <Item n="Calamares frescos" p="21,00 €" />
          <Item n="Chipirones fritos" p="17,00 €" />
          <Item n="Chipirones afogaos" p="18,00 €" />
          <Item n="Fritos de merluza" p="16,00 €" />
          <Item n="Fritos de bacalao" p="18,00 €" />
          <Item n="Fritos de pixín" p="20,00 €" />
          <Item n="Gambas al ajillo" p="18,00 €" />
          <Item n="Zamburiñas" p="20,00 €" />
          <Item n="Llámpares a la sidra" p="13,00 €" />
          <Item n="Mejillones vinagreta" p="12,00 €" />
          <Item n="Mejillones en salsa verde" p="13,00 €" />
          <Item n="Pulpo a la plancha" p="23,00 €" />
          <Item n="Croquetas caseras de jamón" p="13,00 €" />
          <Item n="Patatas 3 salsas" p="11,00 €" />
          <Item n="Pollo al ajillo" p="11,00 €" />
          <Item n="Paté de cabracho" p="13,00 €" />
          <Item n="Tabla de embutidos" p="18,00 €" />
          <Item n="Tabla de quesos Asturianos" p="16,00 €" />
          <Item n="Cazuela de pulpo y gambas" p="19,00 €" />
          <h3 style={{color:'#d4af37', marginTop:'25px'}}>de Cuchara</h3>
          <Item n="Fabada asturiana" p="14,00 €" />
          <Item n="Sopa de marisco" p="10,00 €" />
          <Item n="Calamares en su tinta" p="20,00 €" />
          <h3 style={{color:'#d4af37', marginTop:'25px'}}>Arroces</h3>
          <Item n="Arroz negro con ali-oli" p="22,00 €" />
          <Item n="Paella de marisco" p="24,00 €" />
          <h3 style={{color:'#d4af37', marginTop:'25px'}}>Carnes</h3>
          <Item n="Cachopo de jamón y queso" p="22,00 €" />
          <Item n="Escalopines al cabrales" p="16,00 €" />
          <Item n="Filete con patatas" p="15,00 €" />
          <Item n="Tacos de solomillo al ajillo" p="18,00 €" />
          <Item n="Picapollo (Dominicano)" p="18,00 €" />
          <Item n="Entrecot con patatas" p="21,00 €" />
          <Item n="Solomillo de ternera" p="22,00 €" />
          <h3 style={{color:'#d4af37', marginTop:'25px'}}>Postres</h3>
          <Item n="Tarta de queso" p="6,00 €" />
          <Item n="Tarta de la abuela" p="6,00 €" />
          <Item n="Arroz con leche" p="6,00 €" />
          <Item n="Flan de huevo" p="4,00 €" />
          <Item n="Queso cabrales" p="8,00 €" />
        </div>
      </div>
    </div>
  )
}
