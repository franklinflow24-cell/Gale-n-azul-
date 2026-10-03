'use client'
import { useState } from 'react'

const MENU = [
  { cat: 'ESPECIALES DE LA CASA', items: [{ name: 'Pollo al Horno', desc: 'Papas y ensalada', price: 750 }, { name: 'Pollo al Grill', desc: 'Salsa de la casa', price: 650 }, { name: 'Pollo Asado', desc: 'Receta original', price: 700 }] },
  { cat: 'PLATOS FUERTES', items: [{ name: 'Paella Marinera', desc: 'Mariscos frescos', price: 890 }, { name: 'Filete de Res', desc: 'Chimichurri', price: 1150 }, { name: 'Chuleta de Cerdo', desc: 'A la parrilla', price: 800 }] },
  { cat: 'ACOMPAÑANTES', items: [{ name: 'Arroz con Gandules', desc: 'Porción', price: 250 }, { name: 'Tostones', desc: 'Con ajo', price: 180 }, { name: 'Yuca Frita', desc: 'Con queso', price: 220 }] },
  { cat: 'BEBIDAS', items: [{ name: 'Mojito Clásico', desc: 'Menta y hielo', price: 350 }, { name: 'Coca Cola', desc: 'Fria', price: 150 }, { name: 'Jugo Natural', desc: 'Naranja', price: 200 }] },
]

export default function Page() {
  const [vista, setVista] = useState('inicio') // inicio, reserva, menu
  const [mesa, setMesa] = useState<number | null>(null)
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [cart, setCart] = useState<any[]>([])

  const total = cart.reduce((s, i) => s + i.price, 0)
  const add = (item: any) => setCart([...cart, item])

  const enviar = () => {
    if (!mesa || cart.length === 0) return alert('Elige mesa y tu pedido')
    const mensaje = `*GALEÓN RESTAURANTE - LA ROMANA*\n\nNombre: ${nombre || 'Sin nombre'}\nFecha: ${fecha}\nHora: ${hora}\nMesa: #${mesa}\n\nPedido:\n${cart.map(c => `- ${c.name} $${c.price}`).join('\n')}\n\nTOTAL: $${total}`
    window.open(`https://wa.me/18095551234?text=${encodeURIComponent(mensaje)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#0a1a2f] text-white flex flex-col">

      {/* FONDO MOVIENDOSE */}
      <div className="fixed inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070" className="w-full h-full object-cover animate-[pan_20s_ease-in-out_infinite_alternate]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a2f]/70 via-[#0a1a2f]/60 to-[#0a1a2f]"></div>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 flex-1 max-w-md mx-auto w-full px-6 pt-16 pb-44">

        {/* === INICIO - EXACTO COMO LA FOTO === */}
        {vista === 'inicio' && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 border border-amber-500/60 rounded-full px-5 py-2 text-amber-300 tracking-[0.3em] text-xs">
              ⚓ LA ROMANA
            </div>
            <h1 className="text-6xl font-serif font-bold leading-[0.95] mt-8 text-white drop-shadow-xl">GALEÓN<br />RESTAURANTE</h1>
            <p className="mt-5 text-gray-200 text-lg leading-relaxed">Cocina marinera y sabor del Caribe. Reserva tu mesa o haz tu pedido en un instante.</p>

            <div className="mt-10 space-y-4">
              <button onClick={() => setVista('reserva')} className="w-full bg-amber-400 text-black font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl">
                🍴 RESERVAR MESA
              </button>
              <button onClick={() => setVista('menu')} className="w-full border border-amber-400/60 text-amber-300 font-bold text-lg py-5 rounded-2xl tracking-wide">
                VER MENÚ Y PEDIR
              </button>
            </div>
          </div>
        )}

        {/* === RESERVA: NOMBRE, FECHA, HORA, 15 MESAS === */}
        {vista === 'reserva' && (
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6">
            <button onClick={() => setVista('inicio')} className="text-amber-300 text-sm mb-4">← Volver</button>
            <h2 className="text-2xl font-bold mb-6">Reservar Mesa</h2>

            <label className="text-xs tracking-widest text-amber-300 font-semibold">NOMBRE</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" className="w-full mt-1 mb-5 p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none" />

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <label className="text-xs tracking-widest text-amber-300 font-semibold">FECHA</label>
                <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none" />
              </div>
              <div>
                <label className="text-xs tracking-widest text-amber-300 font-semibold">HORA</label>
                <input type="time" value={hora} onChange={e => setHora(e.target.value)} className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none" />
              </div>
            </div>

            <h3 className="text-sm font-bold mb-3">ELIGE TU MESA {mesa && <span className="text-amber-300">- #{mesa}</span>}</h3>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 15 }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setMesa(n)} className={`h-12 rounded-xl font-bold ${mesa === n ? 'bg-amber-400 text-black' : 'bg-white/10 border border-white/20 text-white'}`}>{n}</button>
              ))}
            </div>

            <button onClick={() => setVista('menu')} className="w-full mt-6 bg-amber-400 text-black font-bold py-4 rounded-xl">CONTINUAR A MENÚ →</button>
          </div>
        )}

        {/* === MENU === */}
        {vista === 'menu' && (
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6">
            <button onClick={() => setVista('reserva')} className="text-amber-300 text-sm mb-4">← Volver a Reserva</button>
            <h2 className="text-2xl font-bold mb-5">Menú</h2>

            {MENU.map(g => (
              <div key={g.cat} className="mb-7">
                <h3 className="text-amber-300 font-bold text-sm border-b border-amber-400/30 pb-2 mb-3">{g.cat}</h3>
                {g.items.map((it: any) => (
                  <div key={it.name} className="flex justify-between items-center py-3 border-b border-white/5">
                    <div>
                      <p className="font-semibold">{it.name}</p>
                      <p className="text-xs text-gray-400">{it.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-amber-300 font-bold">${it.price}</span>
                      <button onClick={() => add(it)} className="w-9 h-9 bg-amber-400 text-black rounded-full font-bold text-lg">+</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === BARRA VERDE FIJA ABAJO - IGUAL QUE LA FOTO === */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-emerald-600 text-white px-5 pt-3 pb-5 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest">{cart.length} PLATOS</p>
            <p className="text-3xl font-bold">TOTAL: ${total.toFixed(2)}</p>
          </div>
          <button className="border border-white/60 px-5 py-2.5 rounded-xl font-semibold">
            {mesa ? `Mesa #${mesa}` : 'Mesa #'}
          </button>
        </div>
        <div className="max-w-md mx-auto mt-3">
          <button onClick={enviar} className="w-full bg-white/20 border border-white/40 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg">
            ✈️ ENVIAR PEDIDO POR WHATSAPP
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pan { 0% { transform: scale(1.05) translateX(0); } 100% { transform: scale(1.15) translateX(-25px); } }
      `}</style>
    </div>
  )
}
