'use client'
import { useState } from 'react'

const MENU = [
  { cat: 'Ensaladas', items: [{n:'Ensalada sencilla (LTC)', p:7},{n:'Ensalada mixta', p:13},{n:'Ensalada Galeón (pixín, gulas, gambas)', p:20},{n:'Ensalada de cecina', p:18}]},
  { cat: 'Para Picar', items: [{n:'Calamares frescos', p:21},{n:'Chipirones fritos', p:17},{n:'Gambas al ajillo', p:18},{n:'Zamburiñas', p:20},{n:'Pulpo a la plancha', p:23},{n:'Croquetas caseras', p:13},{n:'Tabla de quesos Asturianos', p:16}]},
  { cat: 'De Cuchara & Arroces', items: [{n:'Fabada asturiana', p:14},{n:'Sopa de marisco', p:10},{n:'Arroz negro con ali-oli', p:22},{n:'Paella de marisco', p:24}]},
  { cat: 'Carnes', items: [{n:'Cachopo de jamón y queso', p:22},{n:'Escalopines al cabrales', p:16},{n:'Entrecot con patatas', p:21},{n:'Solomillo de ternera', p:22},{n:'Picapollo Dominicano', p:18}]},
  { cat: 'Postres', items: [{n:'Tarta de queso', p:6},{n:'Arroz con leche', p:6},{n:'Flan de huevo', p:4}]}
]

