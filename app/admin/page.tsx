"use client"
import { useState } from 'react';

export default function Admin() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const checkLogin = () => {
    if(user === "galeon" && pass === "galeonvillaviciosa31"){
      setLogin(true);
    } else {
      alert("Usuario o contraseña incorrecta");
    }
  }

  if(!login){
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-6">Panel Galeón Azul - Villaviciosa</h1>
        <input placeholder="Usuario" onChange={e=>setUser(e.target.value)} className="border p-2 mb-2 w-64 rounded" />
        <input placeholder="Contraseña" type="password" onChange={e=>setPass(e.target.value)} className="border p-2 mb-4 w-64 rounded" />
        <button onClick={checkLogin} className="bg-blue-600 text-white px-6 py-2 rounded">Entrar</button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Bienvenido - Panel de Control</h1>
      <p className="mt-4">Aquí verás los pedidos y reservas.</p>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="border p-4 rounded">Pedidos Hoy: 0</div>
        <div className="border p-4 rounded">Reservas Hoy: 0</div>
        <div className="border p-4 rounded">Carta: Editar</div>
      </div>
    </div>
  )
}
