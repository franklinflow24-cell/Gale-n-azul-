"use client"
import { useState } from "react"

const platos = [
  {n:"Arroz con pollo", p:350},
  {n:"Moro de guandules", p:400},
  {n:"Sancocho", p:500},
  {n:"Pescado frito", p:450},
]

export default function Home(){
  const [mesa,setMesa]=useState(1)
  const [personas,setPersonas]=useState(2)
  const [fecha,setFecha]=useState("")
  const [hora,setHora]=useState("13:00")
  const [nombre,setNombre]=useState("")
  const [telefono,setTelefono]=useState("")
  const [tipo,setTipo]=useState("comer")
  const [pedido,setPedido]=useState<any[]>([])
  const total = pedido.reduce((s,i)=>s+i.p,0)

  const reservar = async () => {
    if(!nombre || !fecha) return alert('Completa nombre y fecha')
    const telGaleon="18295435381"
    let txtPlatos = pedido.length ? `\n\nPlatos:\n${pedido.map(x=>`- ${x.n} (${x.p}€)`).join('\n')}\nTotal: ${total}€` : ''
    const servicio = tipo==='comer' ? `COMER AQUÍ - Mesa ${mesa} para ${personas} pers` : `PARA RECOGER para ${personas} pers`
    const msg=`Hola Galeón! 👋 Soy ${nombre} - Tel: ${telefono}\n${servicio}\nDía: ${fecha} a las ${hora}${txtPlatos}`

    // GUARDAR EN ADMIN PRIMERO
    await fetch("/api/pedidos", {
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ mesa, total: total+"€", items: pedido, personas, fecha, hora, nombre, telefono, tipo })
    });

    window.open(`https://wa.me/${telGaleon}?text=${encodeURIComponent(msg)}`,'_blank')
  }

  return(
    <div style={{padding:20, maxWidth:400, margin:"0 auto", fontFamily:"sans-serif"}}>
      <h1 style={{textAlign:"center"}}>🦐 Galeón Azul</h1>
      
      <label>Mesa: <input type="number" value={mesa} onChange={e=>setMesa(parseInt(e.target.value))} style={{width:60}} /></label><br/><br/>
      <label>Personas: <input type="number" value={personas} onChange={e=>setPersonas(parseInt(e.target.value))} style={{width:60}} /></label><br/><br/>
      
      <label>Tipo: 
        <select value={tipo} onChange={e=>setTipo(e.target.value)}>
          <option value="comer">Comer aquí</option>
          <option value="recoger">Para recoger</option>
        </select>
      </label><br/><br/>

      <label>Nombre: <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Tu nombre" style={{width:"100%"}} /></label><br/><br/>
      <label>Tel: <input value={telefono} onChange={e=>setTelefono(e.target.value)} placeholder="829..." style={{width:"100%"}} /></label><br/><br/>
      <label>Fecha: <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={{width:"100%"}} /></label><br/><br/>
      <label>Hora: <input type="time" value={hora} onChange={e=>setHora(e.target.value)} /></label><br/><br/>

      <h3>Menú</h3>
      {platos.map((p,i)=>(
        <div key={i} style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
          <span>{p.n} - {p.p}€</span>
          <button onClick={()=>setPedido([...pedido,p])}>+ Añadir</button>
        </div>
      ))}

      <p><b>Total: {total}€</b> - {pedido.length} platos</p>
      
      <button onClick={reservar} style={{width:"100%", padding:15, background:"green", color:"white", fontSize:18, borderRadius:10}}>Reservar por WhatsApp</button>
      <br/><br/>
      <a href="/admin">Ver admin</a>
    </div>
  )
}