export default function Page(){
  const [vista,setVista]=useState('inicio')
  const [nombre,setNombre]=useState('')
  const [fecha,setFecha]=useState('')
  const [hora,setHora]=useState('20:30')
  const [personas,setPersonas]=useState('2')
  const [mesa,setMesa]=useState<number | null>(null)
  const [tipo,setTipo]=useState('comer')
  const [pedido,setPedido]=useState<any[]>([])
  const toggle = (item:any) => setPedido(prev => prev.find(x=>x.n===item.n) ? prev.filter(x=>x.n!==item.n) : [...prev, item])
  const total = pedido.reduce((s,i)=>s+i.p,0)

  const reservar = () => {
    if(!nombre || !fecha) return alert('Completa nombre y fecha')
    if(tipo==='comer' && !mesa) return alert('Elige tu mesa')
    const tel="34635559767"
    let platos = pedido.length ? `\n\nPlatos:\n${pedido.map(x=>`- ${x.n} (${x.p}€)`).join('\n')}\nTotal: ${total}€` : ''
    const servicio = tipo==='comer' ? `COMER AQUÍ - Mesa ${mesa} para ${personas} personas` : `PARA RECOGER (Take Away) para ${personas} personas`
    const msg=`Hola Galeón! Soy ${nombre}\n${servicio}\nDía: ${fecha} a las ${hora}${platos}`
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`,'_blank')
  }

  return(
    <div className="min-h-screen bg-[#0a1a2f] text-white flex flex-col">
      {/* FONDO MOVIÉNDOSE */}
      <div className="fixed inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070" className="w-full h-full object-cover animate-[pan_20s_ease-in-out_infinite_alternate]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a2f]/70 via-[#0a1a2f]/60 to-[#0a1a2f]"></div>
      </div>

      <div className="relative z-10 flex-1 max-w-md mx-auto w-full px-6 pt-16 pb-44">
        {vista==='inicio' && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 border border-amber-500/60 rounded-full px-5 py-2 text-amber-300 tracking-[0.3em] text-xs">⚓ VILLAVICIOSA - ASTURIAS</div>
            <h1 className="text-6xl font-serif font-bold leading-[0.95] mt-8">GALEÓN<br/>RESTAURANTE</h1>
            <p className="mt-5 text-gray-200 text-lg">Cocina marinera y sabor del Caribe. Reserva tu mesa o haz tu pedido en un instante.</p>
            <div className="mt-10 space-y-4">
              <button onClick={()=>setVista('reserva')} className="w-full bg-amber-400 text-black font-bold text-lg py-5 rounded-2xl">🍽️ RESERVAR MESA</button>
              <button onClick={()=>setVista('menu')} className="w-full border border-amber-400/60 text-amber-300 font-bold text-lg py-5 rounded-2xl">VER MENÚ Y PEDIR</button>
            </div>
          </div>
        )}

        {vista==='reserva' && (
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6">
            <button onClick={()=>setVista('inicio')} className="text-amber-300 text-sm mb-4">← Volver</button>
            <h2 className="text-2xl font-bold mb-5">¿Cómo lo quieres?</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button onClick={()=>setTipo('comer')} className={`p-4 rounded-xl font-bold ${tipo==='comer'?'bg-amber-400 text-black':'bg-white/10 border border-white/20'}`}>🍽️ Comer aquí</button>
              <button onClick={()=>setTipo('recoger')} className={`p-4 rounded-xl font-bold ${tipo==='recoger'?'bg-amber-400 text-black':'bg-white/10 border border-white/20'}`}>🥡 Para recoger</button>
            </div>

            <label className="text-xs tracking-widest text-amber-300 font-semibold">NOMBRE</label>
            <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Tu nombre" className="w-full mt-1 mb-4 p-4 bg-white/10 border border-white/20 rounded-xl text-white outline-none" />
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div><label className="text-xs tracking-widest text-amber-300 font-semibold">FECHA</label><input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none"/></div>
              <div><label className="text-xs tracking-widest text-amber-300 font-semibold">HORA</label><select value={hora} onChange={e=>setHora(e.target.value)} className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none"><option>13:00</option><option>14:00</option><option>20:30</option><option>21:00</option><option>21:30</option><option>22:00</option></select></div>
            </div>

            <label className="text-xs tracking-widest text-amber-300 font-semibold">PERSONAS</label>
            <div className="grid grid-cols-5 gap-2 my-2">
              {['1','2','3','4','5','6','7','8','9','10+'].map(n=>(<button key={n} onClick={()=>setPersonas(n)} className={`py-2 rounded-lg font-bold text-sm ${personas===n?'bg-amber-400 text-black':'bg-white/10 border border-white/20'}`}>{n}</button>))}
            </div>

            {tipo==='comer' && (
              <>
                <label className="text-xs tracking-widest text-amber-300 font-semibold mt-4 block">MESA (1 AL 15)</label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {Array.from({length:15},(_,i)=>i+1).map(n=>(<button key={n} onClick={()=>setMesa(n)} className={`h-12 rounded-xl font-bold ${mesa===n?'bg-amber-400 text-black':'bg-white/10 border border-white/20'}`}>{n}</button>))}
                </div>
              </>
            )}

            <button onClick={()=>setVista('menu')} className="w-full mt-6 bg-amber-400 text-black font-bold py-4 rounded-xl">CONTINUAR A MENÚ →</button>
          </div>
        )}

        {vista==='menu' && (
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6">
            <button onClick={()=>setVista('reserva')} className="text-amber-300 text-sm mb-4">← Volver a Reserva</button>
            <h2 className="text-2xl font-bold mb-5">Nuestra Carta - Toca para elegir</h2>
            {MENU.map(sec=>(
              <div key={sec.cat} className="mb-6">
                <h3 className="text-amber-300 font-bold text-sm border-b border-amber-400/30 pb-2 mb-3">{sec.cat}</h3>
                {sec.items.map(it=>{
                  const sel = pedido.find(x=>x.n===it.n)
                  return(<button key={it.n} onClick={()=>toggle(it)} className={`w-full flex justify-between items-center py-3 px-3 mb-2 rounded-xl text-left ${sel?'bg-amber-400 text-black font-bold':'bg-black/40 border border-white/10 text-white'}`}><span className="text-sm">{sel?'✓ ':''}{it.n}</span><b>{it.p}€</b></button>)
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BARRA VERDE FIJA COMO LA FOTO */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-emerald-600 text-white px-5 pt-3 pb-5 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest">{pedido.length} PLATOS</p>
            <p className="text-3xl font-bold">TOTAL: €{total.toFixed(2)}</p>
          </div>
          <button className="border border-white/60 px-5 py-2.5 rounded-xl font-semibold">{mesa ? `Mesa #${mesa}` : 'Mesa #'}</button>
        </div>
        <div className="max-w-md mx-auto mt-3">
          <button onClick={reservar} className="w-full bg-white/20 border border-white/40 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg">
            ✈️ ENVIAR PEDIDO POR WHATSAPP
          </button>
        </div>
      </div>

      <style jsx global>{`@keyframes pan { 0% { transform: scale(1.05) translateX(0); } 100% { transform: scale(1.15) translateX(-25px); } }`}</style>
    </div>
  )
}
