"use client"
import { useEffect, useState } from "react"

export default function Admin() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(false)
  const [filtro, setFiltro] = useState("todos")
  const [menuAbierto, setMenuAbierto] = useState(null)
  const [error, setError] = useState("")
  const [fechaReporte, setFechaReporte] = useState("")
  const [mostrarReporte, setMostrarReporte] = useState(false)
  const [fechaMesas, setFechaMesas] = useState("")

  const hoy = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    setFechaMesas(hoy)
  }, [])

  const cargar = async () => {
    setLoading(true)
    setError("")
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 8000)
      const r = await fetch("/api/pedidos", { cache: "no-store", signal: controller.signal })
      clearTimeout(timeout)
      const j = await r.json()
      setPedidos(Array.isArray(j) ? j : [])
    } catch (e) {
      setError("No se pudieron cargar los pedidos. Toca Recargar.")
      setPedidos([])
    }
    setLoading(false)
  }

  useEffect(() => {
    cargar()
  }, [])

  const guardarLista = async (nuevaLista) => {
    await fetch("https://api.npoint.io/095d2379ae022a7f47b8", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaLista)
    })
    setPedidos(nuevaLista)
  }

  const finalizarPedido = async (id) => {
    if (!confirm("¿Finalizar esta reserva y liberar la mesa?")) return
    const nueva = pedidos.map(p =>
      p.id === id ? { ...p, estado: "finalizada" } : p
    )
    try {
      await guardarLista(nueva)
      setMenuAbierto(null)
    } catch {
      alert("Error al finalizar")
    }
  }

  const borrarPedido = async (id) => {
    if (!confirm("¿Borrar este pedido?")) return
    const nueva = pedidos.filter(p => p.id !== id)
    try {
      await guardarLista(nueva)
      setMenuAbierto(null)
    } catch {
      alert("Error al borrar")
    }
  }

  const borrarTodos = async () => {
    if (!confirm("¿Borrar TODOS los pedidos?")) return
    try {
      await guardarLista([])
    } catch {
      alert("Error al borrar")
    }
  }

  // Solo por FECHA DE RESERVA (la que eligió el cliente)
  const porFechaReserva = (fecha) =>
    pedidos.filter(p => (p.fecha || "") === fecha)

  const activos = pedidos.filter(p => p.estado !== "finalizada")

  // Mesas ocupadas según la fecha que el dueño está mirando
  const mesasOcupadas = new Set(
    activos
      .filter(p =>
        (p.tipo === "comer" || p.tipo === "COMER AQUÍ") &&
        p.mesa &&
        (p.fecha || "") === fechaMesas
      )
      .map(p => Number(p.mesa))
  )

  // Totales: solo por fecha de reserva del cliente
  const totalVentas = pedidos.reduce((s, p) => s + (Number(p.total) || 0), 0)
  const totalVentasHoy = porFechaReserva(hoy).reduce((s, p) => s + (Number(p.total) || 0), 0)

  // Reporte: SOLO fecha de reserva (nunca fechaCreacion)
  const pedidosReporte = fechaReporte
    ? porFechaReserva(fechaReporte)
    : []
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; background: #0a1a2f; }
        .admin-page { min-height: 100vh; background: #0a1a2f; color: white; padding: 24px 16px 40px; }
        .admin-container { max-width: 720px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
        .header h1 { font-family: 'Playfair Display', serif; font-size: 1.75rem; font-weight: 600; }
        .header h1 span { color: #fcd34d; }
        .header-actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .btn { padding: 10px 18px; border-radius: 12px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; }
        .btn-primary { background: #fbbf24; color: #000; }
        .btn-ghost { background: rgba(255,255,255,0.08); color: white; border: 1px solid rgba(255,255,255,0.15); text-decoration: none; }
        .btn-danger { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
        .btn-ok { background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.4); font-size: 12px; padding: 6px 12px; border-radius: 8px; cursor: pointer; }
        .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        .stat-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 16px; text-align: center; }
        .stat-card .label { font-size: 11px; letter-spacing: 0.1em; color: rgba(255,255,255,0.55); margin-bottom: 6px; }
        .stat-card .value { font-size: 1.6rem; font-weight: 700; }
        .stat-card.amber .value { color: #fcd34d; }
        .stat-card.green .value { color: #4ade80; }
        .reporte { background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.25); border-radius: 16px; padding: 16px 20px; margin-bottom: 16px; }
        .reporte-top { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 12px; }
        .reporte-titulo { font-size: 13px; color: rgba(255,255,255,0.6); }
        .reporte-total { font-size: 1.5rem; font-weight: 700; color: #fcd34d; }
        .reporte-btns { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; align-items: center; }
        .reporte-btns button { padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; cursor: pointer; }
        .reporte-btns button.active { background: #fbbf24; color: #000; border-color: #fbbf24; }
        .reporte-detalle { margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); }
        .reporte-detalle p { font-size: 14px; color: rgba(255,255,255,0.7); margin-bottom: 6px; }
        .mesas-section { margin-bottom: 28px; }
        .mesas-section h3 { font-size: 13px; letter-spacing: 0.1em; color: rgba(255,255,255,0.6); margin-bottom: 8px; }
        .mesas-fecha { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
        .mesas-fecha label { font-size: 12px; color: rgba(255,255,255,0.5); }
        .mesas-fecha input { padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(0,0,0,0.3); color: white; font-size: 13px; }
        .mesas-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        .mesa-item { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 12px 8px; text-align: center; }
        .mesa-item .num { font-weight: 700; font-size: 1.1rem; }
        .mesa-item .dot { width: 10px; height: 10px; border-radius: 50%; margin: 6px auto 0; }
        .dot.verde { background: #4ade80; box-shadow: 0 0 8px rgba(74,222,128,0.5); }
        .dot.rojo { background: #f87171; box-shadow: 0 0 8px rgba(248,113,113,0.5); }
        .mesa-item.ocupada { border-color: rgba(248,113,113,0.4); background: rgba(248,113,113,0.08); }
        .filtros { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .filtro-btn { padding: 8px 16px; border-radius: 999px; font-size: 13px; font-weight: 500; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); cursor: pointer; }
        .filtro-btn.active { background: #fbbf24; color: #000; border-color: #fbbf24; }
        .lista { display: flex; flex-direction: column; gap: 12px; }
        .pedido-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 18px; position: relative; }
        .pedido-card.finalizada { opacity: 0.55; }
        .pedido-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; gap: 12px; }
        .pedido-nombre { font-weight: 600; font-size: 1.05rem; }
        .pedido-tipo { font-size: 12px; padding: 4px 10px; border-radius: 999px; font-weight: 500; white-space: nowrap; }
        .pedido-tipo.comer { background: rgba(74, 222, 128, 0.15); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.3); }
        .pedido-tipo.recoger { background: rgba(96, 165, 250, 0.15); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.3); }
        .pedido-meta { font-size: 13px; color: rgba(255,255,255,0.55); margin-bottom: 8px; line-height: 1.5; }
        .pedido-platos { font-size: 14px; color: rgba(255,255,255,0.85); margin-bottom: 8px; line-height: 1.5; }
        .pedido-total { font-weight: 700; color: #fcd34d; font-size: 1.1rem; }
        .pedido-acciones { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
        .menu-btn { background: none; border: none; color: rgba(255,255,255,0.5); font-size: 20px; cursor: pointer; padding: 4px 8px; }
        .dropdown { position: absolute; top: 48px; right: 16px; background: #1a2a3f; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 6px; z-index: 20; min-width: 160px; }
        .dropdown button { width: 100%; text-align: left; padding: 10px 14px; background: none; border: none; font-size: 14px; cursor: pointer; border-radius: 8px; color: white; }
        .dropdown button.rojo { color: #f87171; }
        .dropdown button.verde { color: #34d399; }
        .empty { text-align: center; padding: 48px 20px; color: rgba(255,255,255,0.4); }
        .error-msg { text-align: center; padding: 16px; color: #f87171; font-size: 14px; margin-bottom: 12px; }
      `}</style>

      <div className="admin-page">
        <div className="admin-container">
          <div className="header">
            <h1>⚓ Galeón <span>Admin</span></h1>
            <div className="header-actions">
              <button className="btn btn-primary" onClick={cargar} disabled={loading}>
                {loading ? "Cargando..." : "Recargar"}
              </button>
              <button className="btn btn-danger" onClick={borrarTodos}>Borrar todos</button>
              <a href="/" className="btn btn-ghost">← Web</a>
            </div>
          </div>

          <div className="stats">
            <div className="stat-card amber">
              <div className="label">RESERVAS HOY</div>
              <div className="value">{porFechaReserva(hoy).filter(p => p.estado !== "finalizada").length}</div>
            </div>
            <div className="stat-card green">
              <div className="label">TOTAL ACTIVAS</div>
              <div className="value">{activos.length}</div>
            </div>
          </div>

          {/* Reporte: solo por fecha de reserva del cliente */}
          <div className="reporte">
            <div className="reporte-top">
              <div>
                <div className="reporte-titulo">REPORTE DE VENTAS (por fecha de reserva)</div>
                <div style={{fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4}}>
                  Hoy: €{totalVentasHoy.toFixed(2)} · Histórico: €{totalVentas.toFixed(2)}
                </div>
              </div>
              <div className="reporte-total">€{totalVentas.toFixed(2)}</div>
            </div>

            <div className="reporte-btns">
              <button
                className={fechaReporte === hoy ? "active" : ""}
                onClick={() => { setFechaReporte(hoy); setMostrarReporte(true) }}
              >
                Hoy
              </button>
              <button
                className={fechaReporte === ayer() ? "active" : ""}
                onClick={() => { setFechaReporte(ayer()); setMostrarReporte(true) }}
              >
                Ayer
              </button>
              <input
                type="date"
                value={fechaReporte}
                onChange={e => { setFechaReporte(e.target.value); setMostrarReporte(true) }}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(0,0,0,0.3)",
                  color: "white",
                  fontSize: 13
                }}
              />
            </div>

            {mostrarReporte && fechaReporte && (
              <div className="reporte-detalle">
                <p><strong>Fecha de reserva:</strong> {fechaReporte}</p>
                <p><strong>Pedidos ese día:</strong> {pedidosReporte.length}</p>
                <p><strong>Total vendido:</strong> <span style={{color: "#fcd34d", fontWeight: 700}}>€{totalReporte.toFixed(2)}</span></p>
                {pedidosReporte.length === 0 && (
                  <p style={{color: "rgba(255,255,255,0.45)"}}>No hay reservas para esta fecha.</p>
                )}
                {pedidosReporte.map((p, i) => (
                  <div key={p.id || i} style={{marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.65)"}}>
                    {p.hora || "--:--"} · {p.nombre || "Sin nombre"} · Mesa {p.mesa || "-"} · €{Number(p.total || 0).toFixed(2)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Estado de mesas: según la fecha que el dueño elija */}
          <div className="mesas-section">
            <h3>ESTADO DE MESAS</h3>
            <div className="mesas-fecha">
              <label>Ver mesas del día:</label>
              <input
                type="date"
                value={fechaMesas}
                onChange={e => setFechaMesas(e.target.value)}
              />
              <button
                className="btn btn-ghost"
                style={{padding: "8px 12px", fontSize: 12}}
                onClick={() => setFechaMesas(hoy)}
              >
                Hoy
              </button>
            </div>
            <p style={{fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 12}}>
              Rojo = reservada ese día · Verde = libre ese día
            </p>
            <div className="mesas-grid">
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n => {
                const ocupada = mesasOcupadas.has(n)
                return (
                  <div key={n} className={ocupada ? "mesa-item ocupada" : "mesa-item"}>
                    <div className="num">{n}</div>
                    <div className={ocupada ? "dot rojo" : "dot verde"}></div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="filtros">
            {[
              { id: "todos", label: "Activas" },
              { id: "hoy", label: "Hoy" },
              { id: "comer", label: "Comer aquí" },
              { id: "recoger", label: "Para llevar" },
              { id: "finalizados", label: "Finalizadas" },
            ].map(f => (
              <button
                key={f.id}
                className={filtro === f.id ? "filtro-btn active" : "filtro-btn"}
                onClick={() => setFiltro(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {error && <div className="error-msg">{error}</div>}

          {pedidosFiltrados.length === 0 && !loading ? (
            <div className="empty">No hay pedidos</div>
          ) : (
            <div className="lista">
              {pedidosFiltrados.map((p, i) => {
                const esComer = p.tipo === "comer" || p.tipo === "COMER AQUÍ"
                const key = p.id || i
                const finalizada = p.estado === "finalizada"
                return (
                  <div key={key} className={finalizada ? "pedido-card finalizada" : "pedido-card"}>
                    <div className="pedido-header">
                      <div className="pedido-nombre">{p.nombre || "Sin nombre"}</div>
                      <div style={{display: "flex", alignItems: "center", gap: 8}}>
                        <span className={esComer ? "pedido-tipo comer" : "pedido-tipo recoger"}>
                          {esComer ? "🍽️ Comer aquí" : "🥡 Para llevar"}
                        </span>
                        <button className="menu-btn" onClick={() => setMenuAbierto(menuAbierto === key ? null : key)}>⋮</button>
                      </div>
                    </div>

                    {menuAbierto === key && (
                      <div className="dropdown">
                        {!finalizada && (
                          <button className="verde" onClick={() => finalizarPedido(p.id)}>
                            ✓ Finalizar reserva
                          </button>
                        )}
                        <button className="rojo" onClick={() => borrarPedido(p.id)}>
                          🗑 Borrar pedido
                        </button>
                      </div>
                    )}

                    <div className="pedido-meta">
                      {p.mesa ? "Mesa " + p.mesa + " · " : ""}
                      {p.personas ? p.personas + " pers · " : ""}
                      {p.fecha || ""} {p.hora || ""}
                      {finalizada ? " · Finalizada" : ""}
                    </div>

                    {p.items && p.items.length > 0 && (
                      <div className="pedido-platos">
                        {p.items.map(x => x.n || x).join(", ")}
                      </div>
                    )}

                    {(p.total || p.total === 0) && (
                      <div className="pedido-total">Total: €{Number(p.total).toFixed(2)}</div>
                    )}

                    {!finalizada && esComer && (
                      <div className="pedido-acciones">
                        <button className="btn-ok" onClick={() => finalizarPedido(p.id)}>
                          ✓ Finalizar y liberar mesa
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
