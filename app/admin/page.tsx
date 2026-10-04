"use client"
import { useEffect, useState } from "react"

export default function Admin() {
  const [pedidos, setPedidos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState("todos")
  const [menuAbierto, setMenuAbierto] = useState<number | null>(null)

  const cargar = async () => {
  }

  useEffect(() => {
    cargar()
    const interval = setInterval(cargar, 30000)
    return () => clearInterval(interval)
  }, [])

  const borrarPedido = async (id: number) => {
    if (!confirm("¿Seguro que quieres borrar este pedido?")) return
    try {
      const nuevos = pedidos.filter(p => p.id !== id)
      await fetch("https://api.npoint.io/095d2379ae022a7f47b8", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevos)
      })
      setPedidos(nuevos)
      setMenuAbierto(null)
    } catch {
      alert("Error al borrar")
    }
  }

  const borrarTodos = async () => {
    if (!confirm("¿Borrar TODOS los pedidos? Esta acción no se puede deshacer.")) return
    try {
      await fetch("https://api.npoint.io/095d2379ae022a7f47b8", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([])
      })
      setPedidos([])
    } catch {
      alert("Error al borrar")
    }
  }

  const hoy = new Date().toISOString().slice(0, 10)
  const pedidosHoy = pedidos.filter(p => 
    (p.fecha || "").startsWith(hoy) || (p.fechaCreacion || "").startsWith(hoy)
  )

  const totalVentas = pedidos.reduce((s, p) => s + (Number(p.total) || 0), 0)
  const totalVentasHoy = pedidosHoy.reduce((s, p) => s + (Number(p.total) || 0), 0)

  // Mesas ocupadas (hoy + comer aquí)
  const mesasOcupadas = new Set(
    pedidosHoy
      .filter(p => (p.tipo === "comer" || p.tipo === "COMER AQUÍ") && p.mesa)
      .map(p => Number(p.mesa))
  )

  const pedidosFiltrados = filtro === "hoy" 
    ? pedidosHoy 
    : filtro === "comer" 
      ? pedidos.filter(p => p.tipo === "comer" || p.tipo === "COMER AQUÍ")
      : filtro === "recoger"
        ? pedidos.filter(p => p.tipo === "recoger" || p.tipo === "PARA RECOGER")
        : pedidos

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
        .header-actions { display: flex; gap: 10px; align-items: center; }
        .btn { padding: 10px 18px; border-radius: 12px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; transition: all 0.2s; }
        .btn-primary { background: #fbbf24; color: #000; }
        .btn-primary:hover { background: #fcd34d; }
        .btn-ghost { background: rgba(255,255,255,0.08); color: white; border: 1px solid rgba(255,255,255,0.15); text-decoration: none; }
        .btn-danger { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
        .btn-danger:hover { background: rgba(239,68,68,0.25); }

        .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
        .stat-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 16px; text-align: center; }
        .stat-card .label { font-size: 11px; letter-spacing: 0.1em; color: rgba(255,255,255,0.55); margin-bottom: 6px; }
        .stat-card .value { font-size: 1.6rem; font-weight: 700; }
        .stat-card.amber .value { color: #fcd34d; }
        .stat-card.green .value { color: #4ade80; }

        .reporte { background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.25); border-radius: 16px; padding: 16px 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .reporte-titulo { font-size: 13px; color: rgba(255,255,255,0.6); }
        .reporte-total { font-size: 1.5rem; font-weight: 700; color: #fcd34d; }

        .mesas-section { margin-bottom: 28px; }
        .mesas-section h3 { font-size: 13px; letter-spacing: 0.1em; color: rgba(255,255,255,0.6); margin-bottom: 12px; }
        .mesas-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        .mesa-item { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 12px 8px; text-align: center; position: relative; }
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
        .pedido-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; gap: 12px; }
        .pedido-nombre { font-weight: 600; font-size: 1.05rem; }
        .pedido-tipo { font-size: 12px; padding: 4px 10px; border-radius: 999px; font-weight: 500; white-space: nowrap; }
        .pedido-tipo.comer { background: rgba(74, 222, 128, 0.15); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.3); }
        .pedido-tipo.recoger { background: rgba(96, 165, 250, 0.15); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.3); }
        .pedido-meta { font-size: 13px; color: rgba(255,255,255,0.55); margin-bottom: 8px; line-height: 1.5; }
        .pedido-platos { font-size: 14px; color: rgba(255,255,255,0.85); margin-bottom: 8px; line-height: 1.5; }
        .pedido-total { font-weight: 700; color: #fcd34d; font-size: 1.1rem; }
        .menu-btn { background: none; border: none; color: rgba(255,255,255,0.5); font-size: 20px; cursor: pointer; padding: 4px 8px; }
        .dropdown { position: absolute; top: 48px; right: 16px; background: #1a2a3f; border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 6px; z-index: 20; min-width: 140px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
        .dropdown button { width: 100%; text-align: left; padding: 10px 14px; background: none; border: none; color: #f87171; font-size: 14px; cursor: pointer; border-radius: 8px; }
        .dropdown button:hover { background: rgba(248,113,113,0.15); }
        .empty { text-align: center; padding: 48px 20px; color: rgba(255,255,255,0.4); }
        .loading { text-align: center; padding: 40px; color: rgba(255,255,255,0.5); }
      `}</style>

      <div className="admin-page">
        <div className="admin-container">
          
          <div className="header">
            <h1>⚓ Galeón <span>Admin</span></h1>
            <div className="header-actions">
              <button className="btn btn-primary" onClick={cargar}>
                {loading ? "Cargando..." : "Recargar"}
              </button>
              <button className="btn btn-danger" onClick={borrarTodos}>
                Borrar todos
              </button>
              <a href="/" className="btn btn-ghost">← Web</a>
            </div>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat-card amber">
              <div className="label">PEDIDOS HOY</div>
              <div className="value">{pedidosHoy.length}</div>
            </div>
            <div className="stat-card green">
              <div className="label">TOTAL PEDIDOS</div>
              <div className="value">{pedidos.length}</div>
            </div>
          </div>

          {/* Reporte de ventas */}
          <div className="reporte">
            <div>
              <div className="reporte-titulo">REPORTE DE VENTAS</div>
              <div style={{fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4}}>
                Hoy: €{totalVentasHoy.toFixed(2)} · Histórico: €{totalVentas.toFixed(2)}
              </div>
            </div>
            <div className="reporte-total">€{totalVentas.toFixed(2)}</div>
          </div>

          {/* Estado de mesas */}
          <div className="mesas-section">
            <h3>ESTADO DE MESAS (HOY)</h3>
            <div className="mesas-grid">
              {Array.from({length: 15}, (_, i) => i + 1).map(n => {
                const ocupada = mesasOcupadas.has(n)
                return (
                  <div key={n} className={`mesa-item ${ocupada ? "ocupada" : ""}`}>
                    <div className="num">{n}</div>
                    <div className={`dot ${ocupada ? "rojo" : "verde"}`}></div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Filtros */}
          <div className="filtros">
            {[
              { id: "todos", label: "Todos" },
              { id: "hoy", label: "Hoy" },
              { id: "comer", label: "Comer aquí" },
              { id: "recoger", label: "Para llevar" },
            ].map(f => (
              <button
                key={f.id}
                className={`filtro-btn ${filtro === f.id ? "active" : ""}`}
                onClick={() => setFiltro(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Lista de pedidos */}
          {loading && pedidos.length === 0 ? (
            <div className="loading">Cargando pedidos...</div>
          ) : pedidosFiltrados.length === 0 ? (
            <div className="empty">No hay pedidos todavía</div>
          ) : (
            <div className="lista">
              {pedidosFiltrados.map((p: any, i: number) => {
                const esComer = p.tipo === "comer" || p.tipo === "COMER AQUÍ"
                return (
                  <div key={p.id || i} className="pedido-card">
                    <div className="pedido-header">
                      <div className="pedido-nombre">{p.nombre || "Sin nombre"}</div>
                      <div style={{display: "flex", alignItems: "center", gap: 8}}>
                        <span className={`pedido-tipo ${esComer ? "comer" : "recoger"}`}>
                          {esComer ? "🍽️ Comer aquí" : "🥡 Para llevar"}
                        </span>
                        <button 
                          className="menu-btn" 
                          onClick={() => setMenuAbierto(menuAbierto === (p.id || i) ? null : (p.id || i))}
                        >
                          ⋮
                        </button>
                      </div>
                    </div>

                    {menuAbierto === (p.id || i) && (
                      <div className="dropdown">
                        <button onClick={() => borrarPedido(p.id)}>🗑 Borrar pedido</button>
                      </div>
                    )}

                    <div className="pedido-meta">
                      {p.mesa && <>Mesa {p.mesa} · </>}
                      {p.personas && <>{p.personas} pers · </>}
                      {p.fecha && <>{p.fecha} </>}
                      {p.hora && <>{p.hora}</>}
                    </div>

                    {p.items && p.items.length > 0 && (
                      <div className="pedido-platos">
                        {p.items.map((x: any) => x.n || x).join(", ")}
                      </div>
                    )}

                    {(p.total || p.total === 0) && (
                      <div className="pedido-total">
                        Total: €{Number(p.total).toFixed(2)}
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
