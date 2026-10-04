'use client'
import { useState, useEffect } from 'react'

const MENU = [
  {
    cat: 'Ensaladas',
    items: [
      { n: 'Ensalada sencilla (LTC)', p: 7, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
      { n: 'Ensalada mixta', p: 13, img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80' },
      { n: 'Ensalada Galeón (pixín, gulas, gambas y champiñones)', p: 20, img: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&q=80' },
      { n: 'Ensalada de cecina con queso de cabra y cebolla caramelizada', p: 18, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
    ]
  },
  {
    cat: 'Para Picar',
    items: [
      { n: 'Calamares frescos', p: 21, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80' },
      { n: 'Chipirones fritos', p: 17, img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
      { n: 'Gambas al ajillo', p: 18, img: 'https://images.unsplash.com/photo-1625944230940-f2e08e2d5a0e?w=400&q=80' },
      { n: 'Zamburiñas', p: 20, img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&q=80' },
      { n: 'Pulpo a la plancha', p: 23, img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
      { n: 'Croquetas caseras', p: 13, img: 'https://images.unsplash.com/photo-1608039829570-db8c3c0e0f0b?w=400&q=80' },
      { n: 'Tabla de quesos Asturianos', p: 16, img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80' },
    ]
  },
  {
    cat: 'De Cuchara & Arroces',
    items: [
      { n: 'Fabada asturiana', p: 14, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
      { n: 'Sopa de marisco', p: 10, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
      { n: 'Arroz negro con ali-oli', p: 22, img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80' },
      { n: 'Paella de marisco', p: 24, img: 'https://images.unsplash.com/photo-1534080569008-8d1e2e0f0e0e?w=400&q=80' },
    ]
  },
  {
    cat: 'Carnes',
    items: [
      { n: 'Cachopo de jamón y queso', p: 22, img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
      { n: 'Escalopines al cabrales', p: 16, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
      { n: 'Filete con patatas', p: 15, img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
      { n: 'Tacos de solomillo de cerdo al ajillo', p: 18, img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80' },
      { n: 'Picapollo (Dominicano)', p: 18, img: 'https://images.unsplash.com/photo-1598103442097-8b570abe5878?w=400&q=80' },
      { n: 'Entrecot con patatas', p: 21, img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80' },
      { n: 'Solomillo de ternera', p: 22, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
    ]
  },
  {
    cat: 'Postres',
    items: [
      { n: 'Tarta de queso', p: 6, img: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&q=80' },
      { n: 'Tarta de la abuela', p: 6, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' },
      { n: 'Arroz con leche', p: 6, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
      { n: 'Flan de huevo', p: 4, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
      { n: 'Queso cabrales', p: 8, img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80' },
    ]
  },
  {
    cat: 'Bodega - TINTOS',
    items: [
      { n: 'Cosechero', p: 8, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
      { n: 'Ramón Bilbao Rioja', p: 18, img: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&q=80' },
      { n: 'Lan crianza', p: 16, img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' },
      { n: 'Señorío de Nava Ribera del Duero', p: 16, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
    ]
  },
  {
    cat: 'Bodega - ROSADOS',
    items: [
      { n: 'Peñascal Aguja', p: 12, img: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=400&q=80' },
      { n: 'Faustino Rivero Navarra', p: 11, img: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80' },
      { n: 'Valjunco Prieto Picudo', p: 13, img: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=400&q=80' },
    ]
  },
  {
    cat: 'Bodega - BLANCOS',
    items: [
      { n: 'Camino Do Rey Albariño', p: 16, img: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&q=80' },
      { n: 'Aido da Fonte Albariño', p: 16, img: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80' },
      { n: 'Valdeorras Godello', p: 14, img: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&q=80' },
      { n: 'Caldirola Moscato', p: 15, img: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=400&q=80' },
      { n: 'Navesur Rueda', p: 14, img: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80' },
    ]
  }
]

const WHATSAPP = '18295435381'

export default function Page() {
  const [vista, setVista] = useState('inicio')
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('20:30')
  const [personas, setPersonas] = useState('2')
  const [mesa, setMesa] = useState(null)
  const [tipo, setTipo] = useState('comer')
  const [pedido, setPedido] = useState([])
  const [enviando, setEnviando] = useState(false)
  const [mesasOcupadas, setMesasOcupadas] = useState([])

  useEffect(() => {
    if (!fecha || tipo !== 'comer') {
      setMesasOcupadas([])
      return
    }
    const cargar = async () => {
      try {
        const r = await fetch('/api/pedidos', { cache: 'no-store' })
        const data = await r.json()
        const arr = Array.isArray(data) ? data : []
        const ocupadas = arr
          .filter(p =>
            p.tipo === 'comer' &&
            p.mesa &&
            p.fecha === fecha &&
            p.estado !== 'finalizada'
          )
          .map(p => Number(p.mesa))
        setMesasOcupadas(ocupadas)
      } catch {
        setMesasOcupadas([])
      }
    }
    cargar()
  }, [fecha, tipo])

  const toggle = (item) => {
    setPedido(prev => prev.find(x => x.n === item.n)
      ? prev.filter(x => x.n !== item.n)
      : [...prev, item]
    )
  }

  const total = pedido.reduce((s, i) => s + i.p, 0)
  const showBar = vista === 'reserva' || vista === 'menu'

  const guardarEnAdmin = async () => {
    try {
      await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre, fecha, hora, personas,
          mesa: tipo === 'comer' ? mesa : null,
          tipo, items: pedido, total, estado: 'activa'
        })
      })
    } catch (e) {}
  }

  const validar = () => {
    if (!nombre || !fecha) { alert('Completa nombre y fecha'); return false }
    if (tipo === 'comer' && !mesa) { alert('Elige tu mesa'); return false }
    if (tipo === 'comer' && mesasOcupadas.includes(Number(mesa))) {
      alert('Esa mesa ya está reservada para esa fecha. Elige otra.')
      return false
    }
    return true
  }

  const hacerReserva = async () => {
    if (!validar()) return
    setEnviando(true)
    await guardarEnAdmin()
    setEnviando(false)
    setVista('exito')
  }

  const enviarWhatsApp = async () => {
    if (!validar()) return
    setEnviando(true)
    await guardarEnAdmin()
    setEnviando(false)
    let platos = ''
    if (pedido.length > 0) {
      platos = '\n\nPlatos:\n' + pedido.map(x => '- ' + x.n + ' (' + x.p + '€)').join('\n') + '\nTotal: ' + total + '€'
    }
    const servicio = tipo === 'comer'
      ? 'COMER AQUÍ - Mesa ' + mesa + ' para ' + personas + ' personas'
      : 'PARA RECOGER (Take Away) para ' + personas + ' personas'
    const msg = 'Hola Galeón! Soy ' + nombre + '\n' + servicio + '\nDía: ' + fecha + ' a las ' + hora + platos
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank')
    setVista('exito')
  }

  const reiniciar = () => {
    setVista('inicio')
    setNombre('')
    setFecha('')
    setHora('20:30')
    setPersonas('2')
    setMesa(null)
    setPedido([])
    setTipo('comer')
    setMesasOcupadas([])
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; }
        .page { min-height: 100vh; background: #0a1a2f; color: white; position: relative; overflow-x: hidden; }
        .bg { position: fixed; inset: 0; z-index: 0; }
        .bg img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.05); }
        .bg-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(10,26,47,0.75), #0a1a2f); }
        .content { position: relative; z-index: 10; display: flex; flex-direction: column; min-height: 100vh; padding-bottom: 40px; }
        .content.con-barra { padding-bottom: 200px; }
        .inicio { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 24px; max-width: 480px; margin: 0 auto; }
        .badge { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(251, 191, 36, 0.5); border-radius: 999px; padding: 8px 20px; color: #fcd34d; letter-spacing: 0.25em; font-size: 12px; font-weight: 500; margin-bottom: 32px; }
        .titulo { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 8vw, 3.75rem); font-weight: 700; line-height: 0.95; }
        .titulo span { color: #fcd34d; }
        .subtitulo { margin-top: 24px; color: #e5e7eb; font-size: 1.125rem; line-height: 1.6; max-width: 360px; }
        .botones-inicio { margin-top: 48px; width: 100%; display: flex; flex-direction: column; gap: 16px; }
        .btn-primary { width: 100%; background: #fbbf24; color: #000; font-weight: 600; font-size: 1.125rem; padding: 18px; border-radius: 16px; border: none; cursor: pointer; }
        .btn-secondary { width: 100%; background: transparent; color: #fcd34d; font-weight: 600; font-size: 1.125rem; padding: 18px; border-radius: 16px; border: 1px solid rgba(251, 191, 36, 0.6); cursor: pointer; }
        .btn-reserva { width: 100%; background: #10b981; color: white; font-weight: 600; font-size: 1.05rem; padding: 16px; border-radius: 14px; border: none; cursor: pointer; }
        .btn-whatsapp { width: 100%; background: #25D366; color: white; font-weight: 600; font-size: 1.05rem; padding: 16px; border-radius: 14px; border: none; cursor: pointer; }
        .btn-reserva:disabled, .btn-whatsapp:disabled { opacity: 0.6; cursor: not-allowed; }
        .container { flex: 1; padding: 32px 20px 0; max-width: 440px; margin: 0 auto; width: 100%; }
        .back { color: rgba(252, 211, 77, 0.8); font-size: 14px; margin-bottom: 24px; background: none; border: none; cursor: pointer; }
        .card { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 24px; padding: 24px; }
        .card h2 { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 600; margin-bottom: 24px; }
        .label { font-size: 11px; letter-spacing: 0.15em; color: rgba(252, 211, 77, 0.9); font-weight: 500; display: block; margin-bottom: 6px; }
        .input, .select { width: 100%; padding: 14px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; color: white; font-size: 16px; outline: none; margin-bottom: 16px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        .grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 8px; margin-bottom: 16px; }
        .option-btn { padding: 14px; border-radius: 14px; font-weight: 600; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; cursor: pointer; }
        .option-btn.active { background: #fbbf24; color: #000; border-color: #fbbf24; }
        .mesa-btn { height: 52px; border-radius: 12px; font-weight: 700; font-size: 13px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; }
        .mesa-btn.active { background: #fbbf24; color: #000; border-color: #fbbf24; }
        .mesa-btn.ocupada { background: rgba(248,113,113,0.2); border-color: rgba(248,113,113,0.5); color: #fca5a5; cursor: not-allowed; opacity: 0.85; }
        .mesa-btn .estado { font-size: 9px; font-weight: 500; }
        .persona-btn { padding: 10px 0; border-radius: 12px; font-weight: 600; font-size: 14px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; cursor: pointer; }
        .persona-btn.active { background: #fbbf24; color: #000; border-color: #fbbf24; }
        .menu-hint { font-size: 14px; color: rgba(255,255,255,0.6); margin-top: -16px; margin-bottom: 24px; }
        .categoria { margin-bottom: 28px; }
        .categoria h3 { color: #fcd34d; font-size: 12px; letter-spacing: 0.12em; font-weight: 500; border-bottom: 1px solid rgba(251, 191, 36, 0.2); padding-bottom: 8px; margin-bottom: 12px; }
        .plato { width: 100%; display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 14px; text-align: left; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.25); color: white; cursor: pointer; margin-bottom: 10px; font-size: 14px; }
        .plato.selected { background: rgba(251, 191, 36, 0.25); border-color: #fbbf24; }
        .plato-img { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; flex-shrink: 0; background: rgba(0,0,0,0.3); }
        .plato-info { flex: 1; min-width: 0; }
        .plato-nombre { font-size: 13px; line-height: 1.35; margin-bottom: 4px; }
        .plato-precio { font-weight: 700; color: #fcd34d; font-size: 14px; }
        .plato-check { font-size: 18px; color: #fbbf24; flex-shrink: 0; }
        .bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 30; background: rgba(10, 26, 47, 0.95); border-top: 1px solid rgba(255,255,255,0.1); padding: 16px 20px 24px; }
        .bottom-inner { max-width: 440px; margin: 0 auto; }
        .bottom-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .bottom-info p:first-child { font-size: 11px; letter-spacing: 0.12em; color: rgba(255,255,255,0.5); }
        .bottom-info p:last-child { font-size: 1.5rem; font-weight: 700; }
        .mesa-badge { display: inline-block; background: rgba(251, 191, 36, 0.2); color: #fcd34d; border: 1px solid rgba(251, 191, 36, 0.4); padding: 6px 16px; border-radius: 999px; font-size: 14px; font-weight: 500; }
        .botones-final { display: flex; flex-direction: column; gap: 10px; }
        .exito { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 24px; max-width: 420px; margin: 0 auto; }
        .exito-icon { font-size: 4rem; margin-bottom: 20px; }
        .exito h2 { font-family: 'Playfair Display', serif; font-size: 1.75rem; font-weight: 600; margin-bottom: 12px; color: #fcd34d; }
        .exito p { color: rgba(255,255,255,0.8); font-size: 1.1rem; line-height: 1.6; margin-bottom: 32px; }
        .leyenda { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 8px; display: flex; gap: 16px; justify-content: center; }
      `}</style>

      <div className="page">
        <div className="bg">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070" alt="Galeón Restaurante" />
          <div className="bg-overlay"></div>
        </div>

        <div className={showBar ? 'content con-barra' : 'content'}>
          {vista === 'inicio' && (
            <div className="inicio">
              <div className="badge">⚓ VILLAVICIOSA · ASTURIAS</div>
              <h1 className="titulo">GALEÓN<br /><span>RESTAURANTE</span></h1>
              <p className="subtitulo">Cocina marinera y sabor del Caribe.<br />Reserva tu mesa o haz tu pedido en un instante.</p>
              <div className="botones-inicio">
                <button className="btn-primary" onClick={() => setVista('reserva')}>🍽️ Reservar Mesa</button>
                <button className="btn-secondary" onClick={() => setVista('menu')}>Ver Menú y Pedir</button>
              </div>
            </div>
          )}

          {vista === 'reserva' && (
            <div className="container">
              <button className="back" onClick={() => setVista('inicio')}>← Volver</button>
              <div className="card">
                <h2>¿Cómo lo quieres?</h2>
                <div className="grid-2">
                  <button className={tipo === 'comer' ? 'option-btn active' : 'option-btn'} onClick={() => setTipo('comer')}>🍽️ Comer aquí</button>
                  <button className={tipo === 'recoger' ? 'option-btn active' : 'option-btn'} onClick={() => setTipo('recoger')}>🥡 Para recoger</button>
                </div>
                <label className="label">NOMBRE</label>
                <input className="input" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" />
                <div className="grid-2">
                  <div>
                    <label className="label">FECHA</label>
                    <input className="input" type="date" value={fecha} onChange={e => { setFecha(e.target.value); setMesa(null) }} />
                  </div>
                  <div>
                    <label className="label">HORA</label>
                    <select className="select" value={hora} onChange={e => setHora(e.target.value)}>
                      <option>13:00</option><option>14:00</option><option>20:30</option><option>21:00</option><option>21:30</option><option>22:00</option>
                    </select>
                  </div>
                </div>
                <label className="label">PERSONAS</label>
                <div className="grid-5">
                  {['1','2','3','4','5','6','7','8','9','10+'].map(n => (
                    <button key={n} className={personas === n ? 'persona-btn active' : 'persona-btn'} onClick={() => setPersonas(n)}>{n}</button>
                  ))}
                </div>
                {tipo === 'comer' && (
                  <>
                    <label className="label" style={{marginTop: 8}}>ELIGE TU MESA (1-15)</label>
                    {!fecha && <p style={{fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8}}>Primero elige una fecha</p>}
                    <div className="grid-5">
                      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n => {
                        const ocupada = mesasOcupadas.includes(n)
                        return (
                          <button key={n} className={ocupada ? 'mesa-btn ocupada' : (mesa === n ? 'mesa-btn active' : 'mesa-btn')} onClick={() => { if (!ocupada) setMesa(n) }} disabled={ocupada}>
                            {n}
                            {ocupada && <span className="estado">Reservada</span>}
                          </button>
                        )
                      })}
                    </div>
                    <div className="leyenda">
                      <span>● Disponible</span>
                      <span style={{color: '#fca5a5'}}>● Reservada</span>
                    </div>
                  </>
                )}
                <button className="btn-primary" style={{marginTop: 24}} onClick={() => setVista('menu')}>Continuar al Menú →</button>
              </div>
            </div>
          )}

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
                        <button key={it.n} className={sel ? 'plato selected' : 'plato'} onClick={() => toggle(it)}>
                          <img className="plato-img" src={it.img} alt={it.n} loading="lazy" />
                          <div className="plato-info">
                            <div className="plato-nombre">{it.n}</div>
                            <div className="plato-precio">{it.p}€</div>
                          </div>
                          {sel && <span className="plato-check">✓</span>}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {vista === 'exito' && (
            <div className="exito">
              <div className="exito-icon">✅</div>
              <h2>Reserva exitosa</h2>
              <p>Gracias por preferirnos.<br />Tu reserva ha sido registrada correctamente.</p>
              <button className="btn-primary" onClick={reiniciar}>Volver al inicio</button>
            </div>
          )}
        </div>

        {showBar && (
          <div className="bottom-bar">
            <div className="bottom-inner">
              <div className="bottom-info">
                <div>
                  <p>{pedido.length} PLATOS</p>
                  <p>€{total.toFixed(2)}</p>
                </div>
                {mesa && <span className="mesa-badge">Mesa #{mesa}</span>}
              </div>
              <div className="botones-final">
                <button className="btn-reserva" onClick={hacerReserva} disabled={enviando}>
                  {enviando ? 'Guardando...' : '✓ Confirmar Reserva'}
                </button>
                <button className="btn-whatsapp" onClick={enviarWhatsApp} disabled={enviando}>
                  {enviando ? 'Enviando...' : '💬 Enviar por WhatsApp'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
