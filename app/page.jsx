'use client'
import { useState, useEffect } from 'react'

const MENU = [
  { cat: 'Ensaladas', items: [
    { n: 'Ensalada sencilla (LTC)', p: 7, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
    { n: 'Ensalada mixta', p: 13, img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80' },
    { n: 'Ensalada Galeón (pixín, gulas, gambas y champiñones)', p: 20, img: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&q=80' },
    { n: 'Ensalada de cecina con queso de cabra y cebolla caramelizada', p: 18, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
  ]},
  { cat: 'Para Picar', items: [
    { n: 'Calamares frescos', p: 21, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80' },
    { n: 'Chipirones fritos', p: 17, img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
    { n: 'Gambas al ajillo', p: 18, img: 'https://images.unsplash.com/photo-1625944230940-f2e08e2d5a0e?w=400&q=80' },
    { n: 'Zamburiñas', p: 20, img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&q=80' },
    { n: 'Pulpo a la plancha', p: 23, img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
    { n: 'Croquetas caseras', p: 13, img: 'https://images.unsplash.com/photo-1608039829570-db8c3c0e0f0b?w=400&q=80' },
    { n: 'Tabla de quesos Asturianos', p: 16, img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80' },
  ]},
  { cat: 'De Cuchara & Arroces', items: [
    { n: 'Fabada asturiana', p: 14, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
    { n: 'Sopa de marisco', p: 10, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
    { n: 'Arroz negro con ali-oli', p: 22, img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80' },
    { n: 'Paella de marisco', p: 24, img: 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=400&q=80' },
  ]},
  { cat: 'Carnes', items: [
    { n: 'Cachopo de jamón y queso', p: 22, img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
    { n: 'Escalopines al cabrales', p: 16, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
    { n: 'Filete con patatas', p: 15, img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80' },
    { n: 'Tacos de solomillo de cerdo al ajillo', p: 18, img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80' },
    { n: 'Picapollo (Dominicano)', p: 18, img: 'https://images.unsplash.com/photo-1598103442097-8b570abe5878?w=400&q=80' },
    { n: 'Entrecot con patatas', p: 21, img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80' },
    { n: 'Solomillo de ternera', p: 22, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
  ]},
  { cat: 'Postres', items: [
    { n: 'Tarta de queso', p: 6, img: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&q=80' },
    { n: 'Tarta de la abuela', p: 6, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' },
    { n: 'Arroz con leche', p: 6, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
    { n: 'Flan de huevo', p: 4, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
    { n: 'Queso cabrales', p: 8, img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80' },
  ]},
  { cat: 'Bodega - TINTOS', items: [
    { n: 'Cosechero', p: 8, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
    { n: 'Ramón Bilbao Rioja', p: 18, img: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&q=80' },
    { n: 'Lan crianza', p: 16, img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80' },
    { n: 'Señorío de Nava Ribera del Duero', p: 16, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
  ]},
  { cat: 'Bodega - ROSADOS', items: [
    { n: 'Peñascal Aguja', p: 12, img: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=400&q=80' },
    { n: 'Faustino Rivero Navarra', p: 11, img: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80' },
    { n: 'Valjunco Prieto Picudo', p: 13, img: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=400&q=80' },
  ]},
  { cat: 'Bodega - BLANCOS', items: [
    { n: 'Camino Do Rey Albariño', p: 16, img: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&q=80' },
    { n: 'Aido da Fonte Albariño', p: 16, img: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80' },
    { n: 'Valdeorras Godello', p: 14, img: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&q=80' },
    { n: 'Caldirola Moscato', p: 15, img: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=400&q=80' },
    { n: 'Navesur Rueda', p: 14, img: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80' },
  ]},
]

const WHATSAPP = '18295435381'
const OPINIONES = [
  { n: 'María L.', t: '★★★★★', txt: 'El pulpo a la plancha y el ambiente hacen que vuelvas. ¡Espectacular!' },
  { n: 'Carlos R.', t: '★★★★★', txt: 'Cocina marinera de verdad, con toques del Caribe. El cachopo, brutal.' },
  { n: 'Ana P.', t: '★★★★☆', txt: 'Muy buen servicio y la fabada como en casa. Ideal para reservar online.' },
  { n: 'Luis M.', t: '★★★★★', txt: 'Vinos bien elegidos y postres caseros. Galeón no defrauda.' },
]

export default function Page() {
  const [lang, setLang] = useState('es')
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
  const [soloCarta, setSoloCarta] = useState(false)
  const [fotoGrande, setFotoGrande] = useState(null)

  const t = (es, en) => (lang === 'es' ? es : en)

  useEffect(() => {
    if (!fecha || tipo !== 'comer') { setMesasOcupadas([]); return }
    const cargar = async () => {
      try {
        const r = await fetch('/api/pedidos', { cache: 'no-store' })
        const data = await r.json()
        const arr = Array.isArray(data) ? data : (data.pedidos || [])
        const ocupadas = arr
          .filter(p => p.tipo === 'comer' && p.mesa && p.fecha === fecha && p.estado !== 'finalizada')
          .map(p => Number(p.mesa))
        setMesasOcupadas(ocupadas)
      } catch { setMesasOcupadas([]) }
    }
    cargar()
  }, [fecha, tipo])

  const addItem = (item) => {
    setPedido(prev => {
      const found = prev.find(x => x.n === item.n)
      if (found) return prev.map(x => x.n === item.n ? { ...x, qty: x.qty + 1 } : x)
      return [...prev, { ...item, qty: 1 }]
    })
  }
  const subItem = (item) => {
    setPedido(prev => {
      const found = prev.find(x => x.n === item.n)
      if (!found) return prev
      if (found.qty <= 1) return prev.filter(x => x.n !== item.n)
      return prev.map(x => x.n === item.n ? { ...x, qty: x.qty - 1 } : x)
    })
  }
  const getQty = (n) => (pedido.find(x => x.n === n)?.qty || 0)
  const total = pedido.reduce((s, i) => s + i.p * i.qty, 0)
  const showBar = vista === 'reserva' || vista === 'menu' || vista === 'resumen'

  const guardarEnAdmin = async () => {
    try {
      await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre, fecha, hora, personas,
          mesa: tipo === 'comer' ? mesa : null,
          tipo,
          items: pedido.map(x => ({ n: x.n, p: x.p, qty: x.qty })),
          total,
          estado: 'activa'
        })
      })
    } catch (e) {}
  }

  const validar = () => {
    if (soloCarta) return true
    if (!nombre || !fecha) { alert(t('Completa nombre y fecha', 'Fill name and date')); return false }
    if (tipo === 'comer' && !mesa) { alert(t('Elige tu mesa', 'Choose your table')); return false }
    if (tipo === 'comer' && mesasOcupadas.includes(Number(mesa))) {
      alert(t('Esa mesa ya está reservada', 'That table is already booked')); return false
    }
    return true
  }

  const irResumen = () => {
    if (!validar()) return
    setVista('resumen')
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
      platos = '\n\nPlatos:\n' + pedido.map(x => '- ' + x.n + ' x' + x.qty + ' (' + (x.p * x.qty) + '€)').join('\n') + '\nTotal: ' + total + '€'
    }
    const servicio = soloCarta
      ? (t('PEDIDO CARTA', 'MENU ORDER') + ' · ' + personas + ' pers')
      : (tipo === 'comer'
        ? 'COMER AQUÍ - Mesa ' + mesa + ' · ' + personas + ' pers'
        : 'PARA RECOGER · ' + personas + ' pers')
    const msg = 'Hola Galeón! Soy ' + (nombre || 'Cliente') + '\n' + servicio + '\nDía: ' + (fecha || '-') + ' a las ' + hora + platos
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank')
    setVista('exito')
  }

  const reiniciar = () => {
    setVista('inicio'); setNombre(''); setFecha(''); setHora('20:30'); setPersonas('2')
    setMesa(null); setPedido([]); setTipo('comer'); setMesasOcupadas([]); setSoloCarta(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}body{font-family:Inter,system-ui,sans-serif}
        .page{min-height:100vh;background:#0a1a2f;color:#fff;position:relative;overflow-x:hidden}
        .bg{position:fixed;inset:0;z-index:0}.bg img{width:100%;height:100%;object-fit:cover;transform:scale(1.05)}
        .bg-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.7),rgba(10,26,47,.75),#0a1a2f)}
        .content{position:relative;z-index:10;display:flex;flex-direction:column;min-height:100vh;padding-bottom:40px}
        .content.con-barra{padding-bottom:210px}
        .lang{position:fixed;top:14px;right:14px;z-index:40;display:flex;gap:6px}
        .lang button{padding:6px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.4);color:#fff;font-size:12px;cursor:pointer}
        .lang button.on{background:#fbbf24;color:#000;border-color:#fbbf24}
        .inicio{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 24px 40px;max-width:560px;margin:0 auto;width:100%}
        .badge{display:inline-flex;gap:8px;border:1px solid rgba(251,191,36,.5);border-radius:999px;padding:8px 20px;color:#fcd34d;letter-spacing:.2em;font-size:11px;margin-bottom:24px}
        .titulo{font-family:'Playfair Display',serif;font-size:clamp(2.6rem,8vw,3.5rem);font-weight:700;line-height:.95}
        .titulo span{color:#fcd34d}
        .subtitulo{margin-top:20px;color:#e5e7eb;font-size:1.05rem;line-height:1.6}
        .nota{margin-top:14px;font-size:13px;color:#86efac;background:rgba(16,185,129,.12);border:1px solid rgba(16,185,129,.3);padding:10px 14px;border-radius:12px}
        .botones-inicio{margin-top:28px;width:100%;display:flex;flex-direction:column;gap:12px}
        .btn-primary{width:100%;background:#fbbf24;color:#000;font-weight:600;font-size:1.05rem;padding:16px;border-radius:14px;border:none;cursor:pointer}
        .btn-secondary{width:100%;background:transparent;color:#fcd34d;font-weight:600;font-size:1.05rem;padding:16px;border-radius:14px;border:1px solid rgba(251,191,36,.6);cursor:pointer}
        .btn-ghost2{width:100%;background:rgba(255,255,255,.08);color:#fff;font-weight:600;padding:14px;border-radius:14px;border:1px solid rgba(255,255,255,.15);cursor:pointer}
        .btn-reserva{width:100%;background:#10b981;color:#fff;font-weight:600;padding:15px;border-radius:14px;border:none;cursor:pointer}
        .btn-whatsapp{width:100%;background:#25D366;color:#fff;font-weight:600;padding:15px;border-radius:14px;border:none;cursor:pointer}
        .btn-reserva:disabled,.btn-whatsapp:disabled{opacity:.6}
        .section{width:100%;margin-top:36px;text-align:left}
        .section h3{font-family:'Playfair Display',serif;font-size:1.2rem;color:#fcd34d;margin-bottom:12px}
        .section p{font-size:14px;color:rgba(255,255,255,.75);line-height:1.55}
        .review{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:14px;margin-bottom:10px}
        .review .stars{color:#fbbf24;font-size:13px;margin-bottom:4px}
        .review .name{font-size:12px;color:rgba(255,255,255,.5);margin-top:6px}
        .info-box{margin-top:20px;font-size:13px;color:rgba(255,255,255,.65);line-height:1.6}
        .container{flex:1;padding:32px 20px 0;max-width:440px;margin:0 auto;width:100%}
        .back{color:rgba(252,211,77,.85);font-size:14px;margin-bottom:20px;background:none;border:none;cursor:pointer}
        .card{background:rgba(255,255,255,.1);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.15);border-radius:22px;padding:22px}
        .card h2{font-family:'Playfair Display',serif;font-size:1.4rem;margin-bottom:18px}
        .label{font-size:11px;letter-spacing:.12em;color:rgba(252,211,77,.9);display:block;margin-bottom:6px}
        .input,.select{width:100%;padding:13px;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.15);border-radius:12px;color:#fff;font-size:16px;outline:none;margin-bottom:14px}
        .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
        .grid-5{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:8px 0 14px}
        .option-btn{padding:12px;border-radius:12px;font-weight:600;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff;cursor:pointer}
        .option-btn.active{background:#fbbf24;color:#000;border-color:#fbbf24}
        .mesa-btn{height:50px;border-radius:12px;font-weight:700;font-size:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center}
        .mesa-btn.active{background:#fbbf24;color:#000}.mesa-btn.ocupada{background:rgba(248,113,113,.2);border-color:rgba(248,113,113,.5);color:#fca5a5;cursor:not-allowed}
        .persona-btn{padding:9px 0;border-radius:10px;font-weight:600;font-size:13px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff;cursor:pointer}
        .persona-btn.active{background:#fbbf24;color:#000}
        .categoria{margin-bottom:24px}.categoria h3{color:#fcd34d;font-size:11px;letter-spacing:.12em;border-bottom:1px solid rgba(251,191,36,.2);padding-bottom:8px;margin-bottom:12px}
        .plato{width:100%;display:flex;align-items:center;gap:12px;padding:10px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.25);margin-bottom:10px}
        .plato-img{width:64px;height:64px;border-radius:12px;object-fit:cover;flex-shrink:0;cursor:pointer}.lightbox{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px}.lightbox img{max-width:100%;max-height:70vh;border-radius:16px;object-fit:contain}.lightbox .lb-name{margin-top:16px;font-size:1.1rem;text-align:center;color:#fcd34d;font-weight:600}.lightbox .lb-price{margin-top:6px;font-size:1rem;color:#fff}.lightbox .lb-close{position:absolute;top:16px;right:16px;width:42px;height:42px;border-radius:50%;border:none;background:rgba(255,255,255,.15);color:#fff;font-size:22px;cursor:pointer}
        .plato-info{flex:1;min-width:0}.plato-nombre{font-size:13px;line-height:1.3;margin-bottom:4px}.plato-precio{font-weight:700;color:#fcd34d;font-size:14px}
        .qty{display:flex;align-items:center;gap:8px;flex-shrink:0}
        .qty button{width:30px;height:30px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);color:#fff;font-size:16px;cursor:pointer}
        .qty span{min-width:18px;text-align:center;font-weight:600}
        .resumen-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.08);font-size:14px}
        .resumen-row strong{color:#fcd34d}
        .bottom-bar{position:fixed;bottom:0;left:0;right:0;z-index:30;background:rgba(10,26,47,.96);border-top:1px solid rgba(255,255,255,.1);padding:14px 20px 22px}
        .bottom-inner{max-width:440px;margin:0 auto}.bottom-info{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
        .bottom-info p:first-child{font-size:11px;letter-spacing:.1em;color:rgba(255,255,255,.5)}.bottom-info p:last-child{font-size:1.4rem;font-weight:700}
        .mesa-badge{background:rgba(251,191,36,.2);color:#fcd34d;border:1px solid rgba(251,191,36,.4);padding:5px 12px;border-radius:999px;font-size:13px}
        .botones-final{display:flex;flex-direction:column;gap:8px}
        .exito{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 24px;max-width:420px;margin:0 auto}
        .exito-icon{font-size:3.5rem;margin-bottom:16px}.exito h2{font-family:'Playfair Display',serif;font-size:1.7rem;color:#fcd34d;margin-bottom:10px}
        .exito p{color:rgba(255,255,255,.8);font-size:1.05rem;line-height:1.6;margin-bottom:28px}
        .leyenda{font-size:11px;color:rgba(255,255,255,.5);margin-top:8px;display:flex;gap:14px;justify-content:center}

        .panel{width:100%;max-width:560px;margin-left:auto;margin-right:auto}
        .bottom-inner{width:100%;max-width:560px;margin:0 auto}
        @media (min-width: 768px) {
          .inicio{max-width:680px;padding:80px 32px 48px}
          .titulo{font-size:3.2rem}
          .panel{max-width:920px;padding:28px 28px 48px}
          .categoria{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px}
          .categoria h3{grid-column:1/-1;margin:12px 0 4px}
          .plato{margin-bottom:0}
          .plato-img{width:80px;height:80px}
          .bottom-bar{padding:16px 28px 24px}
          .bottom-inner{max-width:920px}
          .botones-final{display:flex;gap:12px}
          .botones-final button{flex:1}
          .botones-inicio{max-width:440px;margin-left:auto;margin-right:auto}
          .section{max-width:920px;margin-left:auto;margin-right:auto}
          .reviews{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .review{margin-bottom:0}
          .grid-5{grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
          .lightbox img{max-height:75vh;max-width:min(900px,92vw)}
        }
        @media (min-width: 1100px) {
          .panel{max-width:1040px}
          .bottom-inner{max-width:1040px}
          .section{max-width:1040px}
          .titulo{font-size:3.6rem}
          .categoria{gap:14px}
        }
      `}</style>

      <div className="page">
        <div className="bg">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070" alt="Galeón" />
          <div className="bg-overlay"></div>
        </div>

        <div className="lang">
          <button className={lang==='es'?'on':''} onClick={()=>setLang('es')}>ES</button>
          <button className={lang==='en'?'on':''} onClick={()=>setLang('en')}>EN</button>
        </div>

        <div className={showBar ? 'content con-barra' : 'content'}>
          {vista === 'inicio' && (
            <div className="inicio">
              <div className="badge">⚓ VILLAVICIOSA · ASTURIAS</div>
              <h1 className="titulo">GALEÓN<br /><span>RESTAURANTE</span></h1>
              <p className="subtitulo">
                {t('Cocina marinera y sabor del Caribe. Reserva tu mesa o consulta nuestra carta.',
                   'Seafood cuisine with Caribbean flavors. Book a table or browse our menu.')}
              </p>
              <div className="nota">⏱ {t('Te respondemos en menos de 10 minutos', 'We reply in under 10 minutes')}</div>

              <div className="botones-inicio">
                <button className="btn-primary" onClick={()=>{setSoloCarta(false);setVista('reserva')}}>
                  🍽️ {t('Reservar Mesa', 'Book a Table')}
                </button>
                <button className="btn-secondary" onClick={()=>{setSoloCarta(false);setVista('menu')}}>
                  {t('Ver Menú y Pedir', 'View Menu & Order')}
                </button>
                <button className="btn-ghost2" onClick={()=>{setSoloCarta(true);setVista('menu')}}>
                  📖 {t('Solo ver la carta', 'Menu only')}
                </button>
              </div>

              <div className="section">
                <h3>{t('Nuestra cocina', 'Our kitchen')}</h3>
                <p>
                  {t(
                    'En Galeón unimos la tradición marinera de Asturias con el sabor del Caribe: pescados frescos, arroces, carnes y una bodega cuidada para disfrutar en Villaviciosa.',
                    'At Galeón we blend Asturian seafood tradition with Caribbean flavor: fresh fish, rice dishes, meats and a carefully chosen wine list in Villaviciosa.'
                  )}
                </p>
              </div>

              <div className="section">
                <h3>{t('Opiniones', 'Reviews')}</h3>
                {OPINIONES.map((o,i)=>(
                  <div key={i} className="review">
                    <div className="stars">{o.t}</div>
                    <div>{o.txt}</div>
                    <div className="name">— {o.n}</div>
                  </div>
                ))}
              </div>

              <div className="info-box">
                📍 Villaviciosa, Asturias<br/>
                💬 WhatsApp: +1 829 543 5381<br/>
                🕐 {t('Consulta disponibilidad al reservar', 'Check availability when booking')}
              </div>
            </div>
          )}

          {vista === 'reserva' && (
            <div className="container">
              <button className="back" onClick={()=>setVista('inicio')}>← {t('Volver','Back')}</button>
              <div className="card">
                <h2>{t('¿Cómo lo quieres?','How would you like it?')}</h2>
                <div className="grid-2">
                  <button className={tipo==='comer'?'option-btn active':'option-btn'} onClick={()=>setTipo('comer')}>🍽️ {t('Comer aquí','Dine in')}</button>
                  <button className={tipo==='recoger'?'option-btn active':'option-btn'} onClick={()=>setTipo('recoger')}>🥡 {t('Para recoger','Take away')}</button>
                </div>
                <label className="label">{t('NOMBRE','NAME')}</label>
                <input className="input" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder={t('Tu nombre','Your name')} />
                <div className="grid-2">
                  <div>
                    <label className="label">{t('FECHA','DATE')}</label>
                    <input className="input" type="date" value={fecha} onChange={e=>{setFecha(e.target.value);setMesa(null)}} />
                  </div>
                  <div>
                    <label className="label">{t('HORA','TIME')}</label>
                    <select className="select" value={hora} onChange={e=>setHora(e.target.value)}>
                      <option>13:00</option><option>14:00</option><option>20:30</option><option>21:00</option><option>21:30</option><option>22:00</option>
                    </select>
                  </div>
                </div>
                <label className="label">{t('PERSONAS','GUESTS')}</label>
                <div className="grid-5">
                  {['1','2','3','4','5','6','7','8','9','10+'].map(n=>(
                    <button key={n} className={personas===n?'persona-btn active':'persona-btn'} onClick={()=>setPersonas(n)}>{n}</button>
                  ))}
                </div>
                {tipo==='comer' && (
                  <>
                    <label className="label">{t('MESA (1-15)','TABLE (1-15)')}</label>
                    {!fecha && <p style={{fontSize:12,color:'rgba(255,255,255,.5)',marginBottom:8}}>{t('Elige primero la fecha','Choose a date first')}</p>}
                    <div className="grid-5">
                      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n=>{
                        const ocupada = mesasOcupadas.includes(n)
                        return (
                          <button key={n} className={ocupada?'mesa-btn ocupada':(mesa===n?'mesa-btn active':'mesa-btn')} disabled={ocupada} onClick={()=>{if(!ocupada)setMesa(n)}}>
                            {n}{ocupada && <span style={{fontSize:9}}>{t('Ocup.','Busy')}</span>}
                          </button>
                        )
                      })}
                    </div>
                    <div className="leyenda"><span>● {t('Libre','Free')}</span><span style={{color:'#fca5a5'}}>● {t('Reservada','Booked')}</span></div>
                  </>
                )}
                <button className="btn-primary" style={{marginTop:18}} onClick={()=>setVista('menu')}>{t('Continuar al menú','Continue to menu')} →</button>
              </div>
            </div>
          )}

          {vista === 'menu' && (
            <div className="container">
              <button className="back" onClick={()=>setVista(soloCarta?'inicio':'reserva')}>← {t('Volver','Back')}</button>
              <div className="card">
                <h2>{t('Nuestra Carta','Our Menu')}</h2>
                <p style={{fontSize:13,color:'rgba(255,255,255,.55)',marginTop:-12,marginBottom:16}}>{t('Usa + / − para la cantidad','Use + / − for quantity')}</p>
                {MENU.map(sec=>(
                  <div key={sec.cat} className="categoria">
                    <h3>{sec.cat.toUpperCase()}</h3>
                    {sec.items.map(it=>{
                      const qty = getQty(it.n)
                      return (
                        <div key={it.n} className="plato">
                          <img className="plato-img" src={it.img} alt={it.n} loading="lazy" onClick={() => setFotoGrande(it)} />
                          <div className="plato-info">
                            <div className="plato-nombre">{it.n}</div>
                            <div className="plato-precio">{it.p}€</div>
                          </div>
                          <div className="qty">
                            <button onClick={()=>subItem(it)}>−</button>
                            <span>{qty}</span>
                            <button onClick={()=>addItem(it)}>+</button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {vista === 'resumen' && (
            <div className="container">
              <button className="back" onClick={()=>setVista('menu')}>← {t('Volver al menú','Back to menu')}</button>
              <div className="card">
                <h2>{t('Resumen de tu reserva','Booking summary')}</h2>
                <div className="resumen-row"><span>{t('Nombre','Name')}</span><strong>{nombre || '—'}</strong></div>
                <div className="resumen-row"><span>{t('Tipo','Type')}</span><strong>{tipo==='comer'?t('Comer aquí','Dine in'):t('Para recoger','Take away')}</strong></div>
                <div className="resumen-row"><span>{t('Fecha','Date')}</span><strong>{fecha || '—'} · {hora}</strong></div>
                <div className="resumen-row"><span>{t('Personas','Guests')}</span><strong>{personas}</strong></div>
                {tipo==='comer' && <div className="resumen-row"><span>{t('Mesa','Table')}</span><strong>#{mesa}</strong></div>}
                <div style={{marginTop:14,marginBottom:8,fontSize:13,color:'rgba(255,255,255,.55)'}}>{t('Platos','Dishes')}</div>
                {pedido.length===0 && <p style={{fontSize:14,color:'rgba(255,255,255,.4)'}}>{t('Sin platos seleccionados','No dishes selected')}</p>}
                {pedido.map(x=>(
                  <div key={x.n} className="resumen-row">
                    <span>{x.n} ×{x.qty}</span>
                    <strong>{(x.p*x.qty).toFixed(2)}€</strong>
                  </div>
                ))}
                <div className="resumen-row" style={{borderBottom:'none',marginTop:8,fontSize:16}}>
                  <span>{t('Total','Total')}</span><strong>{total.toFixed(2)}€</strong>
                </div>
                <p style={{fontSize:12,color:'#86efac',marginTop:12}}>⏱ {t('Te respondemos en menos de 10 minutos','We reply in under 10 minutes')}</p>
              </div>
            </div>
          )}

          {vista === 'exito' && (
            <div className="exito">
              <div className="exito-icon">✅</div>
              <h2>{t('Reserva exitosa','Booking confirmed')}</h2>
              <p>{t('Gracias por preferirnos. Tu reserva ha sido registrada correctamente.','Thank you for choosing us. Your booking was saved successfully.')}</p>
              <button className="btn-primary" onClick={reiniciar}>{t('Volver al inicio','Back to home')}</button>
            </div>
          )}
        </div>

        {showBar && (
          <div className="bottom-bar">
            <div className="bottom-inner">
              <div className="bottom-info">
                <div>
                  <p>{pedido.reduce((s,i)=>s+i.qty,0)} {t('PLATOS','ITEMS')}</p>
                  <p>€{total.toFixed(2)}</p>
                </div>
                {mesa && <span className="mesa-badge">Mesa #{mesa}</span>}
              </div>
              <div className="botones-final">
                {vista !== 'resumen' ? (
                  <button className="btn-primary" onClick={irResumen}>{t('Ver resumen y confirmar','Review & confirm')} →</button>
                ) : (
                  <>
                    <button className="btn-reserva" onClick={hacerReserva} disabled={enviando}>
                      {enviando ? '...' : '✓ ' + t('Confirmar Reserva','Confirm Booking')}
                    </button>
                    <button className="btn-whatsapp" onClick={enviarWhatsApp} disabled={enviando}>
                      💬 {t('Enviar por WhatsApp','Send via WhatsApp')}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {fotoGrande && (
        <div className="lightbox" onClick={() => setFotoGrande(null)}>
          <button className="lb-close" onClick={() => setFotoGrande(null)}>×</button>
          <img src={fotoGrande.img} alt={fotoGrande.n} onClick={(e) => e.stopPropagation()} />
          <div className="lb-name">{fotoGrande.n}</div>
          <div className="lb-price">{fotoGrande.p}€</div>
        </div>
      )}
    </>
  )
}
