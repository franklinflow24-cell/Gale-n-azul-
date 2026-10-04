"use client"
import { useEffect, useState, useRef } from "react"

const USER = "galeon"
const PASS = "galeon2026"
const ESTADOS = ["libre", "reservada", "ocupada", "sucia"]
const COLORS = { libre: "#4ade80", reservada: "#fbbf24", ocupada: "#f87171", sucia: "#a78bfa" }

function beep() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    const ctx = new AC()
    const play = (f, t, d) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = "square"
      o.frequency.value = f
      g.gain.setValueAtTime(0.001, ctx.currentTime + t)
      g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d)
      o.connect(g)
      g.connect(ctx.destination)
      o.start(ctx.currentTime + t)
      o.stop(ctx.currentTime + t + d + 0.05)
    }
    play(880, 0, 0.15)
    play(880, 0.25, 0.15)
    play(1200, 0.5, 0.2)
    setTimeout(() => ctx.close(), 1000)
  } catch (e) {}
}

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [errLogin, setErrLogin] = useState("")
  const [pedidos, setPedidos] = useState([])
  const [mesas, setMesas] = useState({})
  const [loading, setLoading] = useState(false)
  const [filtro, setFiltro] = useState("todos")
  const [menu, setMenu] = useState(null)
  const [error, setError] = useState("")
  const [fechaR, setFechaR] = useState("")
  const [showR, setShowR] = useState(false)
  const [fechaM, setFechaM] = useState("")
  const [alerta, setAlerta] = useState("")
  const prevIds = useRef(null)
  const soundOn = useRef(false)
  const hoy = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("galeon_admin") === "1") setAuth(true)
    setFechaM(hoy)
  }, [])

  const enableSound = () => {
    soundOn.current = true
    beep()
  }

  const login = (e) => {
    e.preventDefault()
    if (user === USER && pass === PASS) {
      sessionStorage.setItem("galeon_admin", "1")
      setAuth(true)
      setErrLogin("")
      enableSound()
    } else setErrLogin("Usuario o contraseña incorrectos")
  }

  const logout = () => {
    sessionStorage.removeItem("galeon_admin")
    setAuth(false)
  }

  const cargar = async (quiet) => {
    if (!quiet) setLoading(true)
    setError("")
    try {
      const c = new AbortController()
      const t = setTimeout(() => c.abort(), 10000)
      const r = await fetch("/api/pedidos", { cache: "no-store", signal: c.signal })
      clearTimeout(t)
      const data = await r.json()
      let lista = []
      let mesasData = {}
      if (Array.isArray(data)) {
        lista = data
      } else {
        lista = Array.isArray(data.pedidos) ? data.pedidos : []
        mesasData = data.mesas || {}
      }
      const ids = lista.filter(p => p.estado !== "finalizada").map(p => String(p.id))
      if (prevIds.current === null) {
        prevIds.current = ids
      } else {
        const nuevos = ids.filter(id => !prevIds.current.includes(id))
        if (nuevos.length > 0) {
          if (soundOn.current) beep()
          setAlerta("Nueva reserva recibida")
          setTimeout(() => setAlerta(""), 8000)
        }
        prevIds.current = ids
      }
      setPedidos(lista)
      setMesas(mesasData)
    } catch (e) {
      if (!quiet) setError("Error al cargar. Toca Recargar.")
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!auth) return
    cargar(false)
    const id = setInterval(() => cargar(true), 12000)
    return () => clearInterval(id)
  }, [auth])

  const save = async (np, nm) => {
    const payload = { pedidos: np != null ? np : pedidos, mesas: nm != null ? nm : mesas }
    await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    setPedidos(payload.pedidos)
    setMesas(payload.mesas)
  }

  const finalizar = async (id) => {
    if (!confirm("Finalizar y liberar mesa?")) return
    const p = pedidos.find(x => x.id === id)
    const np = pedidos.map(x => x.id === id ? { ...x, estado: "finalizada" } : x)
    const nm = { ...mesas }
    if (p && p.mesa) nm[String(p.mesa)] = "libre"
    await save(np, nm)
    setMenu(null)
  }

  const borrar = async (id) => {
    if (!confirm("Borrar pedido?")) return
    await save(pedidos.filter(p => p.id !== id), mesas)
    setMenu(null)
  }

  const borrarTodos = async () => {
    if (!confirm("Borrar TODOS?")) return
    await save([], mesas)
  }

  const setMesa = async (n, est) => {
    await save(pedidos, { ...mesas, [String(n)]: est })
  }

  const activos = pedidos.filter(p => p.estado !== "finalizada")
  const porFecha = (f) => pedidos.filter(p => (p.fecha || "") === f)

  const estadoMesa = (n) => {
    if (mesas[String(n)]) return mesas[String(n)]
    const occ = activos.some(p =>
      (p.tipo === "comer" || p.tipo === "COMER AQUÍ") &&
      Number(p.mesa) === n &&
      (p.fecha || "") === fechaM
    )
    return occ ? "reservada" : "libre"
  }

  const totalV = pedidos.reduce((s, p) => s + (Number(p.total) || 0), 0)
  const totalH = porFecha(hoy).reduce((s, p) => s + (Number(p.total) || 0), 0)
  const rep = fechaR ? porFecha(fechaR) : []
  const totalR = rep.reduce((s, p) => s + (Number(p.total) || 0), 0)

  const lista =
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

  const exportCSV = (f) => {
    const rows = [["Fecha", "Hora", "Nombre", "Tipo", "Mesa", "Personas", "Platos", "Total", "Estado"]]
    const src = f ? porFecha(f) : pedidos
    src.forEach(p => {
      const platos = (p.items || []).map(x => (x.n || x) + (x.qty ? " x" + x.qty : "")).join("; ")
      rows.push([p.fecha || "", p.hora || "", p.nombre || "", p.tipo || "", p.mesa || "", p.personas || "", platos, String(p.total || 0), p.estado || "activa"])
    })
    const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(",")).join("\n")
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "galeon-" + (f || "todo") + ".csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!auth) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a1a2f", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui" }}>
        <form onSubmit={login} style={{ width: "100%", maxWidth: 360, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: 28 }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: 6 }}>Galeon Admin</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 20 }}>Solo personal autorizado</p>
          {errLogin && <p style={{ color: "#f87171", marginBottom: 12, textAlign: "center" }}>{errLogin}</p>}
          <label style={{ fontSize: 11, color: "#fcd34d", display: "block", marginBottom: 6 }}>USUARIO</label>
          <input value={user} onChange={e => setUser(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", color: "#fff", marginBottom: 14, fontSize: 16 }} />
          <label style={{ fontSize: 11, color: "#fcd34d", display: "block", marginBottom: 6 }}>CONTRASEÑA</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", color: "#fff", marginBottom: 14, fontSize: 16 }} />
          <button type="submit" style={{ width: "100%", padding: 14, border: "none", borderRadius: 12, background: "#fbbf24", color: "#000", fontWeight: 700, fontSize: 15 }}>Entrar</button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a1a2f", color: "#fff", padding: "20px 14px 40px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
          <h1 style={{ fontSize: "1.5rem" }}>Galeon <span style={{ color: "#fcd34d" }}>Admin</span></h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => { enableSound(); cargar(false) }} style={btnY}>{loading ? "..." : "Recargar"}</button>
            <button onClick={enableSound} style={btnG}>Probar sonido</button>
            <button onClick={borrarTodos} style={btnR}>Borrar todos</button>
            <button onClick={logout} style={btnG}>Salir</button>
            <a href="/" style={{ ...btnG, textDecoration: "none" }}>Web</a>
          </div>
        </div>

        {alerta && <div style={{ background: "#fbbf24", color: "#000", fontWeight: 700, textAlign: "center", padding: 12, borderRadius: 12, marginBottom: 14 }}>{alerta}</div>}
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 12 }}>Toca Probar sonido una vez. Deja el Admin abierto.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <div style={statBox}><div style={statL}>HOY</div><div style={{ ...statV, color: "#fcd34d" }}>{porFecha(hoy).filter(p => p.estado !== "finalizada").length}</div></div>
          <div style={statBox}><div style={statL}>ACTIVAS</div><div style={{ ...statV, color: "#4ade80" }}>{activos.length}</div></div>
        </div>

        <div style={card}>
          <h3 style={h3}>REPORTE</h3>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Hoy: €{totalH.toFixed(2)} · Total: €{totalV.toFixed(2)}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            <button onClick={() => { setFechaR(hoy); setShowR(true) }} style={chip}>Hoy</button>
            <button onClick={() => { setFechaR(ayer()); setShowR(true) }} style={chip}>Ayer</button>
            <input type="date" value={fechaR} onChange={e => { setFechaR(e.target.value); setShowR(true) }} style={dateIn} />
            <button onClick={() => exportCSV(fechaR || hoy)} style={btnY}>Exportar CSV</button>
          </div>
          {showR && fechaR && (
            <div style={{ fontSize: 13, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10 }}>
              <p>{fechaR} · {rep.length} pedidos · <b style={{ color: "#fcd34d" }}>€{totalR.toFixed(2)}</b></p>
              {rep.map((p, i) => <div key={p.id || i} style={{ marginTop: 4, color: "rgba(255,255,255,0.65)" }}>{p.hora || "--"} · {p.nombre || "-"} · Mesa {p.mesa || "-"} · €{Number(p.total || 0).toFixed(2)}</div>)}
            </div>
          )}
        </div>

        <div style={card}>
          <h3 style={h3}>MESAS</h3>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Dia:</span>
            <input type="date" value={fechaM} onChange={e => setFechaM(e.target.value)} style={dateIn} />
            <button onClick={() => setFechaM(hoy)} style={chip}>Hoy</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n => {
              const est = estadoMesa(n)
              return (
                <div key={n} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid " + COLORS[est] + "66", borderRadius: 12, padding: 8, textAlign: "center" }}>
                  <div style={{ fontWeight: 700 }}>{n}</div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[est], margin: "4px auto" }} />
                  <select value={est} onChange={e => setMesa(n, e.target.value)} style={{ width: "100%", marginTop: 4, fontSize: 10, background: "#0a1a2f", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6 }}>
                    {ESTADOS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {[["todos","Activas"],["hoy","Hoy"],["comer","Comer"],["recoger","Llevar"],["finalizados","Finalizadas"]].map(([id, lab]) => (
            <button key={id} onClick={() => setFiltro(id)} style={filtro === id ? { ...chip, background: "#fbbf24", color: "#000" } : chip}>{lab}</button>
          ))}
        </div>

        {error && <p style={{ color: "#f87171", textAlign: "center" }}>{error}</p>}
        {lista.length === 0 && !loading && <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: 40 }}>No hay pedidos</p>}

        {lista.map((p, i) => {
          const key = p.id || i
          const fin = p.estado === "finalizada"
          const comer = p.tipo === "comer" || p.tipo === "COMER AQUÍ"
          return (
            <div key={key} style={{ ...card, opacity: fin ? 0.55 : 1, position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <b>{p.nombre || "Sin nombre"}</b>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 999, background: comer ? "rgba(74,222,128,0.15)" : "rgba(96,165,250,0.15)", color: comer ? "#4ade80" : "#60a5fa" }}>{comer ? "Comer" : "Llevar"}</span>
                  <button onClick={() => setMenu(menu === key ? null : key)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 18 }}>...</button>
                </div>
              </div>
              {menu === key && (
                <div style={{ position: "absolute", top: 44, right: 12, background: "#1a2a3f", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: 4, zIndex: 20 }}>
                  {!fin && <button onClick={() => finalizar(p.id)} style={ddBtn}>Finalizar</button>}
                  <button onClick={() => borrar(p.id)} style={{ ...ddBtn, color: "#f87171" }}>Borrar</button>
                </div>
              )}
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
                {p.mesa ? "Mesa " + p.mesa + " · " : ""}{p.personas ? p.personas + " pers · " : ""}{p.fecha || ""} {p.hora || ""}{fin ? " · Finalizada" : ""}
              </div>
              {p.items && p.items.length > 0 && (
                <div style={{ fontSize: 13, marginBottom: 6 }}>{p.items.map(x => (x.n || x) + (x.qty ? " x" + x.qty : "")).join(", ")}</div>
              )}
              <div style={{ fontWeight: 700, color: "#fcd34d" }}>Total: €{Number(p.total || 0).toFixed(2)}</div>
              {!fin && comer && (
                <button onClick={() => finalizar(p.id)} style={{ marginTop: 8, background: "rgba(16,185,129,0.2)", color: "#34d399", border: "1px solid rgba(16,185,129,0.35)", borderRadius: 8, padding: "6px 10px", fontSize: 12 }}>Finalizar y liberar</button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const btnY = { padding: "9px 14px", borderRadius: 10, fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer", background: "#fbbf24", color: "#000" }
const btnG = { padding: "9px 14px", borderRadius: 10, fontWeight: 600, fontSize: 13, border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", background: "rgba(255,255,255,0.08)", color: "#fff" }
const btnR = { padding: "9px 14px", borderRadius: 10, fontWeight: 600, fontSize: 13, border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer", background: "rgba(239,68,68,0.15)", color: "#f87171" }
const chip = { padding: "7px 12px", borderRadius: 8, fontSize: 12, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer" }
const dateIn = { padding: "7px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", color: "#fff", fontSize: 13 }
const card = { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 16, marginBottom: 12 }
const h3 = { fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)", marginBottom: 10 }
const statBox = { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: 14, textAlign: "center" }
const statL = { fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: 4 }
const statV = { fontSize: "1.5rem", fontWeight: 700 }
const ddBtn = { display: "block", width: "100%", textAlign: "left", padding: "9px 12px", background: "none", border: "none", color: "#fff", fontSize: 13, cursor: "pointer" }
