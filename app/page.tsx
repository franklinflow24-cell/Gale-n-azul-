'use client'
import { useState } from 'react'

const MENU = [
  { cat: 'Ensaladas', items: [
    {n:'Ensalada sencilla (LTC)', p:7},{n:'Ensalada mixta', p:13},{n:'Ensalada Galeón (pixín, gulas, gambas)', p:20},{n:'Ensalada de cecina con queso de cabra', p:18}
  ]},
  { cat: 'Para Picar', items: [
    {n:'Calamares frescos', p:21},{n:'Chipirones fritos', p:17},{n:'Chipirones afogaos', p:18},{n:'Fritos de merluza', p:16},{n:'Gambas al ajillo', p:18},{n:'Zamburiñas', p:20},{n:'Pulpo a la plancha', p:23},{n:'Croquetas caseras de jamón', p:13},{n:'Tabla de quesos Asturianos', p:16},{n:'Cazuela de pulpo y gambas', p:19}
  ]},
  { cat: 'De Cuchara & Arroces', items: [
    {n:'Fabada asturiana', p:14},{n:'Sopa de marisco', p:10},{n:'Calamares en su tinta', p:20},{n:'Arroz negro con ali-oli', p:22},{n:'Paella de marisco', p:24}
  ]},
  { cat: 'Carnes', items: [
    {n:'Cachopo de jamón y queso', p:22},{n:'Escalopines al cabrales', p:16},{n:'Entrecot con patatas', p:21},{n:'Solomillo de ternera', p:22},{n:'Picapollo (Dominicano)', p:18}
  ]},
  { cat: 'Postres', items: [
    {n:'Tarta de queso', p:6},{n:'Tarta de la abuela', p:6},{n:'Arroz con leche', p:6},{n:'Flan de huevo', p:4}
  ]}
]

