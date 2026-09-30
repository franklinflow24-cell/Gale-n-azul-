'use client'
import { useState } from 'react'

const MENU = [
  { cat: 'Ensaladas', items: [
    {n:'Ensalada sencilla (LTC)', p:7},{n:'Ensalada mixta', p:13},{n:'Ensalada Galeón (pixín, gulas, gambas)', p:20},{n:'Ensalada de cecina', p:18}
  ]},
  { cat: 'Para Picar', items: [
    {n:'Calamares frescos', p:21},{n:'Chipirones fritos', p:17},{n:'Gambas al ajillo', p:18},{n:'Zamburiñas', p:20},{n:'Pulpo a la plancha', p:23},{n:'Croquetas caseras', p:13},{n:'Tabla de quesos Asturianos', p:16}
  ]},
  { cat: 'De Cuchara & Arroces', items: [
    {n:'Fabada asturiana', p:14},{n:'Sopa de marisco', p:10},{n:'Arroz negro con ali-oli', p:22},{n:'Paella de marisco', p:24}
  ]},
  { cat: 'Carnes', items: [
    {n:'Cachopo de jamón y queso', p:22},{n:'Escalopines al cabrales', p:16},{n:'Entrecot con patatas', p:21},{n:'Solomillo de ternera', p:22},{n:'Picapollo Dominicano', p:18}
  ]},
  { cat: 'Postres', items: [
    {n:'Tarta de queso', p:6},{n:'Arroz con leche', p:6},{n:'Flan de huevo', p:4}
  ]}
]

