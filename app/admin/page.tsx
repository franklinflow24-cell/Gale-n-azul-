"use client"
import { useState, useEffect } from 'react';

export default function Admin() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [reservas, setReservas] = useState<any[]>([]);

  const checkLogin = () => {
    if(user.toLowerCase().trim() === "galeon" && pass.trim() === "galeonvillaviciosa31"){
      setLogin(true);
      localStorage.setItem("galeon_admin", "true");
    } else {
      alert("Usuario o contraseña incorrecta");
    }
  }

  useEffect(() => {
    if(localStorage.getItem("galeon_admin") === "true") setLogin(true);
    // Aquí luego conectamos con pedidos reales
    setPedidos([]);
    setReservas([]);
  }, []);

  if(!login){
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a2540] p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <h1 className="text-2xl font-bold text-center mb-2 text-[#0a2540]">GALEÓN AZUL</h1>
          <p className="text-center text-gray-500 mb-6 text-sm">Panel Villaviciosa - Acceso Dueña</p>
          <input placeholder="Usuario" onChange={e=>setUser(e.target.value)} className="border border-gray-300 p-3 mb-3 w-full rounded-lg text-black" />
          <input placeholder="Contraseña" type="password" onChange={e=>setPass(e.target.value)} className="border border-gray-300 p-3 mb-4 w-full rounded-lg text-black" />
          <button onClick={checkLogin} className="bg-[#c5a059] hover:bg-[#b08d4f] text-white w-full py-3 rounded-lg font-bold">Entrar al Panel</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0a2540] text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">⚓ Galeón Azul - Panel</h1>
        <button onClick={()=>{localStorage.removeItem("galeon_admin"); setLogin(false)}} className="text-sm bg-white/10 px-3 py-1 rounded">Salir</button>
      </header>

      <div className="p-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-600">
            <p className="text-gray-500 text-xs">Pedidos Hoy</p>
            <p className="text-2xl font-bold">{pedidos.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-600">
            <p className="text-gray-500 text-xs">Reservas Hoy</p>
            <p className="text-2xl font-bold">{reservas.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-[#c5a059]">
            <p className="text-gray-500 text-xs">Estado</p>
            <p className="text-sm font-bold text-green-600">● Abierto</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-bold mb-3">📦 Últimos Pedidos</h2>
            {pedidos.length === 0 ? <p className="text-gray-400 text-sm">Aún no hay pedidos web. Cuando un cliente pida desde la web, aquí te suena.</p> : pedidos.map((p,i)=><div key={i} className="border-b py-2">{p.nombre}</div>)}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">Para probar: haz un pedido desde la web principal y aparecerá aquí al instante.</div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-bold mb-3">📅 Reservas</h2>
            {reservas.length === 0 ? <p className="text-gray-400 text-sm">No hay reservas hoy.</p> : reservas.map((r,i)=><div key={i} className="border-b py-2">{r.nombre}</div>)}
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">Aquí verás: Nombre, hora, nº personas y teléfono clickeable.</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mt-4">
          <h2 className="font-bold mb-3">🍽️ Editar Carta Rápido</h2>
          <p className="text-sm text-gray-500 mb-2">Próximamente: aquí la dueña podrá cambiar precios sin tocar código. Ej: Cachopo 25€ → 26€</p>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm">Gestionar Carta</button>
        </div>
      </div>
    </div>
  )
}