export default function Page(){
  const [nombre,setNombre]=useState('')
  const [fecha,setFecha]=useState('')
  const [hora,setHora]=useState('20:30')
  const [personas,setPersonas]=useState('2')
  const [mesa,setMesa]=useState('1')
  const [pedido,setPedido]=useState<any[]>([])

  const toggle = (item:any) => {
    setPedido(prev => prev.find(x=>x.n===item.n) ? prev.filter(x=>x.n!==item.n) : [...prev, item])
  }
  const total = pedido.reduce((s,i)=>s+i.p,0)

  const reservar = () => {
    if(!nombre || !fecha) return alert('Completa nombre y fecha')
    const tel="34635559767"
    let platos = pedido.length ? `\n\nPlatos elegidos:\n${pedido.map(x=>`- ${x.n} (${x.p}€)`).join('\n')}\nTotal carta: ${total}€` : '\n\n(Sin platos, solo reserva de mesa)'
    const msg=`Hola Galeón! 👋\nSoy ${nombre}\nReserva: MESA ${mesa} para ${personas} personas\nDía: ${fecha} a las ${hora}${platos}`
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`,'_blank')
  }

  return(
    <div style={{background:'#0a1628', color:'white', fontFamily:'system-ui'}}>
      <div style={{maxWidth:'750px', margin:'0 auto', padding:'20px'}}>
        
        <div style={{textAlign:'center', padding:'30px 0'}}>
          <p style={{color:'#d4af37', letterSpacing:'5px', fontSize:'11px'}}>VILLAVICIOSA · DESDE 1985</p>
          <h1 style={{fontSize:'54px', fontFamily:'Georgia', margin:'10px 0'}}>GALEÓN</h1>
        </div>

        {/* RESERVA ARRIBA */}
        <div style={{background:'white', color:'#111', padding:'24px', borderRadius:'16px'}}>
          <h3 style={{margin:'0 0 10px 0'}}>1. Reserva tu mesa</h3>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Tu nombre" style={{width:'100%', padding:'14px', marginBottom:'12px', borderRadius:'10px', border:'1px solid #ddd', boxSizing:'border-box'}}/>
          <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={{width:'100%', padding:'14px', marginBottom:'12px', borderRadius:'10px', border:'1px solid #ddd', boxSizing:'border-box'}}/>
          <select value={hora} onChange={e=>setHora(e.target.value)} style={{width:'100%', padding:'14px', marginBottom:'12px', borderRadius:'10px', border:'1px solid #ddd', boxSizing:'border-box'}}>
            <option>13:00</option><option>14:00</option><option>20:30</option><option>21:00</option><option>21:30</option><option>22:00</option>
          </select>
          
          <label style={{fontSize:'12px', fontWeight:'bold'}}>Personas</label>
          <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'8px', margin:'8px 0 16px 0'}}>
            {['1','2','3','4','5','6','7','8','9','10+'].map(n=>(
              <button key={n} onClick={()=>setPersonas(n)} style={{padding:'10px', borderRadius:'10px', border: personas===n?'2px solid #0a4a2a':'1px solid #ddd', background: personas===n?'#0a4a2a':'white', color: personas===n?'white':'black', fontWeight:'bold', cursor:'pointer'}}>{n}</button>
            ))}
          </div>

          <label style={{fontSize:'12px', fontWeight:'bold'}}>Elige mesa (1 al 15)</label>
          <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'8px', margin:'8px 0 0 0'}}>
            {Array.from({length:15},(_,i)=>(i+1).toString()).map(n=>(
              <button key={n} onClick={()=>setMesa(n)} style={{padding:'12px 0', borderRadius:'10px', border: mesa===n?'2px solid #d4af37':'1px solid #ddd', background: mesa===n?'#d4af37':'white', fontWeight:'bold', cursor:'pointer'}}>Mesa {n}</button>
            ))}
          </div>
        </div>

        {/* CARTA */}
        <div style={{marginTop:'30px'}}>
          <h3 style={{margin:'0 0 10px 0', color:'#d4af37'}}>2. Elige tus platos (opcional)</h3>
          <p style={{fontSize:'12px', color:'#8da2b5', margin:'0 0 15px 0'}}>Toca para seleccionar</p>
          {MENU.map(sec=>(
            <div key={sec.cat} style={{marginBottom:'20px', background:'rgba(255,255,255,0.05)', padding:'16px', borderRadius:'14px', border:'1px solid rgba(212,175,55,0.15)'}}>
              <h4 style={{color:'#d4af37', margin:'0 0 10px 0', fontFamily:'Georgia'}}>{sec.cat}</h4>
              {sec.items.map(it=>{
                const sel = pedido.find(x=>x.n===it.n)
                return(
                  <div key={it.n} onClick={()=>toggle(it)} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px', margin:'6px 0', background: sel?'rgba(212,175,55,0.2)':'rgba(0,0,0,0.2)', border: sel?'1px solid #d4af37':'1px solid transparent', borderRadius:'10px', cursor:'pointer'}}>
                    <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                      <div style={{width:'20px', height:'20px', borderRadius:'5px', border:'1px solid #d4af37', background: sel?'#d4af37':'transparent', textAlign:'center', fontSize:'12px', color:'black', lineHeight:'20px'}}>{sel?'✓':''}</div>
                      <span style={{fontSize:'14px'}}>{it.n}</span>
                    </div>
                    <b style={{color:'#d4af37', fontSize:'14px'}}>{it.p}€</b>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* BOTON AL FINAL DE TODO */}
        <div style={{background:'white', color:'#111', padding:'24px', borderRadius:'16px', marginTop:'30px', textAlign:'center'}}>
          <h3 style={{margin:'0 0 5px 0'}}>Resumen</h3>
          <p style={{fontSize:'13px', color:'#666', margin:'0 0 15px 0'}}>Mesa {mesa} · {personas} personas · {fecha || 'Elige fecha'} a las {hora}</p>
          {pedido.length>0 ? (
            <div style={{textAlign:'left', background:'#f9f9f6', padding:'12px', borderRadius:'10px', fontSize:'13px', marginBottom:'15px'}}>
              {pedido.map(x=><div key={x.n} style={{display:'flex', justifyContent:'space-between'}}><span>{x.n}</span><b>{x.p}€</b></div>)}
              <div style={{borderTop:'1px solid #ddd', marginTop:'8px', paddingTop:'8px', display:'flex', justifyContent:'space-between', fontWeight:'bold'}}><span>Total carta</span><span>{total}€</span></div>
            </div>
          ) : <p style={{fontSize:'13px', color:'#888', marginBottom:'15px'}}>No has seleccionado platos (solo reserva)</p>}

          <button onClick={reservar} style={{width:'100%', padding:'20px', background:'#25D366', color:'white', border:'none', borderRadius:'14px', fontWeight:'bold', fontSize:'18px', cursor:'pointer'}}>
            ✅ Reservar Mesa {mesa} por WhatsApp
          </button>
          <p style={{fontSize:'11px', color:'#888', marginTop:'10px'}}>Te llega directo al restaurante</p>
        </div>

      </div>
    </div>
  )
}