export default function Page(){
  const [nombre,setNombre]=useState('')
  const [telefono,setTelefono]=useState('')
  const [fecha,setFecha]=useState('')
  const [hora,setHora]=useState('20:30')
  const [personas,setPersonas]=useState('2')
  const [mesa,setMesa]=useState('1')
  const [tipo,setTipo]=useState('comer')
  const [pedido,setPedido]=useState<any[]>([])
  const toggle = (item:any) => setPedido(prev => prev.find(x=>x.n===item.n) ? prev.filter(x=>x.n!==item.n) : [...prev, item])
  const total = pedido.reduce((s,i)=>s+i.p,0)

  const reservar = () => {
    if(!nombre || !fecha) return alert('Completa nombre y fecha')
    const telGaleon="18295435381"
    let platos = pedido.length ? `\n\nPlatos:\n${pedido.map(x=>`- ${x.n} (${x.p}€)`).join('\n')}\nTotal: ${total}€` : ''
    const servicio = tipo==='comer' ? `COMER AQUÍ - Mesa ${mesa} para ${personas} pers` : `PARA RECOGER para ${personas} pers`
    const msg=`Hola Galeón! 👋 Soy ${nombre} - Tel: ${telefono}\n${servicio}\nDía: ${fecha} a las ${hora}${platos}`
    window.open(`https://wa.me/${telGaleon}?text=${encodeURIComponent(msg)}`,'_blank')

    fetch("/api/pedidos", {
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ mesa, total: total+"€", items: pedido, personas, fecha, hora, nombre, telefono, tipo })
    });
  }

  return(
    <div style={{minHeight:'100vh', fontFamily:'system-ui', position:'relative'}}>
      <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, backgroundImage:'url(https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000)', backgroundSize:'cover', backgroundPosition:'center', zIndex:-2}}/>
      <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(5,20,40,0.85)', zIndex:-1}}/>

      <div style={{maxWidth:'800px', margin:'0 auto', padding:'20px', color:'white'}}>
        <div style={{textAlign:'center', padding:'40px 0 20px 0'}}>
          <p style={{color:'#d4af37', letterSpacing:'5px', fontSize:'11px'}}>VILLAVICIOSA - ASTURIAS</p>
          <h1 style={{fontSize:'58px', fontFamily:'Georgia', margin:'10px 0'}}>GALEÓN</h1>
        </div>

        <div style={{background:'white', color:'#111', padding:'20px', borderRadius:'16px', marginBottom:'20px'}}>
          <h3 style={{margin:'0 0 12px 0'}}>¿Cómo lo quieres?</h3>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
            <button onClick={()=>setTipo('comer')} style={{padding:'16px', borderRadius:'12px', border: tipo==='comer'?'2px solid #0a4a2a':'1px solid #ddd', background: tipo==='comer'?'#0a4a2a':'white', color: tipo==='comer'?'white':'black', fontWeight:'bold', cursor:'pointer'}}>🍽️ Comer aquí</button>
            <button onClick={()=>setTipo('recoger')} style={{padding:'16px', borderRadius:'12px', border: tipo==='recoger'?'2px solid #d4af37':'1px solid #ddd', background: tipo==='recoger'?'#d4af37':'white', color:'black', fontWeight:'bold', cursor:'pointer'}}>🥡 Para recoger</button>
          </div>
        </div>

        <div style={{background:'white', color:'#111', padding:'24px', borderRadius:'16px', marginBottom:'20px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'12px'}}>
            <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Tu nombre" style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #ddd', boxSizing:'border-box'}}/>
            <input value={telefono} onChange={e=>setTelefono(e.target.value)} placeholder="Tu WhatsApp" type="tel" inputMode="numeric" style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #ddd', boxSizing:'border-box'}}/>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
            <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #ddd', boxSizing:'border-box'}}/>
            <select value={hora} onChange={e=>setHora(e.target.value)} style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #ddd', boxSizing:'border-box'}}>
              <option>13:00</option><option>14:00</option><option>20:30</option><option>21:00</option><option>21:30</option><option>22:00</option>
            </select>
          </div>

          {tipo==='comer' ? (
            <>
              <label style={{fontSize:'12px', fontWeight:'bold', marginTop:'16px', display:'block'}}>Personas</label>
              <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'8px', margin:'8px 0 16px 0'}}>
                {['1','2','3','4','5','6','7','8','9','10+'].map(n=>(
                  <button key={n} onClick={()=>setPersonas(n)} style={{padding:'10px', borderRadius:'10px', border: personas===n?'2px solid #0a4a2a':'1px solid #ddd', background: personas===n?'#0a4a2a':'white', color: personas===n?'white':'black', fontWeight:'bold', cursor:'pointer'}}>{n}</button>
                ))}
              </div>
              <label style={{fontSize:'12px', fontWeight:'bold'}}>Mesa (1 al 15)</label>
              <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'8px', margin:'8px 0 0 0'}}>
                {Array.from({length:15},(_,i)=>(i+1).toString()).map(n=>(
                  <button key={n} onClick={()=>setMesa(n)} style={{padding:'12px 0', borderRadius:'10px', border: mesa===n?'2px solid #d4af37':'1px solid #ddd', background: mesa===n?'#d4af37':'white', fontWeight:'bold', cursor:'pointer'}}>Mesa {n}</button>
                ))}
              </div>
            </>
          ) : (
            <div style={{marginTop:'12px'}}>
              <label style={{fontSize:'12px', fontWeight:'bold'}}>¿Para cuántas personas?</label>
              <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'8px', marginTop:'8px'}}>
                {['1','2','3','4','5','6'].map(n=>(
                  <button key={n} onClick={()=>setPersonas(n)} style={{padding:'10px', borderRadius:'10px', border: personas===n?'2px solid #d4af37':'1px solid #ddd', background: personas===n?'#d4af37':'white', fontWeight:'bold', cursor:'pointer'}}>{n}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)', padding:'20px', borderRadius:'16px', border:'1px solid rgba(212,175,55,0.2)'}}>
          <h3 style={{color:'#d4af37', margin:'0 0 15px 0', fontFamily:'Georgia', fontSize:'22px'}}>Nuestra Carta - Toca para elegir</h3>
          {MENU.map(sec=>(
            <div key={sec.cat} style={{marginBottom:'18px'}}>
              <h4 style={{color:'#d4af37', margin:'0 0 8px 0', fontSize:'15px'}}>{sec.cat}</h4>
              {sec.items.map(it=>{
                const sel = pedido.find(x=>x.n===it.n)
                return(
                  <div key={it.n} onClick={()=>toggle(it)} style={{display:'flex', justifyContent:'space-between', padding:'12px', margin:'6px 0', background: sel?'#d4af37':'rgba(0,0,0,0.4)', color: sel?'black':'white', borderRadius:'10px', cursor:'pointer'}}>
                    <span style={{fontSize:'14px'}}>{sel?'✓ ':''}{it.n}</span><b>{it.p}€</b>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div style={{background:'white', color:'#111', padding:'24px', borderRadius:'16px', marginTop:'25px', textAlign:'center'}}>
          <h3 style={{margin:'0 0 5px 0'}}>{tipo==='comer' ? `Mesa ${mesa} · ${personas} pers · ${fecha || 'fecha'} ${hora}` : `Para recoger · ${personas} pers`}</h3>
          {pedido.length>0 && <p style={{fontSize:'13px', color:'#666'}}>{pedido.length} platos - Total {total}€</p>}
          <button onClick={reservar} style={{width:'100%', padding:'20px', background: tipo==='comer' ? '#0a4a2a' : '#d4af37', color: tipo==='comer' ? 'white' : 'black', border:'none', borderRadius:'14px', fontWeight:'bold', fontSize:'18px', cursor:'pointer', marginTop:'15px'}}>
            {tipo==='comer' ? `🍽️ Reservar Mesa ${mesa} por WhatsApp` : `🥡 Pedir para recoger`}
          </button>
          <p style={{fontSize:'11px', color:'#888', marginTop:'10px'}}>WhatsApp Restaurante: +1 (829) 543-5381</p>
        </div>
      </div>
    </div>
  )
}
