'use client'
import {useState} from 'react'

const MENU = [
 {cat:'Para Picar', items:[
  ['Calamares frescos',21],['Chipirones fritos',17],['Chipirones afogaos',18],
  ['Fritos de merluza',16],['Fritos de bacalao',18],['Fritos de pixín',20],
  ['Gambas al ajillo',18],['Zamburiñas',20],['Llámpares a la sidra',13],
  ['Mejillones vinagreta',12],['Mejillones en salsa verde',13],['Pulpo a la plancha',23],
  ['Croquetas caseras de jamón',13],['Patatas 3 salsas',11],['Pollo al ajillo',11],
  ['Paté de cabracho',13],['Tabla de embutidos',18],['Tabla de quesos Asturianos',16],
  ['Cecina con queso de cabra y cebolla caramelizada',18],['Cazuela de pulpo y gambas',19]
 ]},
 {cat:'De Cuchara', items:[
  ['Fabada asturiana',14],['Sopa de marisco',10],['Calamares en su tinta con arroz ó patatas',20]
 ]},
 {cat:'Arroces', items:[
  ['Arroz negro con ali-oli (mín. 2 raciones)',22],['Paella de marisco (mín. 2 raciones)',24],
  ['Ración de pan',1.30],['Ración de pan sin gluten',2]
 ]},
 {cat:'Ensaladas', items:[
  ['Ensalada sencilla (LTC)',7],['Ensalada mixta',13],
  ['Ensalada Galeón (pixín, gulas, gambas y champiñones)',20],
  ['Ensalada de cecina con queso de cabra y cebolla caramelizada',18]
 ]},
 {cat:'Carnes', items:[
  ['Cachopo de jamón y queso',22],['Escalopines al cabrales',16],['Filete con patatas',15],
  ['Tacos de solomillo de cerdo al ajillo',18],['Picapollo (Dominicano)',18],
  ['Entrecot con patatas',21],['Solomillo de ternera',22]
 ]},
 {cat:'Postres', items:[
  ['Tarta de queso',6],['Tarta de la abuela',6],['Arroz con leche',6],['Flan de huevo',4],['Queso cabrales',8]
 ]},
 {cat:'Bodega - Tintos', items:[
  ['Cosechero',8],['Ramón Bilbao Rioja',18],['Lan Crianza',16],['Señorío de Nava Ribera del Duero',16]
 ]},
 {cat:'Bodega - Rosados', items:[
  ['Peñascal Aguja',12],['Faustino Rivero Navarra',11],['Valjunco Prieto Picudo',13]
 ]},
 {cat:'Bodega - Blancos', items:[
  ['Camino Do Rey Albariño',16],['Aido da Fonte Albariño',16],['Valdeorras Godello',14],
  ['Caldirola Moscato',15],['Navesur Rueda',14]
 ]},
]

export default function Home(){
 const [sel,setSel]=useState<Record<string,number>>({})
 const [nombre,setNombre]=useState('')
 const [personas,setPersonas]=useState('2')
 const [fecha,setFecha]=useState('')

 const toggle=(name:string,price:number)=>{
  setSel(s=>{const n={...s}; if(n[name]) delete n[name]; else n[name]=price; return n})
 }
 const total=Object.values(sel).reduce((a,b)=>a+b,0)
 const reservar=()=>{
  const lista=Object.keys(sel).map(k=>`• ${k} - ${sel[k].toFixed(2)}€`).join('\n')
  const msg=`Hola Galeón Azul, quiero reservar:\nNombre: ${nombre}\nPersonas: ${personas}\nFecha: ${fecha}\n\nPedido:\n${lista}\n\nTOTAL: ${total.toFixed(2)}€`
  window.open(`https://wa.me/18295435381?text=${encodeURIComponent(msg)}`,'_blank')
 }
 return(
  <div style={{maxWidth:600,margin:'0 auto',padding:20,fontFamily:'system-ui'}}>
   <h1 style={{textAlign:'center',fontSize:28,margin:0}}>⛵ Galeón Azul</h1>
   <p style={{textAlign:'center',color:'#666'}}>Selecciona lo que quieres y resérvalo por WhatsApp</p>
   <input placeholder="Tu nombre" value={nombre} onChange={e=>setNombre(e.target.value)} style={{width:'100%',padding:12,borderRadius:10,border:'1px solid #ddd',marginBottom:10}}/>
   <div style={{display:'flex',gap:10,marginBottom:20}}>
    <input placeholder="Fecha" type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={{flex:1,padding:12,borderRadius:10,border:'1px solid #ddd'}}/>
    <input placeholder="Personas" type="number" value={personas} onChange={e=>setPersonas(e.target.value)} style={{width:110,padding:12,borderRadius:10,border:'1px solid #ddd'}}/>
   </div>
   {MENU.map(g=>(
    <div key={g.cat} style={{marginBottom:20}}>
     <h3 style={{background:'#0b3b66',color:'white',padding:'10px 14px',borderRadius:10,margin:'0 0 8px'}}>{g.cat}</h3>
     {g.items.map(([name,price]:any)=>(
      <div key={name} onClick={()=>toggle(name,price)} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 10px',borderBottom:'1px solid #eee',cursor:'pointer',background:sel[name]?'#e6f0ff':'white',borderRadius:8}}>
       <span style={{flex:1,paddingRight:10}}>{sel[name]?'✅ ':''}{name}</span>
       <b>{price.toFixed(2)} €</b>
      </div>
     ))}
    </div>
   ))}
   <div style={{position:'sticky',bottom:10,background:'white',padding:14,borderRadius:14,boxShadow:'0 4px 20px rgba(0,0,0,.15)'}}>
    <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}><b>Seleccionado: {Object.keys(sel).length} platos</b><b>Total: {total.toFixed(2)} €</b></div>
    <button onClick={reservar} style={{width:'100%',padding:15,background:'#25D366',color:'white',border:'none',borderRadius:12,fontSize:16,fontWeight:'bold'}}>Reservar por WhatsApp</button>
   </div>
  </div>
 )
}
