'use client'
import { useState } from 'react'

const MENU = [
  { cat: 'ESPECIALES DE LA CASA', items: [{ name: 'Pollo al Horno', desc: 'Con papas y ensalada', price: 750 }, { name: 'Pollo al Grill', desc: 'Salsa de la casa', price: 650 }, { name: 'Pollo Asado', desc: 'Receta original', price: 700 }] },
  { cat: 'PLATOS FUERTES', items: [{ name: 'Paella Marinera', desc: 'Mariscos frescos', price: 890 }, { name: 'Filete de Res', desc: 'Con chimichurri', price: 1150 }, { name: 'Chuleta de Cerdo', desc: 'A la parrilla', price: 800 }] },
  { cat: 'ACOMPAÑANTES', items: [{ name: 'Arroz con Gandules', desc: 'Porción', price: 250 }, { name: 'Tostones', desc: 'Con ajo', price: 180 }, { name: 'Yuca Frita', desc: 'Con queso', price: 220 }] },
  { cat: 'BEBIDAS', items: [{ name: 'Mojito Clásico', desc: 'Hielo y menta', price: 350 }, { name: 'Coca Cola', desc: 'Fria', price: 150 }, { name: 'Jugo Natural', desc: 'De naranja', price: 200 }] },
]

export default function Page() {
  const [mesa, setMesa] = useState<number | null>(null)
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [cart, setCart] = useState<any[]>([])

  const add = (item: any) => setCart([...cart, item])
  const total = cart.reduce((s, i) => s + i.price, 0)

  const confirmar = () => {
    if (!mesa || !nombre || !fecha || !hora || cart.length === 0) return alert('Completa nombre, fecha, hora, mesa y pedido')
    const mensaje = `*RESERVA - GALE & AZUL*\n\nNombre: ${nombre}\nMesa: ${mesa}\nFecha: ${fecha}\nHora: ${hora}\n\nPedido:\n${cart.map(c => `- ${c.name} $${c.price}`).join('\n')}\n\nTotal: $${total}`
    window.open(`https://wa.me/18095551234?text=${encodeURIComponent(mensaje)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-serif overflow-x-hidden">
      
      {/* IMAGEN DE FONDO MOVIMIENTO */}
      <div className="fixed inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070" className="w-full h-full object-cover animate-[pan_25s_ease-in-out_infinite_alternate]" />
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-5 pt-10 pb-20">
        
        {/* LOGO PROFESIONAL */}
        <div className="text-center mb-10">
          <div className="w-16 h-px bg-amber-400 mx-auto mb-4"></div>
          <h1 className="text-5xl font-light tracking-[0.25em] text-amber-300">GALE</h1>
          <h1 className="text-5xl font-light tracking-[0.25em] text-amber-300">&</h1>
          <h1 className="text-5xl font-light tracking-[0.25em] text-amber-300">AZUL</h1>
          <p className="mt-3 text-[11px] tracking-[0.4em] text-gray-300">RESTAURANTE PREMIUM</p>
        </div>

        {/* TARJETA PRINCIPAL */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[25px] p-6 shadow-2xl">

          {/* NOMBRE */}
          <label className="text-xs tracking-[0.2em] text-amber-300 font-semibold">NOMBRE COMPLETO</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Escribe tu nombre" className="w-full mt-2 mb-6 p-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:border-amber-400 outline-none" />

          {/* FECHA Y HORA */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="text-xs tracking-[0.2em] text-amber-300 font-semibold">FECHA</label>
              <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="w-full mt-2 p-3 bg-white/10 border border-white/15 rounded-xl text-white outline-none" />
            </div>
            <div>
              <label className="text-xs tracking-[0.2em] text-amber-300 font-semibold">HORA</label>
              <input type="time" value={hora} onChange={e => setHora(e.target.value)} className="w-full mt-2 p-3 bg-white/10 border border-white/15 rounded-xl text-white outline-none" />
            </div>
          </div>

          {/* 15 MESAS */}
          <div className="mb-10">
            <h2 className="text-sm tracking-[0.25em] font-bold text-white mb-4">SELECCIONA TU MESA <span className="text-amber-300">{mesa ? `- Mesa ${mesa}` : ''}</span></h2>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 15 }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setMesa(n)} className={`h-12 rounded-xl text-sm font-bold transition-all ${mesa === n ? 'bg-amber-400 text-black scale-105 shadow-lg shadow-amber-500/30' : 'bg-white/10 border border-white/15 text-gray-200 hover:bg-white/20'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* MENU */}
          {MENU.map(g => (
            <div key={g.cat} className="mb-8">
              <h3 className="text-amber-300 font-bold tracking-widest text-sm border-b border-amber-400/30 pb-2 mb-4">{g.cat}</h3>
              {g.items.map((it: any) => (
                <div key={it.name} className="flex justify-between items-start py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="font-semibold text-white">{it.name}</p>
                    <p className="text-xs text-gray-400">{it.desc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-amber-300 font-bold">${it.price}</span>
                    <button onClick={() => add(it)} className="w-9 h-9 bg-amber-400 text-black rounded-full font-bold text-lg flex items-center justify-center shadow-md shadow-amber-500/20">+</button>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* RESUMEN */}
          {cart.length > 0 && (
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-5">
              <p className="text-sm text-gray-300 mb-2">Tu pedido:</p>
              {cart.map((c, i) => <p key={i} className="text-sm text-white">• {c.name} - ${c.price}</p>)}
              <p className="mt-3 text-lg font-bold">Total: <span className="text-amber-300">${total}</span></p>
            </div>
          )}

          <button onClick={confirmar} className="w-full bg-amber-400 text-black font-bold text-lg py-4 rounded-xl tracking-wide hover:bg-amber-300 transition shadow-xl shadow-amber-500/20">
            CONFIRMAR RESERVA
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">Gale & Azul - La Romana</p>
      </div>

      <style jsx global>{`
        @keyframes pan { 0% { transform: scale(1) translateX(0); } 100% { transform: scale(1.15) translateX(-30px); } }
      `}</style>
    </div>
  )
}
