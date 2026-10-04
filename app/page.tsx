'use client'
import { useState } from 'react'

const MENU = [
  { cat: 'Ensaladas', items: [{n:'Ensalada sencilla (LTC)', p:7},{n:'Ensalada mixta', p:13},{n:'Ensalada Galeón (pixín, gulas, gambas y champiñones)', p:20},{n:'Ensalada de cecina con queso de cabra y cebolla caramelizada', p:18}]},
  { cat: 'Para Picar', items: [{n:'Calamares frescos', p:21},{n:'Chipirones fritos', p:17},{n:'Gambas al ajillo', p:18},{n:'Zamburiñas', p:20},{n:'Pulpo a la plancha', p:23},{n:'Croquetas caseras', p:13},{n:'Tabla de quesos Asturianos', p:16}]},
  { cat: 'De Cuchara & Arroces', items: [{n:'Fabada asturiana', p:14},{n:'Sopa de marisco', p:10},{n:'Arroz negro con ali-oli', p:22},{n:'Paella de marisco', p:24}]},
  { cat: 'Carnes', items: [{n:'Cachopo de jamón y queso', p:22},{n:'Escalopines al cabrales', p:16},{n:'Filete con patatas', p:15},{n:'Tacos de solomillo de cerdo al ajillo', p:18},{n:'Picapollo (Dominicano)', p:18},{n:'Entrecot con patatas', p:21},{n:'Solomillo de ternera', p:22}]},
  { cat: 'Postres', items: [{n:'Tarta de queso', p:6},{n:'Tarta de la abuela', p:6},{n:'Arroz con leche', p:6},{n:'Flan de huevo', p:4},{n:'Queso cabrales', p:8}]},
  { cat: 'Bodega - TINTOS', items: [{n:'Cosechero', p:8},{n:'Ramón Bilbao Rioja', p:18},{n:'Lan crianza', p:16},{n:'Señorío de Nava Ribera del Duero', p:16}]},
  { cat: 'Bodega - ROSADOS', items: [{n:'Peñascal Aguja', p:12},{n:'Faustino Rivero Navarra', p:11},{n:'Valjunco Prieto Picudo', p:13}]},
  { cat: 'Bodega - BLANCOS', items: [{n:'Camino Do Rey Albariño', p:16},{n:'Aido da Fonte Albariño', p:16},{n:'Valdeorras Godello', p:14},{n:'Caldirola Moscato', p:15},{n:'Navesur Rueda', p:14}]}
]

