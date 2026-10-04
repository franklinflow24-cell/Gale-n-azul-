"use client"
import { useEffect, useState, useRef } from "react"

const USER = "galeon"
const PASS = "galeon2026"
const ESTADOS_MESA = ["libre", "reservada", "ocupada", "sucia"]
const COLOR_ESTADO = {
  libre: "#4ade80",
  reservada: "#fbbf24",
  ocupada: "#f87171",
  sucia: "#a78bfa"
}

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [loginError, setLoginError] = useState("")

  const [pedidos, setPedidos] = useState([])
  const [mesas, setMesas] = useState({})
  const [loading, setLoading] = useState(false)
  const [filtro, setFiltro] = useState("todos")
  const [menuAbierto, setMenuAbierto] = useState(null)
  const [error, setError] = useState("")
  const [fechaReporte, setFechaReporte] = useState("")
  const [mostrarReporte, setMostrarReporte] = useState(false)
  const [fechaMesas, setFechaMesas] = useState("")
  const prevCount = useRef(0)
  const audioRef = useRef(null)

  const hoy = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("galeon_admin") === "1") {
      setAuth(true)
    }
    setFechaMesas(hoy)
    // sonido simple
    try {
      audioRef.current = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp2Vi4N6c3F0e4aTnaCim5iWk5COjYyMi4uLi4uMjI2Oj5CRkpOUlZWWl5eYmJmZmZqam5ubnJycnZ2enp+foKChoqKjo6SkpaWmpqenqKipqaqqq6usrK2trq6vr7CxsbKys7O0tLW1tra3t7i4ubm6uru7vLy9vb6+v7/AwcHCwsPDxMTFxcbGx8fIyMnJysrLy8zMzc3Ozs/P0NDR0dLS09PU1NXV1tbX19jY2dna2tvb3Nzd3d7e3")
    } catch (e) {}
  }, [])

  const login = (e) => {
    e.preventDefault()
    if (user === USER && pass === PASS) {
      sessionStorage.setItem("galeon_admin", "1")
      setAuth(true)
      setLoginError("")
    } else {
      setLoginError("Usuario o contraseña incorrectos")
    }
  }

  const logout = () => {
    sessionStorage.removeItem("galeon_admin")
    setAuth(false)
  }

  const cargar = async () => {
    setLoading(true)
    setError("")
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const r = await fetch("/api/pedidos", { cache: "no-store", signal: controller.signal })
      clearTimeout(timeout)
      const data = await r.json()
      let lista = []
      let mesasData = {}
      if (Array.isArray(data)) {
        lista = data
      } else {
        lista = Array.isArray(data.pedidos) ? data.pedidos : []
        mesasData = data.mesas || {}
      }
      // Sonido si hay más pedidos activos
      const activosNow = lista.filter(p => p.estado !== "finalizada").length
      if (prevCount.current > 0 && activosNow > prevCount.current) {
        try { audioRef.current && audioRef.current.play() } catch (e) {}
        if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
          new Notification("Galeón", { body: "Nueva reserva recibida" })
        }
      }
      prevCount.current = activosNow
      setPedidos(lista)
      setMesas(mesasData)
    } catch (e) {
      setError("No se pudieron cargar los datos. Toca Recargar.")
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!auth) return
    cargar()
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
    const id = setInterval(cargar, 25000)
    return () => clearInterval(id)
  }, [auth])

  const guardarTodo = async (nuevosPedidos, nuevasMesas) => {
    const payload = {
      pedidos: nuevosPedidos ?? pedidos,
      mesas: nuevasMesas ?? mesas
    }
    await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    setPedidos(payload.pedidos)
    setMesas(payload.mesas)
  }

  const finalizarPedido = async (id) => {
    if (!confirm("¿Finalizar reserva y liberar mesa?")) return
    const nueva = pedidos.map(p => p.id === id ? { ...p, estado: "finalizada" } : p)
    const p = pedidos.find(x => x.id === id)
    let nuevasMesas = { ...mesas }
    if (p && p.mesa) nuevasMesas[String(p.mesa)] = "libre"
    await guardarTodo(nueva, nuevasMesas)
    setMenuAbierto(null)
  }

  const borrarPedido = async (id) => {
    if (!confirm("¿Borrar este pedido?")) return
    await guardarTodo(pedidos.filter(p => p.id !== id), mesas)
    setMenuAbierto(null)
  }

  const borrarTodos = async () => {
    if (!confirm("¿Borrar TODOS los pedidos?")) return
    await guardarTodo([], mesas)
  }

  const setEstadoMesa = async (n, estado) => {
    const nuevas = { ...mesas, [String(n)]: estado }
    await guardarTodo(pedidos, nuevas)
  }

  const estadoMesa = (n) => {
    // Manual override first
    if (mesas[String(n)]) return mesas[String(n)]
    // Auto from active reservations on fechaMesas
    const ocupada = activos.some(p =>
      (p.tipo === "comer" || p.tipo === "COMER AQUÍ") &&
      Number(p.mesa) === n &&
      (p.fecha || "") === fechaMesas
    )
    return ocupada ? "reservada" : "libre"
  }

  const activos = pedidos.filter(p => p.estado !== "finalizada")
  const porFecha = (f) => pedidos.filter(p => (p.fecha || "") === f)
  const totalVentas = pedidos.reduce((s, p) => s + (Number(p.total) || 0), 0)
  const totalHoy = porFecha(hoy).reduce((s, p) => s + (Number(p.total) || 0), 0)
  const pedidosReporte = fechaReporte ? porFecha(fechaReporte) : []
  const totalReporte = pedidosReporte.reduce((s, p) => s + (Number(p.total) || 0), 0)

  const pedidosFiltrados =
    filtro === "hoy" ? activos.filter(p => (p.fecha || "") === hoy)
    : filtro === "comer" ? activos.filter(p => p.tipo === "comer" || p.tipo === "COMER AQUÍ")
    : filtro === "recoger" ? activos.filter(p => p.tipo === "recoger" || p.tipo === "PARA RECOGER")
    : filtro === "finalizados" ? pedidos.filter(p => p.estado === "finalizada")
    : activos

  const ayer = () => {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    return d.toISOString().slice(0, 10)
  }

  const exportarCSV = (fecha) => {
    const lista = fecha ? porFecha(fecha) : pedidos
    const rows = [
      ["Fecha", "Hora", "Nombre", "Tipo", "Mesa", "Personas", "Platos", "Total", "Estado"]
    ]
    lista.forEach(p => {
      const platos = (p.items || []).map(x => (x.n || x) + (x.qty ? " x" + x.qty : "")).join("; ")
      rows.push([
        p.fecha || "",
        p.hora || "",
        p.nombre || "",
        p.tipo || "",
        p.mesa || "",
        p.personas || "",
        platos,
        String(p.total || 0),
        p.estado || "activa"
      ])
    })
    const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(",")).join("\n")
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "galeon-reporte-" + (fecha || "todo") + ".csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  // LOGIN SCREEN
  if (!auth) {
    return (
      <>
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0}
          body{font-family:system-ui,sans-serif;background:#0a1a2f}
          .login{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#0a1a2f;color:#fff}
          .box{width:100%;max-width:360px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:20px;padding:28px}
          h1{font-size:1.5rem;margin-bottom:6px}.sub{color:rgba(255,255,255,.5);font-size:13px;margin-bottom:22px}
          label{font-size:11px;letter-spacing:.1em;color:#fcd34d;display:block;margin-bottom:6px}
          input{width:100%;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(0,0,0,.3);color:#fff;margin-bottom:14px;font-size:16px}
          button{width:100%;padding:14px;border:none;border-radius:12px;background:#fbbf24;color:#000;font-weight:700;font-size:15px;cursor:pointer}
          .err{color:#f87171;font-size:13px;margin-bottom:12px;text-align:center}
        `}</style>
        <div className="login">
          <form className="box" onSubmit={login}>
            <h1>⚓ Galeón Admin</h1>
            <p className="sub">Acceso solo personal autorizado</p>
            {loginError && <div className="err">{loginError}</div>}
            <label>USUARIO</label>
            <input value={user} onChange={e => setUser(e.target.value)} autoComplete="username" />
            <label>CONTRASEÑA</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} autoComplete="current-password" />
            <button type="submit">Entrar</button>
          </form>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:system-ui,sans-serif;background:#0a1a2f}
        .admin{min-height:100vh;background:#0a1a2f;color:#fff;padding:20px 14px 40px}
        .wrap{max-width:720px;margin:0 auto}
        .header{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:22px}
        .header h1{font-size:1.5rem}.header h1 span{color:#fcd34d}
        .actions{display:flex;gap:8px;flex-wrap:wrap}
        .btn{padding:9px 14px;border-radius:10px;font-weight:600;font-size:13px;border:none;cursor:pointer}
        .btn-y{background:#fbbf24;color:#000}.btn-g{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.15)}
        .btn-r{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3)}
        .btn-ok{background:rgba(16,185,129,.2);color:#34d399;border:1px solid rgba(16,185,129,.35);font-size:12px;padding:6px 10px;border-radius:8px}
        .stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
        .stat{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:14px;text-align:center}
        .stat .l{font-size:10px;letter-spacing:.1em;color:rgba(255,255,255,.5);margin-bottom:4px}
        .stat .v{font-size:1.5rem;font-weight:700}.stat .v.a{color:#fcd34d}.stat .v.g{color:#4ade80}
        .card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:16px;margin-bottom:16px}
        .card h3{font-size:12px;letter-spacing:.1em;color:rgba(255,255,255,.55);margin-bottom:10px}
        .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
        .row button,.chip{padding:7px 12px;border-radius:8px;font-size:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff;cursor:pointer}
        .chip.on,.row button.on{background:#fbbf24;color:#000;border-color:#fbbf24}
        input[type=date]{padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:rgba(0,0,0,.3);color:#fff;font-size:13px}
        .mesas{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
        .mesa{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px 6px;text-align:center}
        .mesa .n{font-weight:700;font-size:1rem}
        .mesa select{width:100%;margin-top:6px;font-size:10px;padding:4px;border-radius:6px;border:1px solid rgba(255,255,255,.2);background:#0a1a2f;color:#fff}
        .dot{width:8px;height:8px;border-radius:50%;margin:4px auto 0}
        .filtros{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
        .filtro{padding:7px 12px;border-radius:999px;font-size:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:rgba(255,255,255,.7);cursor:pointer}
        .filtro.on{background:#fbbf24;color:#000}
        .pedido{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:14px;margin-bottom:10px;position:relative}
        .pedido.fin{opacity:.55}
        .ph{display:flex;justify-content:space-between;gap:8px;margin-bottom:8px}
        .pn{font-weight:600}
        .pt{font-size:11px;padding:3px 8px;border-radius:999px}
        .pt.c{background:rgba(74,222,128,.15);color:#4ade80}
        .pt.r{background:rgba(96,165,250,.15);color:#60a5fa}
        .pm{font-size:12px;color:rgba(255,255,255,.5);margin-bottom:6px}
        .pp{font-size:13px;margin-bottom:6px}
        .ptotal{font-weight:700;color:#fcd34d}
        .menu-btn{background:none;border:none;color:rgba(255,255,255,.5);font-size:18px;cursor:pointer}
        .dd{position:absolute;top:44px;right:12px;background:#1a2a3f;border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:4px;z-index:20;min-width:150px}
        .dd button{width:100%;text-align:left;padding:9px 12px;background:none;border:none;font-size:13px;cursor:pointer;border-radius:6px;color:#fff}
        .dd .rojo{color:#f87171}.dd .verde{color:#34d399}
        .empty{text-align:center;padding:40px;color:rgba(255,255,255,.4)}
        .err{text-align:center;color:#f87171;font-size:13px;margin-bottom:10px}
      `}</style>

      <div className="admin">
        <div className="wrap">
          <div className="header">
            <h1>⚓ Galeón <span>Admin</span></h1>
            <div className="actions">
              <button className="btn btn-y" onClick={cargar} disabled={loading}>{loading ? "..." : "Recargar"}</button>
              <button className="btn btn-r" onClick={borrarTodos}>Borrar todos</button>
              <button className="btn btn-g" onClick={logout}>Salir</button>
              <a href="/" className="btn btn-g" style={{textDecoration:"none"}}>← Web</a>
            </div>
          </div>

          <div className="stats">
            <div className="stat"><div className="l">RESERVAS HOY</div><div className="v a">{porFecha(hoy).filter(p=>p.estado!=="finalizada").length}</div></div>
            <div className="stat"><div className="l">ACTIVAS</div><div className="v g">{activos.length}</div></div>
          </div>

          {/* REPORTE */}
          <div className="card">
            <h3>REPORTE DE VENTAS (por fecha de reserva)</h3>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:10}}>
              <div style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>Hoy: €{totalHoy.toFixed(2)} · Total: €{totalVentas.toFixed(2)}</div>
              <div style={{fontSize:1.3+"rem",fontWeight:700,color:"#fcd34d"}}>€{totalVentas.toFixed(2)}</div>
            </div>
            <div className="row">
              <button className={fechaReporte===hoy?"on":""} onClick={()=>{setFechaReporte(hoy);setMostrarReporte(true)}}>Hoy</button>
              <button className={fechaReporte===ayer()?"on":""} onClick={()=>{setFechaReporte(ayer());setMostrarReporte(true)}}>Ayer</button>
              <input type="date" value={fechaReporte} onChange={e=>{setFechaReporte(e.target.value);setMostrarReporte(true)}} />
              <button className="btn btn-y" onClick={()=>exportarCSV(fechaReporte || hoy)}>⬇ Exportar CSV</button>
            </div>
            {mostrarReporte && fechaReporte && (
              <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.1)",fontSize:13}}>
                <p><b>Fecha:</b> {fechaReporte} · <b>Pedidos:</b> {pedidosReporte.length} · <b>Total:</b> <span style={{color:"#fcd34d"}}>€{totalReporte.toFixed(2)}</span></p>
                {pedidosReporte.length===0 && <p style={{color:"rgba(255,255,255,.4)"}}>Sin reservas ese día</p>}
                {pedidosReporte.map((p,i)=>(
                  <div key={p.id||i} style={{marginTop:4,color:"rgba(255,255,255,.65)"}}>
                    {p.hora||"--"} · {p.nombre||"—"} · Mesa {p.mesa||"-"} · €{Number(p.total||0).toFixed(2)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MESAS */}
          <div className="card">
            <h3>ESTADO DE MESAS</h3>
            <div className="row">
              <span style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>Ver día:</span>
              <input type="date" value={fechaMesas} onChange={e=>setFechaMesas(e.target.value)} />
              <button onClick={()=>setFechaMesas(hoy)}>Hoy</button>
            </div>
            <p style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:10}}>
              Verde libre · Amarillo reservada · Rojo ocupada · Morado sucia (puedes cambiar manualmente)
            </p>
            <div className="mesas">
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n => {
                const est = estadoMesa(n)
                return (
                  <div key={n} className="mesa" style={{borderColor: COLOR_ESTADO[est] + "66"}}>
                    <div className="n">{n}</div>
                    <div className="dot" style={{background: COLOR_ESTADO[est], boxShadow: "0 0 6px " + COLOR_ESTADO[est]}}></div>
                    <select value={est} onChange={e => setEstadoMesa(n, e.target.value)}>
                      {ESTADOS_MESA.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="filtros">
            {[
              {id:"todos",label:"Activas"},
              {id:"hoy",label:"Hoy"},
              {id:"comer",label:"Comer aquí"},
              {id:"recoger",label:"Para llevar"},
              {id:"finalizados",label:"Finalizadas"},
            ].map(f => (
              <button key={f.id} className={filtro===f.id?"filtro on":"filtro"} onClick={()=>setFiltro(f.id)}>{f.label}</button>
            ))}
          </div>

          {error && <div className="err">{error}</div>}

          {pedidosFiltrados.length === 0 && !loading ? (
            <div className="empty">No hay pedidos</div>
          ) : (
            pedidosFiltrados.map((p, i) => {
              const esComer = p.tipo === "comer" || p.tipo === "COMER AQUÍ"
              const key = p.id || i
              const fin = p.estado === "finalizada"
              return (
                <div key={key} className={fin ? "pedido fin" : "pedido"}>
                  <div className="ph">
                    <div className="pn">{p.nombre || "Sin nombre"}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span className={esComer ? "pt c" : "pt r"}>{esComer ? "Comer aquí" : "Para llevar"}</span>
                      <button className="menu-btn" onClick={()=>setMenuAbierto(menuAbierto===key?null:key)}>⋮</button>
                    </div>
                  </div>
                  {menuAbierto === key && (
                    <div className="dd">
                      {!fin && <button className="verde" onClick={()=>finalizarPedido(p.id)}>✓ Finalizar</button>}
                      <button className="rojo" onClick={()=>borrarPedido(p.id)}>🗑 Borrar</button>
                    </div>
                  )}
                  <div className="pm">
                    {p.mesa ? "Mesa " + p.mesa + " · " : ""}
                    {p.personas ? p.personas + " pers · " : ""}
                    {p.fecha || ""} {p.hora || ""}
                    {fin ? " · Finalizada" : ""}
                  </div>
                  {p.items && p.items.length > 0 && (
                    <div className="pp">
                      {p.items.map(x => (x.n || x) + (x.qty ? " ×" + x.qty : "")).join(", ")}
                    </div>
                  )}
                  <div className="ptotal">Total: €{Number(p.total || 0).toFixed(2)}</div>
                  {!fin && esComer && (
                    <div style={{marginTop:8}}>
                      <button className="btn-ok" onClick={()=>finalizarPedido(p.id)}>✓ Finalizar y liberar mesa</button>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}
