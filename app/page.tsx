"use client"
import { useEffect, useState } from "react"

export default function Admin() {
  const [pedidos, setPedidos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState("todos")

  const cargar = async () => {
    setLoading(true)
    try {
      const r = await fetch("/api/pedidos", { cache: "no-store" })
      const j = await r.json()
      setPedidos(Array.isArray(j) ? j : [])
    } catch {
      setPedidos([])
    }
    setLoading(false)
  }

  useEffect(() => {
    cargar()
    // Recargar automáticamente cada 30 segundos
    const interval = setInterval(cargar, 30000)
    return () => clearInterval(interval)
  }, [])

  const hoy = new Date().toISOString().slice(0, 10)
  const pedidosHoy = pedidos.filter(p => (p.fecha || p.fechaCreacion || "").startsWith(hoy) || (p.fechaCreacion || "").startsWith(hoy))
  const reservasHoy = pedidosHoy.filter(p => p.tipo === "comer" || p.tipo === "COMER AQUÍ")
  const takeAwayHoy = pedidosHoy.filter(p => p.tipo === "recoger" || p.tipo === "PARA RECOGER")

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

        .admin-page {
          min-height: 100vh;
          background: #0a1a2f;
          color: white;
          padding: 24px 16px 40px;
        }

        .admin-container {
          max-width: 720px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 600;
        }

        .header h1 span {
          color: #fcd34d;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .btn {
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #fbbf24;
          color: #000;
        }
        .btn-primary:hover {
          background: #fcd34d;
        }

        .btn-ghost {
          background: rgba(255,255,255,0.08);
          color: white;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.12);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 16px;
          text-align: center;
        }

        .stat-card .label {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.55);
          margin-bottom: 6px;
        }

        .stat-card .value {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .stat-card.amber .value { color: #fcd34d; }
        .stat-card.green .value { color: #4ade80; }
        .stat-card.blue .value { color: #60a5fa; }

        .filtros {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .filtro-btn {
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.2s;
        }
        .filtro-btn.active {
          background: #fbbf24;
          color: #000;
          border-color: #fbbf24;
        }

        .lista {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pedido-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 18px;
          transition: all 0.2s;
        }
        .pedido-card:hover {
          background: rgba(255,255,255,0.11);
        }

        .pedido-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
          gap: 12px;
        }

        .pedido-nombre {
          font-weight: 600;
          font-size: 1.05rem;
        }

        .pedido-tipo {
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          font-weight: 500;
          white-space: nowrap;
        }
        .pedido-tipo.comer {
          background: rgba(74, 222, 128, 0.15);
          color: #4ade80;
          border: 1px solid rgba(74, 222, 128, 0.3);
        }
        .pedido-tipo.recoger {
          background: rgba(96, 165, 250, 0.15);
          color: #60a5fa;
          border: 1px solid rgba(96, 165, 250, 0.3);
        }

        .pedido-meta {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .pedido-platos {
          font-size: 14px;
          color: rgba(255,255,255,0.85);
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .pedido-total {
          font-weight: 700;
          color: #fcd34d;
          font-size: 1.1rem;
        }

        .empty {
          text-align: center;
          padding: 48px 20px;
          color: rgba(255,255,255,0.4);
          font-size: 15px;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: rgba(255,255,255,0.5);
        }

        @media (max-width: 500px) {
          .stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="admin-page">
        <div className="admin-container">
          
          {/* Header */}
          <div className="header">
            <h1>⚓ Galeón <span>Admin</span></h1>
            <div className="header-actions">
              <button className="btn btn-primary" onClick={cargar}>
                {loading ? "Cargando..." : "Recargar"}
              </button>
              <a href="/" className="btn btn-ghost" style={{textDecoration: "none"}}>
                ← Web
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat-card amber">
              <div className="label">PEDIDOS HOY</div>
              <div className="value">{pedidosHoy.length}</div>
            </div>
            <div className="stat-card green">
              <div className="label">RESERVAS</div>
              <div className="value">{reservasHoy.length}</div>
            </div>
            <div className="stat-card blue">
              <div className="label">TAKE AWAY</div>
              <div className="value">{takeAwayHoy.length}</div>
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
            <div className="empty">
              No hay pedidos todavía
            </div>
          ) : (
            <div className="lista">
              {pedidosFiltrados.map((p: any, i: number) => {
                const esComer = p.tipo === "comer" || p.tipo === "COMER AQUÍ"
                return (
                  <div key={p.id || i} className="pedido-card">
                    <div className="pedido-header">
                      <div className="pedido-nombre">
                        {p.nombre || "Sin nombre"}
                      </div>
                      <span className={`pedido-tipo ${esComer ? "comer" : "recoger"}`}>
                        {esComer ? "🍽️ Comer aquí" : "🥡 Para llevar"}
                      </span>
                    </div>

                    <div className="pedido-meta">
                      {p.mesa && <>Mesa {p.mesa} · </>}
                      {p.personas && <>{p.personas} pers · </>}
                      {p.fecha && <>{p.fecha} </>}
                      {p.hora && <>{p.hora}</>}
                      {p.telefono && <> · {p.telefono}</>}
                    </div>

                    {p.items && p.items.length > 0 && (
                      <div className="pedido-platos">
                        {p.items.map((x: any) => x.n || x).join(", ")}
                      </div>
                    )}

                    {(p.total || p.total === 0) && (
                      <div className="pedido-total">
                        Total: €{typeof p.total === "number" ? p.total.toFixed(2) : p.total}
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