export default function Page() {
  const [vista, setVista] = useState('inicio')
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('20:30')
  const [personas, setPersonas] = useState('2')
  const [mesa, setMesa] = useState<number | null>(null)
  const [tipo, setTipo] = useState('comer')
  const [pedido, setPedido] = useState<any[]>([])

  const toggle = (item: any) => {
    setPedido(prev => prev.find(x => x.n === item.n) 
      ? prev.filter(x => x.n !== item.n) 
      : [...prev, item]
    )
  }
  const total = pedido.reduce((s, i) => s + i.p, 0)

  const reservar = () => {
    if (!nombre || !fecha) return alert('Completa nombre y fecha')
    if (tipo === 'comer' && !mesa) return alert('Elige tu mesa')
    const tel = "34635559767"
    let platos = pedido.length 
      ? `\n\nPlatos:\n${pedido.map(x => `- \( {x.n} ( \){x.p}€)`).join('\n')}\nTotal: ${total}€` 
      : ''
    const servicio = tipo === 'comer' 
      ? `COMER AQUÍ - Mesa ${mesa} para ${personas} personas` 
      : `PARA RECOGER (Take Away) para ${personas} personas`
    const msg = `Hola Galeón! Soy \( {nombre}\n \){servicio}\nDía: ${fecha} a las \( {hora} \){platos}`
    window.open(`https://wa.me/\( {tel}?text= \){encodeURIComponent(msg)}`, '_blank')
  }

  const showBar = vista !== 'inicio' || pedido.length > 0

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; }

        .page {
          min-height: 100vh;
          background: #0a1a2f;
          color: white;
          position: relative;
          overflow-x: hidden;
        }

        .bg {
          position: fixed;
          inset: 0;
          z-index: 0;
        }
        .bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.05);
        }
        .bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(10,26,47,0.75), #0a1a2f);
        }

        .content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding-bottom: ${showBar ? '160px' : '40px'};
        }

        /* ===== INICIO ===== */
        .inicio {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 24px;
          max-width: 480px;
          margin: 0 auto;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(251, 191, 36, 0.5);
          border-radius: 999px;
          padding: 8px 20px;
          color: #fcd34d;
          letter-spacing: 0.25em;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 32px;
        }
        .titulo {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 8vw, 3.75rem);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.02em;
        }
        .titulo span {
          color: #fcd34d;
        }
        .subtitulo {
          margin-top: 24px;
          color: #e5e7eb;
          font-size: 1.125rem;
          line-height: 1.6;
          max-width: 360px;
        }
        .botones-inicio {
          margin-top: 48px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .btn-primary {
          width: 100%;
          background: #fbbf24;
          color: #000;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 18px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 10px 25px rgba(251, 191, 36, 0.2);
        }
        .btn-primary:hover {
          background: #fcd34d;
        }
        .btn-secondary {
          width: 100%;
          background: transparent;
          color: #fcd34d;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 18px;
          border-radius: 16px;
          border: 1px solid rgba(251, 191, 36, 0.6);
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          background: rgba(251, 191, 36, 0.1);
        }

        /* ===== CARDS ===== */
        .container {
          flex: 1;
          padding: 32px 20px 0;
          max-width: 440px;
          margin: 0 auto;
          width: 100%;
        }
        .back {
          color: rgba(252, 211, 77, 0.8);
          font-size: 14px;
          margin-bottom: 24px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }
        .card h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .label {
          font-size: 11px;
          letter-spacing: 0.15em;
          color: rgba(252, 211, 77, 0.9);
          font-weight: 500;
          display: block;
          margin-bottom: 6px;
        }
        .input, .select {
          width: 100%;
          padding: 14px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          outline: none;
          margin-bottom: 16px;
        }
        .input:focus, .select:focus {
          border-color: rgba(251, 191, 36, 0.5);
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        .grid-5 {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          margin-top: 8px;
          margin-bottom: 16px;
        }
        .option-btn {
          padding: 14px;
          border-radius: 14px;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        .option-btn.active {
          background: #fbbf24;
          color: #000;
          border-color: #fbbf24;
          box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
        }
        .option-btn:hover:not(.active) {
          background: rgba(255,255,255,0.1);
        }
        .mesa-btn {
          height: 48px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        .mesa-btn.active {
          background: #fbbf24;
          color: #000;
          border-color: #fbbf24;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
        }
        .persona-btn {
          padding: 10px 0;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        .persona-btn.active {
          background: #fbbf24;
          color: #000;
          border-color: #fbbf24;
        }

        /* ===== MENÚ ===== */
        .menu-hint {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          margin-top: -16px;
          margin-bottom: 24px;
        }
        .categoria {
          margin-bottom: 28px;
        }
        .categoria h3 {
          color: #fcd34d;
          font-size: 12px;
          letter-spacing: 0.12em;
          font-weight: 500;
          border-bottom: 1px solid rgba(251, 191, 36, 0.2);
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .plato {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-radius: 12px;
          text-align: left;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.25);
          color: white;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .plato.selected {
          background: #fbbf24;
          color: #000;
          font-weight: 600;
          border-color: #fbbf24;
          box-shadow: 0 4px 12px rgba(251, 191, 36, 0.25);
        }
        .plato:hover:not(.selected) {
          background: rgba(255,255,255,0.08);
        }
        .plato span:last-child {
          font-weight: 700;
          white-space: nowrap;
          margin-left: 12px;
        }

        /* ===== BARRA INFERIOR ===== */
        .bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 30;
          background: rgba(10, 26, 47, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 16px 20px 24px;
        }
        .bottom-inner {
          max-width: 440px;
          margin: 0 auto;
        }
        .bottom-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .bottom-info p:first-child {
          font-size: 11px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.5);
        }
        .bottom-info p:last-child {
          font-size: 1.5rem;
          font-weight: 700;
        }
        .mesa-badge {
          display: inline-block;
          background: rgba(251, 191, 36, 0.2);
          color: #fcd34d;
          border: 1px solid rgba(251, 191, 36, 0.4);
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>

      <div className="page">
        {/* Fondo */}
        <div className="bg">
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070" 
            alt="Galeón Restaurante"
          />
          <div className="bg-overlay"></div>
        </div>

        <div className="content">
          {/* ========== INICIO ========== */}
          {vista === 'inicio' && (
            <div className="inicio">
              <div className="badge">⚓ VILLAVICIOSA · ASTURIAS</div>
              <h1 className="titulo">
                GALEÓN<br />
                <span>RESTAURANTE</span>
              </h1>
              <p className="subtitulo">
                Cocina marinera y sabor del Caribe.<br />
                Reserva tu mesa o haz tu pedido en un instante.
              </p>
              <div className="botones-inicio">
                <button className="btn-primary" onClick={() => setVista('reserva')}>
                  🍽️ Reservar Mesa
                </button>
                <button className="btn-secondary" onClick={() => setVista('menu')}>
                  Ver Menú y Pedir
                </button>
              </div>
            </div>
          )}

          {/* ========== RESERVA ========== */}
          {vista === 'reserva' && (
            <div className="container">
              <button className="back" onClick={() => setVista('inicio')}>← Volver</button>
              
              <div className="card">
                <h2>¿Cómo lo quieres?</h2>
                
                <div className="grid-2">
                  <button 
                    className={`option-btn ${tipo === 'comer' ? 'active' : ''}`}
                    onClick={() => setTipo('comer')}
                  >
                    🍽️ Comer aquí
                  </button>
                  <button 
                    className={`option-btn ${tipo === 'recoger' ? 'active' : ''}`}
                    onClick={() => setTipo('recoger')}
                  >
                    🥡 Para recoger
                  </button>
                </div>

                <label className="label">NOMBRE</label>
                <input 
                  className="input"
                  value={nombre} 
                  onChange={e => setNombre(e.target.value)} 
                  placeholder="Tu nombre" 
                />

                <div className="grid-2">
                  <div>
                    <label className="label">FECHA</label>
                    <input 
                      className="input"
                      type="date" 
                      value={fecha} 
                      onChange={e => setFecha(e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="label">HORA</label>
                    <select 
                      className="select"
                      value={hora} 
                      onChange={e => setHora(e.target.value)}
                    >
                      <option>13:00</option>
                      <option>14:00</option>
                      <option>20:30</option>
                      <option>21:00</option>
                      <option>21:30</option>
                      <option>22:00</option>
                    </select>
                  </div>
                </div>

                <label className="label">PERSONAS</label>
                <div className="grid-5">
                  {['1','2','3','4','5','6','7','8','9','10+'].map(n => (
                    <button 
                      key={n}
                      className={`persona-btn ${personas === n ? 'active' : ''}`}
                      onClick={() => setPersonas(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                {tipo === 'comer' && (
                  <>
                    <label className="label" style={{marginTop: 8}}>ELIGE TU MESA (1-15)</label>
                    <div className="grid-5">
                      {Array.from({length: 15}, (_, i) => i + 1).map(n => (
                        <button 
                          key={n}
                          className={`mesa-btn ${mesa === n ? 'active' : ''}`}
                          onClick={() => setMesa(n)}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <button 
                  className="btn-primary" 
                  style={{marginTop: 24}}
                  onClick={() => setVista('menu')}
                >
                  Continuar al Menú →
                </button>
              </div>
            </div>
          )}

          {/* ========== MENÚ ========== */}
          {vista === 'menu' && (
            <div className="container">
              <button className="back" onClick={() => setVista('reserva')}>← Volver a Reserva</button>
              
              <div className="card">
                <h2>Nuestra Carta</h2>
                <p className="menu-hint">Toca un plato para añadirlo</p>
                
                {MENU.map(sec => (
                  <div key={sec.cat} className="categoria">
                    <h3>{sec.cat.toUpperCase()}</h3>
                    {sec.items.map(it => {
                      const sel = pedido.find(x => x.n === it.n)
                      return (
                        <button 
                          key={it.n}
                          className={`plato ${sel ? 'selected' : ''}`}
                          onClick={() => toggle(it)}
                        >
                          <span>{sel ? '✓ ' : ''}{it.n}</span>
                          <span>{it.p}€</span>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Barra inferior */}
        {showBar && (
          <div className="bottom-bar">
            <div className="bottom-inner">
              <div className="bottom-info">
                <div>
                  <p>{pedido.length} PLATOS</p>
                  <p>€{total.toFixed(2)}</p>
                </div>
                {mesa && (
                  <span className="mesa-badge">Mesa #{mesa}</span>
                )}
              </div>
              <button className="btn-primary" onClick={reservar}>
                Enviar por WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
