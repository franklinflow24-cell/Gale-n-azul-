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
 const [fecha,setFecha]=useState('')
 const [mesa,setMesa]=useState('')
 const [personas,setPersonas]=useState('2')

 const toggle=(name:string,price:number)=>{
  setSel(s=>{const n={...s}; if(n[name]) delete n[name]; else n[name]=price; return n})
 }
 const total=Object.values(sel).reduce((a,b)=>a+b,0)
 const reservar=()=>{
  const lista=Object.keys(sel).map(k=>`• ${k} - ${sel[k].toFixed(2)}€`).join('\n')
  const msg=`⚓ RESERVA GALEÓN AZUL\n\nNombre: ${nombre}\nFecha: ${fecha}\nMesa: ${mesa}\nPersonas: ${personas}\n\nPedido:\n${lista}\n\nTOTAL: ${total.toFixed(2)}€`
  window.open(`https://wa.me/18295435381?text=${encodeURIComponent(msg)}`,'_blank')
 }
 return(
  <div style={{minHeight:'100vh',background:'linear-gradient(rgba(0,40,25,.85), rgba(0,40,25,.85)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop)',backgroundSize:'cover',backgroundAttachment:'fixed',color:'#f5d98b',fontFamily:'Georgia, serif',padding:20}}>
   <div style={{maxWidth:650,margin:'0 auto'}}>
    <div style={{textAlign:'center',padding:'40px 0 20px'}}>
     <div style={{fontSize:50}}>⚓</div>
     <h1 style={{fontSize:42,margin:'5px 0',color:'#d4af37',textShadow:'2px 2px 4px #000',letterSpacing:2}}>GALEÓN AZUL</h1>
     <p style={{color:'#f5d98b',fontStyle:'italic',letterSpacing:1}}>Cocina Asturiana & Marisco · Frente al Mar</p>
    </div>
    <div style={{background:'rgba(0,20,12,.88)',border:'1px solid #d4af37',borderRadius:14,padding:20,marginBottom:20,boxShadow:'0 10px 30px rgba(0,0,0,.4)'}}>
     <h3 style={{color:'#d4af37',textAlign:'center',marginTop:0}}>TU RESERVA</h3>
     <input placeholder="Nombre completo" value={nombre} onChange={e=>setNombre(e.target.value)} style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #d4af37',background:'#0b3b26',color:'#f5d98b',marginBottom:10}}/>
     <div style={{display:'flex',gap:10,marginBottom:10}}>
      <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)} style={{flex:1,padding:12,borderRadius:8,border:'1px solid #d4af37',background:'#0b3b26',color:'#f5d98b'}}/>
      <select value={personas} onChange={e=>setPersonas(e.target.value)} style={{width:110,padding:12,borderRadius:8,border:'1px solid #d4af37',background:'#0b3b26',color:'#f5d98b'}}>
       {[1,2,3,4,5,6,7,8,9,10,12,15,20].map(n=><option key={n} value={n}>{n} pers.</option>)}
      </select>
     </div>
     <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
      {Array.from({length:15},(_,i)=>i+1).map(m=>(
       <button key={m} onClick={()=>setMesa(m.toString())} style={{flex:'1 0 18%',padding:'10px 0',borderRadius:8,border:'1px solid #d4af37',background:mesa===m.toString()?'#d4af37':'transparent',color:mesa===m.toString()?'#0b3b26':'#f5d98b',fontWeight:'bold'}}>Mesa {m}</button>
      ))}
     </div>
    </div>
    {MENU.map(g=>(
     <div key={g.cat} style={{background:'rgba(0,20,12,.88)',border:'1px solid #d4af37',borderRadius:14,padding:15,marginBottom:18}}>
      <h3 style={{color:'#d4af37',textAlign:'center',borderBottom:'1px solid #d4af37',paddingBottom:8,marginTop:0,letterSpacing:1}}>{g.cat}</h3>
      {g.items.map(([name,price]:any)=>(
       <div key={name} onClick={()=>toggle(name,price)} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'11px 8px',borderBottom:'1px dotted #444',cursor:'pointer',background:sel[name]?'rgba(212,175,55,.18)':'transparent',borderRadius:6}}>
        <span style={{flex:1,paddingRight:10,color:sel[name]?'#fff':'#f5d98b'}}>{sel[name]?'✓ ':''}{name}</span>
        <b style={{color:'#d4af37'}}>{price.toFixed(2)} €</b>
       </div>
      ))}
     </div>
    ))}
    <div style={{position:'sticky',bottom:12,background:'#0b3b26',border:'1px solid #d4af37',padding:14,borderRadius:14,boxShadow:'0 5px 25px rgba(0,0,0,.5)'}}>
     <div style={{display:'flex',justifyContent:'space-between',color:'#f5d98b',marginBottom:10}}><span>{Object.keys(sel).length} platos · Mesa {mesa || '-'} · {personas} pers.</span><b style={{color:'#d4af37'}}>Total: {total.toFixed(2)} €</b></div>
     <button onClick={reservar} style={{width:'100%',padding:15,background:'#d4af37',color:'#0b3b26',border:'none',borderRadius:10,fontSize:17,fontWeight:'bold'}}>Reservar por WhatsApp</button>
    </div>
   </div>
  </div>
 )
}
