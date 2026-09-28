<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>GALEÓN - Villaviciosa</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:system-ui;background:#eaf4fb;color:#0a2a5a}
.top{background:linear-gradient(90deg,#a8d4f0,#0a3d7a);padding:12px 16px;display:flex;justify-content:space-between;color:#fff;position:sticky;top:0;z-index:9}
.hero{height:72vh;background:linear-gradient(to bottom,rgba(0,0,0,0) 30%,#0a3d7a 95%),url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200) center/cover;display:flex;align-items:end;justify-content:center;text-align:center;padding:0 20px 30px;color:#fff}
.btn{background:#5a0a1a;color:#fff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:900;display:inline-block;margin:6px;border:0;cursor:pointer}
.btn2{background:#fff;color:#0a3d7a}
.card{background:#fff;margin:14px;border-radius:20px;padding:18px;box-shadow:0 6px 16px rgba(10,61,122,.08)}
.mesa{display:inline-block;width:31%;margin:1%;padding:12px;border:2px solid #a8d4f0;border-radius:12px;text-align:center;cursor:pointer;font-weight:900}
.mesa.ocupada{background:#ddd;border-color:#bbb;color:#777}
.item{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px dashed #d9e6f5}
.admin{display:none;position:fixed;inset:0;background:#f5f7fb;z-index:99;overflow:auto;padding:16px}
</style>
</head>
<body>
<div class="top"><b>⚓ GALEÓN</b><span style="background:#fff;color:#0a3d7a;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:900">VILLAVICIOSA</span><a href="#" onclick="openAdmin()" style="color:#fff;font-size:12px">Staff</a></div>

<div class="hero"><div>
<h1 style="font-family:Georgia,serif;font-size:64px;margin:0;line-height:.9">Galeón<br><span style="font-size:16px;letter-spacing:10px">SIDRERÍA</span></h1>
<a class="btn" href="#reservar">RESERVAR MESA</a><a class="btn btn2" href="#carta">VER CARTA</a>
<p style="font-size:12px;margin-top:10px">Lun a Dom - Cerrado Jueves • 15 mesas • Pago en Caja: Tarjeta/Efectivo</p>
</div></div>

<div class="card" id="reservar">
<h2 style="margin:0;color:#5a0a1a">Reservar Mesa (15 mesas)</h2>
<p style="font-size:13px;color:#5a6f8a">Toca una mesa libre. Gris = ocupada.</p>
<div id="mesas"></div>
<div style="margin-top:12px;display:flex;gap:8px"><input id="nombre" placeholder="Tu nombre" style="flex:1;padding:12px;border-radius:10px;border:1px solid #cbd"><input id="hora" type="time" style="padding:12px;border-radius:10px;border:1px solid #cbd"></div>
<button class="btn" style="width:100%;margin-top:10px" onclick="reservar()">Confirmar por WhatsApp</button>
</div>

<div class="card" id="carta">
<h2 style="margin:0;color:#5a0a1a">Carta</h2>
<div class="item"><span>Tabla quesos asturianos</span><b>14€</b></div>
<div class="item"><span>Chorizo a la sidra</span><b>9€</b></div>
<div class="item"><span>Croquetas pixín</span><b>11€</b></div>
<div class="item"><span>Pixín plancha</span><b>19€</b></div>
<div class="item"><span>Fabada asturiana</span><b>13€</b></div>
<div class="item"><span>Cachopo ternera</span><b>22€</b></div>
<div class="item"><span>Arroz con leche quemado</span><b>6€</b></div>
<p style="font-size:12px;color:#0a3d7a;font-weight:900">Total: Pagar en Caja - Tarjeta o Efectivo</p>
</div>

<div id="admin" class="admin">
<h2>Panel Galeón (clave: 1234)</h2>
<div id="login"><input id="clave" placeholder="Clave" style="padding:10px;border-radius:8px;border:1px solid #cbd"><button class="btn" onclick="login()">Entrar</button><button class="btn btn2" onclick="closeAdmin()">Cerrar</button></div>
<div id="panel" style="display:none">
<h3>Reservas de Hoy</h3><div id="listaReservas"></div>
<button class="btn btn2" onclick="closeAdmin()">Salir</button>
</div>
</div>

<script>
let mesaSel=null;
let reservas=JSON.parse(localStorage.getItem('galeon_res')||'[]');
function renderMesas(){
let h='';for(let i=1;i<=15;i++){
let ocup=reservas.find(r=>r.mesa==i);
h+=`<div class="mesa ${ocup?'ocupada':''}" onclick="selMesa(${i})">${ocup?'🔒':''} Mesa ${i}<br><span style="font-size:11px;font-weight:400">${i<=5?'2 pers':i<=10?'4 pers':'6 pers'}</span></div>`;
}document.getElementById('mesas').innerHTML=h;
}
function selMesa(i){
if(reservas.find(r=>r.mesa==i)){alert('Mesa ocupada');return}
mesaSel=i;document.querySelectorAll('.mesa').forEach((e,idx)=>{e.style.borderColor=idx+1==i?'#5a0a1a':'#a8d4f0';});
}
function reservar(){
let n=document.getElementById('nombre').value;let hr=document.getElementById('hora').value;
if(!mesaSel||!n||!hr){alert('Elige mesa, nombre y hora');return}
let r={mesa:mesaSel,nombre:n,hora:hr,fecha:new Date().toLocaleString()};
reservas.push(r);localStorage.setItem('galeon_res',JSON.stringify(reservas));
renderMesas();renderLista();
let msg=`Hola Galeón, quiero Mesa ${mesaSel} para ${n} a las ${hr}. Cerrado Jueves entendido. Pago en caja.`;
window.open(`https://wa.me/34600000000?text=${encodeURIComponent(msg)}`,'_blank');
}
function openAdmin(){document.getElementById('admin').style.display='block';renderLista()}
function closeAdmin(){document.getElementById('admin').style.display='none'}
function login(){if(document.getElementById('clave').value=='1234'){document.getElementById('login').style.display='none';document.getElementById('panel').style.display='block';}else alert('Clave mala')}
function renderLista(){renderMesas();let h=reservas.length?reservas.map(r=>`<div class="card" style="margin:6px 0;padding:10px"><b>Mesa ${r.mesa}</b> - ${r.nombre} - ${r.hora}<br><span style="font-size:11px">${r.fecha}</span></div>`).join(''):'<p>No hay reservas aún</p>';document.getElementById('listaReservas').innerHTML=h;}
renderMesas();
</script>
<footer style="text-align:center;padding:20px;font-size:12px;color:#7a8faa">© Galeón Villaviciosa • Pago en Caja • Staff con clave 1234</footer>
</body>
</html>
