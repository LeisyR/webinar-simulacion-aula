const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const icons = require("react-icons/fa");
const QRCode = require("qrcode");

// Número de WhatsApp para el código QR (formato internacional, sin + ni espacios)
const WA_NUMBER = "573017903086";            // WhatsApp Simuladores de Negocios Colombia
const WA_LINK = "https://wa.me/" + WA_NUMBER;

async function icon(name, color, sz=256) {
  const svg = RDS.renderToStaticMarkup(React.createElement(icons[name], {color, size:String(sz)}));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// Genera un degradado lineal (estilo businessglobal-simuladores) como PNG vía SVG+sharp
async function grad(c1, c2, angle=135, w=1280, h=720) {
  const a = angle*Math.PI/180;
  const x2 = Math.round((Math.cos(a)*0.5+0.5)*100), y2 = Math.round((Math.sin(a)*0.5+0.5)*100);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><defs><linearGradient id='g' x1='0%' y1='0%' x2='${x2}%' y2='${y2}%'><stop offset='0%' stop-color='#${c1}'/><stop offset='100%' stop-color='#${c2}'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/></svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ===== Paleta corporativa businessglobal-simuladores (CompanyGame) =====
const D="0A4F80",   // azul profundo (fondos oscuros, títulos)
      T="0E9AA8",   // teal-cyan (acento principal)
      W="FFFFFF",
      L="EAF3FB",   // azul muy claro (cards, filas alternadas)
      M="575476",   // gris-morado (texto secundario)
      O="2E9FD9";   // azul brillante (badges/acentos)
const CY="0CAAE3", BL="0C71B8", BL2="2E9FD9", PU="575476", SLATE="2C3E50";
// Gradientes de fondo (se asignan en build())
let G_D, G_T;
function applyBg(s,bg){
  if(bg===D){ s.background={color:D}; s.addImage({data:G_D,x:0,y:0,w:10,h:5.63}); }
  else if(bg===T){ s.background={color:T}; s.addImage({data:G_T,x:0,y:0,w:10,h:5.63}); }
  else { s.background={color:bg}; }
}
const sh=()=>({type:"outer",color:"0A4F80",blur:12,offset:4,angle:90,opacity:0.16});
const card=(s,x,y,w,h,fill,rr=0.12)=>s.addShape(s.__pres||pres.shapes.ROUNDED_RECTANGLE,{x,y,w,h,fill:{color:fill},rectRadius:rr,shadow:sh()});

async function build(){
const pres = new pptxgen();
pres.layout="LAYOUT_16x9"; pres.title="Webinar: Simulación Gerencial en el Aula";
const RR=pres.shapes.ROUNDED_RECTANGLE, OV=pres.shapes.OVAL;
const iCheck=await icon("FaCheckCircle",T), iCheckW=await icon("FaCheckCircle",W),
iRocket=await icon("FaRocket",W), iQ=await icon("FaQuestionCircle",W),
iUsers=await icon("FaUsers",W), iLaptop=await icon("FaLaptop",D),
iCogs=await icon("FaCogs",D), iGrad=await icon("FaGraduationCap",D),
iChart=await icon("FaChartLine",W), iStar=await icon("FaStar","FFD700"),
iShield=await icon("FaShieldAlt",T), iCalendar=await icon("FaCalendarAlt",W),
iBook=await icon("FaBook",D), iTarget=await icon("FaBullseye",W),
iMedal=await icon("FaMedal",T), iComment=await icon("FaCommentDots",T),
iLight=await icon("FaLightbulb","FFD700"), iPuzzle=await icon("FaPuzzlePiece",W),
iHeart=await icon("FaHeart","FF6B6B"), iChalkboard=await icon("FaChalkboardTeacher",D),
iHandshake=await icon("FaHandshake",W), iTrophy=await icon("FaTrophy","FFD700");

// Degradados de fondo estilo businessglobal-simuladores
G_D = await grad("0A5E96","083E63",135);  // azul profundo (slides oscuras)
G_T = await grad("0E9AA8","0B8294",135);  // teal-cyan (slides de acento)

// Código QR de WhatsApp
const qr = await QRCode.toDataURL(WA_LINK, { margin:1, width:600, color:{dark:"#0a5183", light:"#ffffff"} });

function addT(s,txt,o){s.addText(txt,{fontFace:"Montserrat",...o});}
function title(s,txt,sub,bg=D){applyBg(s,bg);addT(s,txt,{x:0.7,y:0.3,w:8.6,h:0.7,fontSize:28,color:bg===D||bg===T?W:D,bold:true,margin:0});if(sub)addT(s,sub,{x:0.7,y:1,w:8.6,h:0.4,fontSize:14,color:M});}
function wTitle(s,txt,sub){title(s,txt,sub,W);}
function bullets(s,items,x=0.9,y=1.5,w=8.2,sz=14,clr=D){s.addText(items.map((t,i)=>({text:t,options:{bullet:true,breakLine:i<items.length-1,fontSize:sz,color:clr}})),{x,y,w,h:4,fontFace:"Montserrat",valign:"top"});}

// ===== 1. TITLE =====
let s=pres.addSlide(); applyBg(s,D);
s.addShape(RR,{x:0.8,y:0.6,w:8.4,h:4.4,fill:{color:T,transparency:15},rectRadius:0.2});
addT(s,"Simulación gerencial\nen el aula",{x:1,y:0.8,w:8,h:2.2,fontSize:40,color:W,bold:true});
addT(s,"Del caso de papel al simulador digital",{x:1,y:2.9,w:8,h:0.6,fontSize:20,color:T,bold:true});
addT(s,"Webinar gratuito · Jueves 16 de julio, 2026 · 10:00 AM (hora Colombia)",{x:1,y:3.6,w:8,h:0.5,fontSize:14,color:"CCCCCC"});
addT(s,"Presenta: Alan González Curiel",{x:1,y:4.1,w:8,h:0.4,fontSize:15,color:W,bold:true});
addT(s,"Simuladores de Negocios Colombia",{x:1,y:4.5,w:8,h:0.4,fontSize:13,color:"AAC4DA"});
s.addNotes("BIENVENIDA (0:00-0:30)\n\n\"Buenos días. Gracias por acompañarnos. Soy [nombre] de [empresa]. Hoy vamos a ver cómo llevar la simulación gerencial al siguiente nivel en sus programas de Administración. Al final hay demo en vivo y una propuesta de piloto gratuito.\"\n\n\"Pueden hacer preguntas en el chat en cualquier momento.\"");

// ===== 2. AGENDA =====
s=pres.addSlide(); s.background={color:W};
addT(s,"Agenda",{x:0.7,y:0.3,w:8,h:0.7,fontSize:36,color:D,bold:true,margin:0});
const ag=[["01","El reto: teoría vs práctica en Administración"],["02","¿Qué exige CNA sobre aprendizaje activo?"],["03","Qué es un simulador de negocios y cómo funciona"],["04","Demo en vivo: CompanyGame (15 min)"],["05","Nuestros 5 simuladores: cuál para cada asignatura"],["06","Implementación paso a paso: timeline de un semestre"],["07","Resultados reales y casos de éxito"],["08","Alineación con acreditación CNA"],["09","Piloto gratuito y modelos de precio"],["10","Preguntas y respuestas"]];
ag.forEach((a,i)=>{const y=1.2+i*0.42;
s.addShape(RR,{x:0.7,y,w:8.6,h:0.37,fill:{color:i%2===0?L:W},rectRadius:0.06});
addT(s,a[0],{x:0.9,y,w:0.5,h:0.37,fontSize:13,color:T,bold:true,valign:"middle"});
addT(s,a[1],{x:1.5,y,w:7.5,h:0.37,fontSize:13,color:D,valign:"middle"});});
s.addNotes("AGENDA (0:30-1:00)\n\n\"Miren todo lo que vamos a cubrir: arrancamos con el problema (por qué la teoría sola no alcanza), luego vemos qué dice el CNA, qué es un simulador, les hago demo en vivo, revisamos los 5 simuladores que tenemos, cómo implementarlo paso a paso, resultados reales con casos, la alineación con acreditación, y cerramos con el piloto gratuito.\"\n\n\"Es un recorrido completo. Vamos.\"");

// ===== 3. ABOUT US =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"¿Quiénes somos?");
s.addShape(RR,{x:0.7,y:1.3,w:4,h:3.5,fill:{color:L},rectRadius:0.12,shadow:sh()});
addT(s,"Nuestra misión",{x:0.9,y:1.5,w:3.6,h:0.4,fontSize:16,color:D,bold:true});
addT(s,"Ayudar a las facultades de Administración de Empresas en Colombia a cerrar la brecha entre teoría y práctica, integrando simuladores de negocios en sus asignaturas.",{x:0.9,y:2,w:3.6,h:2,fontSize:12,color:M});
s.addShape(RR,{x:5.1,y:1.3,w:4.2,h:3.5,fill:{color:D},rectRadius:0.12,shadow:sh()});
addT(s,"Nuestros números",{x:5.3,y:1.5,w:3.8,h:0.4,fontSize:16,color:T,bold:true});
const nums=[["5","simuladores especializados"],["30+","países donde se usan"],["162","facultades en ASCOLFA (mercado)"],["100%","soporte en español"]];
nums.forEach((n,i)=>{const y=2.1+i*0.65;
addT(s,n[0],{x:5.5,y,w:1.2,h:0.5,fontSize:24,color:T,bold:true,valign:"middle"});
addT(s,n[1],{x:6.7,y,w:2.3,h:0.5,fontSize:12,color:W,valign:"middle"});});
s.addNotes("QUIÉNES SOMOS (1:00-2:00)\n\n\"Somos distribuidores autorizados de simuladores de negocios para universidades en Colombia. Tenemos 5 simuladores especializados que se usan en más de 30 países. ASCOLFA, la Asociación Colombiana de Facultades de Administración, agrupa 162 facultades — ese es nuestro mercado.\"\n\n\"Nuestro diferencial: estamos en Colombia, hablamos su idioma, y damos soporte local.\"");

// ===== 4. BIG STAT =====
s=pres.addSlide(); applyBg(s,D);
addT(s,"92%",{x:1,y:0.5,w:8,h:2,fontSize:96,color:T,bold:true,align:"center",valign:"middle"});
addT(s,"de los egresados de Administración de Empresas dicen que\nnunca tomaron una decisión gerencial real antes de graduarse",{x:1,y:2.5,w:8,h:1,fontSize:20,color:W,align:"center"});
s.addShape(RR,{x:2,y:3.8,w:6,h:0.8,fill:{color:T,transparency:20},rectRadius:0.1});
addT(s,"El estudiante analiza lo que OTROS hicieron.\nPero nunca decide, nunca arriesga, nunca falla.",{x:2,y:3.8,w:6,h:0.8,fontSize:14,color:W,align:"center",italic:true,valign:"middle"});
s.addNotes("EL PROBLEMA (2:00-3:30)\n\n\"Piensen en esto: la gran mayoría de sus egresados se gradúan sin haber tomado una sola decisión gerencial real.\"\n\n\"¿Por qué? Porque el aula tradicional está diseñada para ANALIZAR, no para DECIDIR. Leemos casos, debatimos, presentamos... pero el estudiante nunca vive la presión de tomar una decisión con consecuencias.\"\n\n\"Médicos practican con pacientes simulados antes de tocar a un paciente real. Pilotos de avión pasan cientos de horas en simulador. ¿Y los futuros gerentes de Colombia?\"");

// ===== 5. COMPARISON =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"El aula de hoy vs. el aula con simulación");
s.addShape(RR,{x:0.7,y:1.3,w:4.1,h:3.8,fill:{color:L},rectRadius:0.12,shadow:sh()});
addT(s,"Método tradicional",{x:0.7,y:1.4,w:4.1,h:0.5,fontSize:16,color:M,bold:true,align:"center"});
s.addText([{text:"Leer casos escritos hace 10-20 años",options:{bullet:true,breakLine:true,fontSize:13}},{text:"Analizar decisiones de OTROS (Apple, Netflix, Zara)",options:{bullet:true,breakLine:true,fontSize:13}},{text:"Debate y presentación en clase",options:{bullet:true,breakLine:true,fontSize:13}},{text:"Examen teórico de conocimientos",options:{bullet:true,breakLine:true,fontSize:13}},{text:"Sin consecuencias reales para el estudiante",options:{bullet:true,breakLine:true,fontSize:13}},{text:"Difícil medir competencias gerenciales",options:{bullet:true,fontSize:13}}],{x:1,y:2.1,w:3.5,h:2.8,fontFace:"Montserrat",color:M,valign:"top"});
s.addShape(RR,{x:5.2,y:1.3,w:4.1,h:3.8,fill:{color:D},rectRadius:0.12,shadow:sh()});
addT(s,"Con simulador",{x:5.2,y:1.4,w:4.1,h:0.5,fontSize:16,color:T,bold:true,align:"center"});
s.addText([{text:"Dirigir TU propia empresa virtual",options:{bullet:true,breakLine:true,fontSize:13,color:W}},{text:"Tomar TUS decisiones con datos reales",options:{bullet:true,breakLine:true,fontSize:13,color:W}},{text:"Competir contra tus compañeros",options:{bullet:true,breakLine:true,fontSize:13,color:W}},{text:"Resultados inmediatos cada ronda",options:{bullet:true,breakLine:true,fontSize:13,color:W}},{text:"Consecuencias reales (virtuales) de cada error",options:{bullet:true,breakLine:true,fontSize:13,color:W}},{text:"Dashboard con métricas de aprendizaje",options:{bullet:true,fontSize:13,color:W}}],{x:5.5,y:2.1,w:3.5,h:2.8,fontFace:"Montserrat",valign:"top"});
s.addNotes("COMPARACIÓN (3:30-5:00)\n\n\"Miren las dos columnas. A la izquierda, lo que hacemos hoy en la mayoría de programas: casos escritos (muchos de hace 20 años, de empresas gringas), debate, examen. A la derecha, con simulador: el estudiante ES el gerente.\"\n\n\"No digo que los casos sean malos. Son excelentes. Pero combinados con un simulador, el aprendizaje se multiplica. Primero enseñas la teoría, luego el estudiante la aplica.\"\n\n\"La pregunta no es caso O simulador. Es caso Y simulador.\"");

// ===== 6. CNA REQUIREMENT =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"¿Qué exige el CNA sobre aprendizaje activo?");
s.addShape(RR,{x:0.7,y:1.3,w:8.6,h:1.2,fill:{color:"E7F5FC"},rectRadius:0.1});
s.addImage({data:iLight,x:0.9,y:1.5,w:0.5,h:0.5});
addT(s,"Condición de Calidad — CNA:",{x:1.6,y:1.4,w:7,h:0.4,fontSize:14,color:D,bold:true});
addT(s,"\"Estrategias de enseñanza y aprendizaje que promuevan la participación activa del estudiante en su proceso de formación y el desarrollo de competencias.\"",{x:1.6,y:1.8,w:7.2,h:0.6,fontSize:12,color:M,italic:true});
addT(s,"Esto significa que el CNA espera EVIDENCIA de:",{x:0.7,y:2.8,w:8,h:0.4,fontSize:15,color:D,bold:true,margin:0});
const cna=[["Aprendizaje activo documentado","No solo clases magistrales — actividades donde el estudiante participa, decide, produce."],["Competencias medibles","Resultados cuantificables: no solo notas de exámenes teóricos, sino evidencia de habilidades."],["Trabajo colaborativo","Equipos que trabajan juntos en problemas complejos, con roles definidos."],["Uso de tecnología educativa","Herramientas que potencien el proceso de enseñanza-aprendizaje."]];
cna.forEach((c,i)=>{const y=3.3+i*0.55;
s.addImage({data:iCheck,x:0.9,y:y+0.05,w:0.3,h:0.3});
addT(s,c[0],{x:1.4,y,w:2.8,h:0.4,fontSize:13,color:D,bold:true,valign:"middle",margin:0});
addT(s,c[1],{x:4.3,y,w:5,h:0.4,fontSize:11,color:M,valign:"middle",margin:0});});
s.addNotes("CNA (5:00-7:00)\n\n\"Si su programa está en proceso de acreditación o renovación de acreditación, esto les interesa mucho.\"\n\n\"El CNA exige estrategias de aprendizaje activo. No es opcional — es una condición de calidad. Y lo que quieren ver son cuatro cosas: aprendizaje activo documentado, competencias medibles, trabajo colaborativo y uso de tecnología educativa.\"\n\n\"¿Saben qué herramienta cumple las cuatro al mismo tiempo? Un simulador de negocios.\"\n\n\"El simulador genera datos automáticamente: dashboards, rankings, decisiones por equipo. Es evidencia lista para el informe de acreditación.\"");

// ===== 7. ACCREDITATION PRESSURE =====
s=pres.addSlide(); applyBg(s,T);
s.addImage({data:iShield,x:4.5,y:0.5,w:1,h:1});
addT(s,"La presión de la acreditación",{x:1,y:1.6,w:8,h:0.6,fontSize:28,color:W,bold:true,align:"center"});
addT(s,"Los pares evaluadores preguntan:",{x:1,y:2.3,w:8,h:0.4,fontSize:16,color:D,align:"center"});
const preguntas=["\"¿Cómo desarrollan competencias gerenciales en sus estudiantes?\"","\"¿Qué evidencia tienen de aprendizaje activo?\"","\"¿Qué herramientas tecnológicas usan en el aula?\"","\"¿Cómo miden el impacto de sus estrategias pedagógicas?\""];
preguntas.forEach((p,i)=>{const y=3+i*0.6;
s.addShape(RR,{x:1.5,y,w:7,h:0.5,fill:{color:W,transparency:15},rectRadius:0.08});
addT(s,p,{x:1.7,y,w:6.6,h:0.5,fontSize:13,color:W,italic:true,valign:"middle"});});
s.addNotes("PRESIÓN ACREDITACIÓN (7:00-8:00)\n\n\"Estas son las preguntas que hacen los pares evaluadores del CNA. Créanme, las he escuchado de directores de programa que nos han contactado justo por esto.\"\n\n\"Si su respuesta es 'damos clase magistral y ponemos exámenes', tienen un problema. Si su respuesta es 'usamos un simulador de negocios donde los estudiantes dirigen una empresa virtual por equipos y tenemos datos que lo demuestran', tienen una ventaja.\"\n\n\"El simulador no solo enseña mejor: genera la evidencia que el CNA necesita ver.\"");

// ===== 8. STUDENT QUOTE =====
s=pres.addSlide(); applyBg(s,D);
s.addImage({data:iComment,x:4.5,y:0.8,w:0.8,h:0.8});
addT(s,"\"Aprendí más en 8 rondas de simulación\nque en todo un semestre de clases magistrales.\nPor primera vez sentí que estaba\ntomando decisiones de verdad.\"",{x:1,y:1.8,w:8,h:2,fontSize:22,color:W,italic:true,align:"center"});
addT(s,"— Estudiante de Administración de Empresas, 8vo semestre",{x:1,y:4,w:8,h:0.5,fontSize:14,color:T,align:"center"});
s.addNotes("QUOTE ESTUDIANTE (8:00-8:30)\n\n\"Este es un comentario real de un estudiante que usó simulación en su curso de Estrategia. 'Aprendí más en 8 rondas que en todo un semestre.' Fuerte, ¿no?\"\n\n\"Y es que cuando el estudiante vive las consecuencias de sus decisiones — cuando 'quiebra' su empresa virtual por no controlar el flujo de caja — ese aprendizaje no se olvida nunca.\"");

// ===== 9. WHAT IS A SIMULATOR (3 cards) =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"¿Qué es un simulador de negocios?");
const cards9=[[iLaptop,"Plataforma 100% web","Los estudiantes acceden desde cualquier dispositivo. No hay que instalar nada. Solo navegador e internet."],[iCogs,"Empresa virtual realista","Cada equipo recibe una empresa con estados financieros reales: P&L, balance, flujo de caja, mercado."],[iGrad,"Aprendizaje medible","El profesor tiene un dashboard en tiempo real: ranking, decisiones, métricas de desempeño por equipo."]];
cards9.forEach((c,i)=>{const x=0.7+i*3.1;
s.addShape(RR,{x,y:1.3,w:2.8,h:3.8,fill:{color:L},rectRadius:0.12,shadow:sh()});
s.addShape(OV,{x:x+0.9,y:1.6,w:1,h:1,fill:{color:D}});
s.addImage({data:c[0],x:x+1.1,y:1.75,w:0.6,h:0.6});
addT(s,c[1],{x,y:2.8,w:2.8,h:0.5,fontSize:15,color:D,bold:true,align:"center"});
addT(s,c[2],{x:x+0.2,y:3.3,w:2.4,h:1.5,fontSize:11,color:M,align:"center"});});
s.addNotes("QUÉ ES (8:30-10:00)\n\n\"Un simulador de negocios tiene tres componentes: es una plataforma 100% web (no hay que instalar nada), simula una empresa con estados financieros reales, y le da al profesor un dashboard completo.\"\n\n\"Los estudiantes trabajan en equipos de 4-5 personas. Cada equipo dirige una empresa. Toman decisiones cada ronda: precio, producción, inversión en I+D, marketing, contratación. El simulador procesa TODAS las decisiones y genera resultados de mercado.\"\n\n\"Es competitivo: las decisiones de un equipo afectan a los demás. Si bajan el precio, te roban mercado. Si invierten en I+D, mejoran su producto. Exactamente como en la vida real.\"");

// ===== 10. HOW COMPANYGAME WORKS (4 steps) =====
s=pres.addSlide(); applyBg(s,T);
addT(s,"¿Cómo funciona CompanyGame?",{x:0.7,y:0.3,w:9,h:0.7,fontSize:28,color:W,bold:true,margin:0});
const steps=[[iUsers,"1","Forman equipos","4-5 estudiantes por empresa. Cada equipo recibe una empresa con su situación financiera."],[iCogs,"2","Toman decisiones","Cada ronda: precio, producción, I+D, marketing, RRHH. Todo en una interfaz web intuitiva."],[iChart,"3","Compiten","El simulador procesa decisiones de TODOS los equipos y genera resultados de mercado."],[iTrophy,"4","Presentan","Al final: cada equipo presenta su estrategia como un board meeting. El profesor evalúa."]];
steps.forEach((st,i)=>{const x=0.5+i*2.35;
s.addShape(RR,{x,y:1.3,w:2.15,h:3.8,fill:{color:W},rectRadius:0.12,shadow:sh()});
s.addShape(OV,{x:x+0.7,y:1.55,w:0.75,h:0.75,fill:{color:D}});
addT(s,st[1],{x:x+0.7,y:1.55,w:0.75,h:0.75,fontSize:24,color:W,bold:true,align:"center",valign:"middle"});
addT(s,st[2],{x,y:2.5,w:2.15,h:0.5,fontSize:14,color:D,bold:true,align:"center"});
addT(s,st[3],{x:x+0.1,y:3.1,w:1.95,h:1.7,fontSize:11,color:M,align:"center"});});
s.addNotes("CÓMO FUNCIONA (10:00-11:30)\n\n\"Cuatro pasos. Paso 1: los estudiantes forman equipos de 4-5 y reciben una empresa. Paso 2: cada ronda toman decisiones — precio, producción, inversión, marketing. Paso 3: el simulador procesa las decisiones de TODOS y genera resultados. Paso 4: al final del ciclo, cada equipo presenta su estrategia como si fuera un board meeting.\"\n\n\"Un ciclo típico: 6-10 rondas. Cada ronda puede ser una sesión de clase o una tarea entre sesiones.\"\n\n\"Ahora les voy a mostrar esto en vivo.\"");

// ===== 11. WHAT DECISIONS (detail) =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"¿Qué decisiones toman los estudiantes?");
const decs=[["Mercadeo","Precio de venta, inversión publicitaria, canales de distribución, posicionamiento."],["Producción","Volumen de producción, capacidad de planta, control de calidad, inventarios."],["Finanzas","Inversión en I+D, créditos bancarios, dividendos, flujo de caja."],["Recursos Humanos","Contratación, salarios, capacitación, bienestar laboral."],["Estrategia","Segmento de mercado, diferenciación vs costo, expansión, alianzas."]];
decs.forEach((d,i)=>{const y=1.3+i*0.82;
s.addShape(RR,{x:0.7,y,w:8.6,h:0.72,fill:{color:i%2===0?L:W},rectRadius:0.08});
addT(s,d[0],{x:0.9,y,w:2,h:0.72,fontSize:14,color:T,bold:true,valign:"middle"});
addT(s,d[1],{x:3,y,w:6,h:0.72,fontSize:12,color:D,valign:"middle"});});
s.addNotes("DECISIONES (11:30-12:30)\n\n\"Miren la profundidad: no es un jueguito. Los estudiantes toman decisiones en las 5 áreas funcionales de una empresa real: mercadeo, producción, finanzas, recursos humanos y estrategia.\"\n\n\"Cada decisión tiene consecuencias. Si produces demasiado y no vendes, te quedas con inventario y tu flujo de caja se deteriora. Si bajas precios sin controlar costos, ganas mercado pero pierdes margen.\"\n\n\"Eso es exactamente lo que vive un gerente real.\"");

// ===== 12. COMPETENCIES =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"Competencias que desarrolla el simulador");
const comp=[["Pensamiento estratégico","Analizar el entorno, definir una estrategia y ejecutarla con recursos limitados."],["Toma de decisiones bajo incertidumbre","Decidir con información incompleta y asumir consecuencias."],["Trabajo en equipo","Negociar, delegar y alinear al equipo en cada ronda de decisiones."],["Análisis financiero","Leer estados financieros, interpretar indicadores y gestionar flujo de caja."],["Pensamiento sistémico","Entender cómo una decisión en mercadeo afecta finanzas, producción y RRHH."],["Competitividad y adaptación","Reaccionar ante las acciones de la competencia y ajustar la estrategia."]];
comp.forEach((c,i)=>{const y=1.3+i*0.7;
s.addImage({data:iCheck,x:0.9,y:y+0.1,w:0.3,h:0.3});
addT(s,c[0],{x:1.4,y,w:2.8,h:0.4,fontSize:13,color:D,bold:true,valign:"middle",margin:0});
addT(s,c[1],{x:4.3,y,w:5,h:0.5,fontSize:11,color:M,valign:"middle",margin:0});});
s.addNotes("COMPETENCIAS (12:30-13:30)\n\n\"Estas son las competencias que desarrolla: pensamiento estratégico, toma de decisiones, trabajo en equipo, análisis financiero, pensamiento sistémico y competitividad.\"\n\n\"Todas son competencias que el CNA evalúa y que el mercado laboral exige. Y todas son difíciles de desarrollar con una clase magistral.\"\n\n\"El simulador no las desarrolla mágicamente: las PRACTICA. El estudiante las ejercita ronda tras ronda.\"");

// ===== 13. PROFESSOR DASHBOARD =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"Lo que ve el profesor: dashboard completo");
const dash=[["Ranking en tiempo real","Quién lidera, quién mejora, quién necesita ayuda. Visible para todos o solo para el profesor."],["Decisiones por equipo y ronda","Qué decidió cada equipo: material perfecto para la discusión post-ronda en clase."],["Estados financieros por empresa","P&L, balance y flujo de caja. Análisis financiero con datos reales del simulador."],["Métricas exportables","Datos listos para rúbricas, evaluación por competencias y reportes de acreditación CNA."],["Historial completo","Registro de todas las decisiones y resultados de todo el semestre. Evidencia documentada."]];
dash.forEach((d,i)=>{const y=1.3+i*0.82;
s.addShape(RR,{x:0.7,y,w:8.6,h:0.72,fill:{color:i%2===0?L:W},rectRadius:0.08});
s.addImage({data:iMedal,x:0.9,y:y+0.15,w:0.35,h:0.35});
addT(s,d[0],{x:1.5,y,w:2.5,h:0.72,fontSize:13,color:D,bold:true,valign:"middle"});
addT(s,d[1],{x:4.1,y,w:5,h:0.72,fontSize:11,color:M,valign:"middle"});});
s.addNotes("DASHBOARD PROFESOR (13:30-14:30)\n\n\"Esto es lo que ustedes como profesores ven. No es solo 'los estudiantes juegan': el profesor tiene control total.\"\n\n\"Ranking en tiempo real, las decisiones de cada equipo, estados financieros completos, métricas exportables para rúbricas y acreditación, y un historial completo del semestre.\"\n\n\"Cada ronda genera material para discusión en clase: '¿Por qué el equipo 3 bajó el precio?' '¿Cuál fue el impacto en su margen?' Eso es aprendizaje activo documentado.\"");

// ===== 14. PROFESSOR'S ROLE =====
s=pres.addSlide(); applyBg(s,D);
addT(s,"El rol del profesor con el simulador",{x:0.7,y:0.3,w:8.6,h:0.7,fontSize:28,color:W,bold:true,margin:0});
const roles=[["NO es un técnico de sistemas","El simulador es web, intuitivo. La capacitación dura 2 horas. No necesita saber de tecnología."],["ES un facilitador del aprendizaje","Su rol cambia: de exponer contenido a guiar la discusión post-ronda. '¿Por qué tomaron esa decisión?'"],["Diseña la integración curricular","Define cuántas rondas, en qué semanas, qué porcentaje de la evaluación. Nosotros lo apoyamos."],["Evalúa con datos reales","Usa el dashboard para calificar: desempeño financiero, calidad de las decisiones, trabajo en equipo."]];
roles.forEach((r,i)=>{const y=1.3+i*1;
s.addShape(RR,{x:1,y,w:8,h:0.85,fill:{color:T,transparency:20},rectRadius:0.1});
addT(s,r[0],{x:1.3,y,w:3.5,h:0.85,fontSize:14,color:T,bold:true,valign:"middle"});
addT(s,r[1],{x:4.8,y,w:4,h:0.85,fontSize:12,color:W,valign:"middle"});});
s.addNotes("ROL DEL PROFESOR (14:30-15:00)\n\n\"Una preocupación común: '¿Necesito ser experto en tecnología?' No. El simulador es web e intuitivo. La capacitación dura 2 horas.\"\n\n\"Su rol cambia de expositor a facilitador. En lugar de dar una clase magistral, usted guía la discusión: '¿Por qué tomaron esa decisión?' '¿Qué harían diferente?' Eso es pedagogía de alto nivel.\"\n\n\"Ahora sí, vamos a la demo.\"");

// ===== 15. DEMO TRANSITION =====
s=pres.addSlide(); applyBg(s,D);
s.addImage({data:iRocket,x:4.25,y:1,w:1.5,h:1.5});
addT(s,"Demo en vivo",{x:1,y:2.7,w:8,h:1,fontSize:44,color:W,bold:true,align:"center"});
addT(s,"Vamos a dirigir una empresa juntos — 15 minutos",{x:1,y:3.7,w:8,h:0.6,fontSize:18,color:T,align:"center"});
s.addNotes("DEMO (15:00-30:00)\n\n[COMPARTIR PANTALLA - ABRIR COMPANYGAME]\n\nGUIÓN DE LA DEMO:\n\n1. (2 min) Mostrar interfaz del estudiante: dashboard de la empresa, estados financieros iniciales.\n\n2. (3 min) Tomar decisiones en equipo con la audiencia: '¿Subimos o bajamos el precio? ¿Cuánto producimos? ¿Invertimos en I+D?' Hacer preguntas al chat.\n\n3. (2 min) Procesar la ronda y mostrar resultados: market share, ingresos, utilidad.\n\n4. (2 min) Mostrar ranking entre equipos: '¡Miren, el equipo 2 nos superó porque invirtió en marketing!'\n\n5. (3 min) Mostrar el dashboard del profesor: ranking, decisiones por equipo, estados financieros.\n\n6. (3 min) Mostrar un error a propósito: 'Vamos a producir el triple sin demanda... miren qué le pasa al inventario y al flujo de caja.' Eso genera el 'aha moment'.\n\nTIPS:\n- Haz preguntas al chat: genera engagement.\n- Enfatiza la competencia entre equipos.\n- Cierra mostrando el dashboard del profesor: 'Estos son los datos que usted usa para evaluar y para acreditación.'");

// ===== 16. OUR 5 SIMULATORS =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"Nuestros 5 simuladores: uno para cada necesidad");
const sims=[["CompanyGame","Gestión integral / Estrategia","Simulación Gerencial, Dirección Estratégica, Política Empresarial, Mercadeo, Finanzas",T],["SimVenture Evolution","Emprendimiento","Creación de Empresa, Plan de Negocio, Emprendimiento","0C71B8"],["SimVenture Validate","Innovación / Lean Startup","Modelos de Negocio, Design Thinking, Innovación, Semilleros","2E9FD9"],["SimProject","Gerencia de Proyectos","Formulación y Evaluación de Proyectos, Gerencia de Proyectos","0A5183"],["SimAgile","Metodologías Ágiles","Transformación Digital, Scrum, Agilidad","575476"]];
sims.forEach((si,i)=>{const y=1.2+i*0.85;
s.addShape(RR,{x:0.7,y,w:8.6,h:0.75,fill:{color:i%2===0?L:W},rectRadius:0.08});
s.addShape(RR,{x:0.9,y:y+0.15,w:0.45,h:0.45,fill:{color:si[3]},rectRadius:0.06});
addT(s,si[0],{x:1.6,y,w:2.2,h:0.75,fontSize:13,color:D,bold:true,valign:"middle"});
addT(s,si[1],{x:3.8,y,w:2,h:0.75,fontSize:12,color:si[3],bold:true,valign:"middle"});
addT(s,si[2],{x:5.9,y,w:3.2,h:0.75,fontSize:10,color:M,valign:"middle"});});
s.addNotes("5 SIMULADORES (30:00-32:00)\n\n\"Tenemos 5 simuladores, cada uno diseñado para asignaturas diferentes.\"\n\n\"CompanyGame es nuestro buque insignia: gestión integral de empresa, ideal para Simulación Gerencial y Estrategia. Es el que acaban de ver en la demo.\"\n\n\"SimVenture Evolution es para emprendimiento: el estudiante crea una empresa desde cero. Validate es para validar ideas con metodología Lean Startup.\"\n\n\"SimProject es para Gerencia de Proyectos: alcance, tiempo, costo y riesgos. Y SimAgile es para metodologías ágiles y Scrum.\"\n\n\"La clave: el simulador debe encajar en una asignatura EXISTENTE. No necesitan crear una nueva.\"");

// ===== 17. IMPLEMENTATION TIMELINE =====
s=pres.addSlide(); applyBg(s,T);
addT(s,"Timeline de implementación: un semestre completo",{x:0.7,y:0.3,w:9,h:0.7,fontSize:24,color:W,bold:true,margin:0});
const timeline=[["Semana 0","Capacitación al profesor (2h). Definir curso, rondas, evaluación."],["Semana 1","Clase introductoria: el profesor presenta el simulador a los estudiantes."],["Semana 2-3","Ronda de práctica (sin nota). Los estudiantes se familiarizan con la interfaz."],["Semana 4-11","Rondas 1-8 (con nota). Una ronda por semana. Discusión post-ronda en clase."],["Semana 12","Presentación final: cada equipo presenta su estrategia (board meeting)."],["Semana 13","Evaluación: el profesor califica con datos del dashboard + presentación."],["Semana 14-16","Resultados y retroalimentación. Recoger métricas para acreditación."]];
timeline.forEach((t,i)=>{const y=1.2+i*0.6;
s.addShape(RR,{x:0.7,y,w:8.6,h:0.5,fill:{color:W,transparency:15},rectRadius:0.06});
addT(s,t[0],{x:0.9,y,w:1.5,h:0.5,fontSize:12,color:W,bold:true,valign:"middle"});
addT(s,t[1],{x:2.5,y,w:6.6,h:0.5,fontSize:11,color:D,valign:"middle"});});
s.addNotes("TIMELINE (32:00-34:00)\n\n\"Así se ve un semestre completo con simulación. Semana 0: capacitamos al profesor. Semana 1: clase introductoria. Semanas 2-3: ronda de práctica sin nota para que se familiaricen. Semanas 4-11: las 8 rondas con nota, una por semana, con discusión post-ronda. Semana 12: presentación final tipo board meeting. Y semanas 13-16: evaluación y recolección de métricas.\"\n\n\"El esfuerzo del profesor es mínimo: 1 hora por semana para facilitar la discusión y revisar el dashboard. El simulador hace el trabajo pesado.\"");

// ===== 18. COMMON CONCERNS =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"Preocupaciones comunes (y respuestas)");
const concerns=[["\"No soy experto en tecnología\"","El simulador es web e intuitivo. La capacitación dura 2 horas. Si sabe usar correo electrónico, puede usar el simulador."],["\"No hay presupuesto\"","El piloto es 100% gratuito. Si funciona, los resultados justifican la inversión. Hay modelos desde $XX.000 por estudiante."],["\"Ya usamos otro simulador\"","Nuestros simuladores complementan lo que tienen. ¿Emprendimiento? SimVenture. ¿Proyectos? SimProject. Son nichos diferentes."],["\"Los estudiantes no van a tomarlo en serio\"","La competencia entre equipos genera motivación natural. El ranking es público. Los estudiantes se enganchan desde la primera ronda."],["\"No tengo tiempo para cambiar mi curso\"","No necesita cambiar el curso: el simulador se integra como herramienta dentro de la asignatura existente. 1h/semana de su tiempo."]];
concerns.forEach((c,i)=>{const y=1.2+i*0.85;
s.addShape(RR,{x:0.7,y,w:8.6,h:0.75,fill:{color:i%2===0?L:W},rectRadius:0.08});
addT(s,c[0],{x:0.9,y,w:3.5,h:0.75,fontSize:12,color:D,bold:true,italic:true,valign:"middle"});
addT(s,c[1],{x:4.5,y,w:4.6,h:0.75,fontSize:11,color:M,valign:"middle"});});
s.addNotes("OBJECIONES (34:00-36:00)\n\n\"Antes de los resultados, déjenme abordar las preocupaciones más comunes que escucho.\"\n\n[Leer cada una rápidamente, enfatizando las respuestas clave]\n\n\"La respuesta corta a todas: el piloto es gratis, la capacitación dura 2 horas, no hay que cambiar el plan de estudios, y los estudiantes se enganchan solos por la competencia.\"");

// ===== 19. RESULTS BIG STATS =====
s=pres.addSlide(); applyBg(s,D);
addT(s,"Resultados reales",{x:0.7,y:0.3,w:8.6,h:0.7,fontSize:28,color:W,bold:true,margin:0});
const stats=[[" 4.2\n/5.0","Nota promedio\ncomponente práctico"],[" 92%","Satisfacción\nestudiantil"],[" 3x","Profesores pidieron\nusar el simulador"],[" 85%","De pilotos se\nconvierten en licencias"]];
stats.forEach((st,i)=>{const x=0.5+i*2.35;
s.addShape(RR,{x,y:1.3,w:2.15,h:3.5,fill:{color:T,transparency:20},rectRadius:0.15});
addT(s,st[0],{x,y:1.6,w:2.15,h:1.5,fontSize:42,color:T,bold:true,align:"center",valign:"middle"});
addT(s,st[1],{x,y:3.2,w:2.15,h:1,fontSize:13,color:W,align:"center"});});
s.addNotes("RESULTADOS (36:00-37:00)\n\n\"Los números hablan. Nota promedio de 4.2, satisfacción del 92%, el triple de profesores piden usarlo después de ver un piloto, y el 85% de los pilotos se convierten en licencias pagas.\"\n\n\"¿Por qué? Porque los resultados se ven en el aula. No necesitan confiar en mí: confíen en los datos.\"");

// ===== 20. CASE STUDY 1 =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"Caso de éxito: Dirección Estratégica");
s.addShape(RR,{x:0.7,y:1.2,w:8.6,h:4,fill:{color:L},rectRadius:0.12});
addT(s,"Contexto",{x:0.9,y:1.4,w:3,h:0.3,fontSize:13,color:T,bold:true});
addT(s,"Profesor de Dirección Estratégica, programa de Administración. 35 estudiantes, 8vo semestre. Antes usaba solo casos de Harvard.",{x:0.9,y:1.7,w:4,h:0.8,fontSize:11,color:M});
addT(s,"Implementación",{x:0.9,y:2.6,w:3,h:0.3,fontSize:13,color:T,bold:true});
addT(s,"Integró CompanyGame como 40% de la evaluación. 8 rondas durante 8 semanas. Discusión post-ronda de 20 min cada clase. Presentación final tipo board meeting.",{x:0.9,y:2.9,w:4,h:0.9,fontSize:11,color:M});
addT(s,"Resultados",{x:5.3,y:1.4,w:3,h:0.3,fontSize:13,color:T,bold:true});
const res1=[["Nota promedio subió","de 3.6 a 4.2 (+0.6 puntos)"],["Evaluación docente mejoró","pasó de 4.0 a 4.7/5.0"],["92% de satisfacción","\"Asignatura más práctica de la carrera\""],["3 profesores más pidieron","usar el simulador al semestre siguiente"],["Datos para CNA","Dashboard generó evidencia para acreditación"]];
res1.forEach((r,i)=>{const y=1.8+i*0.65;
s.addImage({data:iCheck,x:5.3,y:y+0.05,w:0.25,h:0.25});
addT(s,r[0],{x:5.7,y,w:2,h:0.3,fontSize:11,color:D,bold:true,margin:0});
addT(s,r[1],{x:5.7,y:y+0.3,w:3.2,h:0.3,fontSize:10,color:M,margin:0});});
s.addNotes("CASO 1 (37:00-38:30)\n\n\"Les comparto un caso concreto. Un profesor de Dirección Estratégica usaba solo casos de Harvard. Integró CompanyGame como el 40% de la evaluación.\"\n\n\"Resultado: la nota promedio subió 0.6 puntos, la evaluación docente mejoró significativamente, el 92% de los estudiantes dijeron que fue la materia más práctica, y 3 profesores más pidieron usar el simulador.\"\n\n\"Pero lo más importante para el director del programa: el dashboard generó evidencia documentada para el informe de acreditación CNA.\"\n\n\"El profesor no cambió su curso: lo potenció con una herramienta.\"");

// ===== 21. CASE STUDY 2 =====
s=pres.addSlide(); applyBg(s,T);
addT(s,"Caso de éxito: Emprendimiento",{x:0.7,y:0.3,w:9,h:0.7,fontSize:28,color:W,bold:true,margin:0});
s.addShape(RR,{x:0.7,y:1.2,w:8.6,h:3.8,fill:{color:W,transparency:15},rectRadius:0.12});
addT(s,"Profesora de Creación de Empresa usó SimVenture Evolution en 4to semestre.\nLos estudiantes crearon y operaron una empresa virtual durante 12 semanas.",{x:1,y:1.4,w:8,h:0.8,fontSize:13,color:W});
const res2=["Los estudiantes entendieron flujo de caja por primera vez (\"ahí es donde duele\")","Tasa de aprobación subió del 78% al 94%","Los estudiantes usaron la experiencia del simulador para sus planes de negocio reales","El centro de emprendimiento pidió integrar SimVenture en su programa de incubación","3 equipos crearon microempresas reales inspiradas en su experiencia virtual"];
res2.forEach((r,i)=>{const y=2.4+i*0.5;
s.addImage({data:iCheckW,x:1,y:y+0.05,w:0.3,h:0.3});
addT(s,r,{x:1.5,y,w:7.5,h:0.5,fontSize:12,color:W,valign:"middle"});});
s.addNotes("CASO 2 (38:30-39:30)\n\n\"Segundo caso: una profesora de Emprendimiento usó SimVenture Evolution. Los estudiantes crearon una empresa virtual desde cero: producto, empleados, flujo de caja, marketing.\"\n\n\"Lo que más impactó: los estudiantes entendieron flujo de caja POR PRIMERA VEZ. Cuando tu empresa virtual quiebra porque no controlaste la caja, ese aprendizaje no se olvida.\"\n\n\"Resultado: aprobación subió del 78 al 94%, el centro de emprendimiento pidió integrar el simulador, y 3 equipos crearon microempresas reales inspiradas en la experiencia.\"");

// ===== 22. PROFESSOR TESTIMONIAL =====
s=pres.addSlide(); applyBg(s,D);
s.addImage({data:iComment,x:4.5,y:0.6,w:0.8,h:0.8});
addT(s,"\"Llevo 10 años dictando Simulación Gerencial\ncon Excel y casos de papel. El semestre que\nintegré CompanyGame fue el mejor de mi carrera\ndocente. Los estudiantes aprendieron más,\nyo trabajé menos, y tengo datos para demostrarlo.\"",{x:0.8,y:1.6,w:8.4,h:2.5,fontSize:20,color:W,italic:true,align:"center"});
addT(s,"— Profesor de Simulación Gerencial\nPrograma de Administración de Empresas",{x:1,y:4.2,w:8,h:0.8,fontSize:14,color:T,align:"center"});
s.addNotes("TESTIMONIAL PROFESOR (39:30-40:00)\n\n\"Este es el testimonio de un profesor que llevaba 10 años con Excel y casos. Integró CompanyGame y dice que fue el mejor semestre de su carrera docente.\"\n\n\"'Los estudiantes aprendieron más, yo trabajé menos, y tengo datos para demostrarlo.' Eso resume todo.\"");

// ===== 23. CNA EVIDENCE =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"Evidencia para acreditación CNA que genera el simulador");
const evi=[["Aprendizaje activo documentado","Dashboard con registro de TODAS las decisiones y resultados por equipo, ronda a ronda."],["Competencias medibles","Rúbricas basadas en desempeño financiero, calidad de decisiones y trabajo en equipo."],["Evaluación por resultados","Comparación de desempeño entre equipos: evidencia cuantitativa, no solo cualitativa."],["Trabajo colaborativo","Registro de equipos, roles y decisiones conjuntas. Evidencia de trabajo en grupo."],["Uso de tecnología","Plataforma web, dashboard digital, analytics de aprendizaje."],["Satisfacción estudiantil","Encuestas integradas + métricas de engagement (horas en plataforma, decisiones por ronda)."]];
evi.forEach((e,i)=>{const y=1.2+i*0.72;
s.addImage({data:iShield,x:0.9,y:y+0.1,w:0.3,h:0.3});
addT(s,e[0],{x:1.4,y,w:3,h:0.35,fontSize:13,color:D,bold:true,valign:"middle",margin:0});
addT(s,e[1],{x:4.5,y,w:4.8,h:0.55,fontSize:11,color:M,valign:"top",margin:0});});
s.addNotes("EVIDENCIA CNA (40:00-41:00)\n\n\"Para los que están en proceso de acreditación: esto es lo que el simulador genera automáticamente como evidencia.\"\n\n[Recorrer rápidamente los 6 puntos]\n\n\"Todo esto sale del dashboard sin que el profesor tenga que hacer nada adicional. Es evidencia lista para el informe.\"");

// ===== 24. FREE PILOT =====
s=pres.addSlide(); applyBg(s,T);
addT(s,"Piloto gratuito",{x:1,y:0.4,w:8,h:0.8,fontSize:40,color:W,bold:true,align:"center"});
addT(s,"1 curso · 1 semestre · sin costo · sin compromiso",{x:1,y:1.2,w:8,h:0.4,fontSize:18,color:D,align:"center",bold:true});
const pilot=["Acceso completo al simulador para el curso seleccionado","Capacitación al profesor: sesión de 2 horas (virtual o presencial)","Soporte técnico durante todo el semestre","Dashboard completo con métricas y datos exportables","Guía de integración curricular personalizada","Sin costo y sin compromiso de compra — si no funciona, no perdió nada"];
pilot.forEach((p,i)=>{const y=1.9+i*0.55;
s.addShape(RR,{x:1.5,y,w:7,h:0.45,fill:{color:W,transparency:15},rectRadius:0.06});
s.addImage({data:iCheckW,x:1.7,y:y+0.05,w:0.3,h:0.3});
addT(s,p,{x:2.2,y,w:6,h:0.45,fontSize:12,color:W,valign:"middle"});});
addT(s,"¿Qué necesitamos? Un curso + un profesor motivado + máximo 30 estudiantes",{x:1,y:5.1,w:8,h:0.3,fontSize:13,color:D,bold:true,align:"center"});
s.addNotes("PILOTO GRATUITO (41:00-42:30)\n\n\"Aquí viene la propuesta. Ofrecemos un piloto completamente gratuito.\"\n\n[Recorrer los 6 puntos]\n\n\"¿Qué necesitamos de ustedes? Solo tres cosas: un curso (idealmente Simulación Gerencial, Estrategia o Emprendimiento), un profesor motivado, y máximo 30 estudiantes.\"\n\n\"El piloto es nuestra mejor carta de presentación. Si funciona, los resultados hablan solos y la universidad compra. Si no funciona, no perdieron nada.\"\n\n\"El 85% de nuestros pilotos se convierten en licencias pagas. Eso les dice todo.\"");

// (Slide de precios eliminada por solicitud)

// ===== 26. NEXT STEPS =====
s=pres.addSlide(); s.background={color:W};
wTitle(s,"Próximos pasos: cómo arrancar");
const next=[["Hoy","Escríbame al chat o por correo si le interesa el piloto."],["Esta semana","Le envío acceso de prueba al simulador para que lo explore."],["Semana 1","Sesión de capacitación de 2 horas (virtual o presencial)."],["Semana 2","Clase introductoria con sus estudiantes."],["Semana 3+","¡Arranca la simulación!"]];
next.forEach((n,i)=>{const y=1.3+i*0.8;
s.addShape(OV,{x:1,y:y+0.05,w:0.6,h:0.6,fill:{color:i<2?T:D}});
addT(s,(i+1).toString(),{x:1,y:y+0.05,w:0.6,h:0.6,fontSize:18,color:W,bold:true,align:"center",valign:"middle"});
addT(s,n[0],{x:1.9,y,w:1.5,h:0.7,fontSize:14,color:D,bold:true,valign:"middle"});
addT(s,n[1],{x:3.5,y,w:5.8,h:0.7,fontSize:13,color:M,valign:"middle"});});
s.addNotes("PRÓXIMOS PASOS (43:00-43:30)\n\n\"Si les interesa, así de rápido es. Hoy me escriben, esta semana les envío acceso de prueba, la semana 1 los capacitamos, la semana 2 dan la clase intro, y la semana 3 ya están simulando.\"\n\n\"En total, del primer contacto a la primera ronda de simulación: 2-3 semanas. Así de simple.\"");

// ===== 27. Q&A =====
s=pres.addSlide(); applyBg(s,D);
s.addImage({data:iQ,x:4.25,y:1,w:1.5,h:1.5});
addT(s,"Preguntas y respuestas",{x:1,y:2.8,w:8,h:0.8,fontSize:36,color:W,bold:true,align:"center"});
addT(s,"Escriban sus preguntas en el chat de Zoom",{x:1,y:3.8,w:8,h:0.5,fontSize:16,color:T,align:"center"});
s.addNotes("Q&A (43:30-44:30)\n\nPREGUNTAS FRECUENTES:\n\nP: ¿En qué idioma está? R: CompanyGame en español. SimVenture en inglés con guías en español.\nP: ¿Necesita internet? R: Sí, 100% web. Solo navegador e internet.\nP: ¿Funciona con Moodle? R: Es plataforma independiente, pero los resultados se exportan.\nP: ¿Cuánto tiempo toma implementar? R: Capacitación 2h, accesos en 48h, primera ronda la semana siguiente.\nP: ¿Cuántos estudiantes máximo? R: Depende del simulador, pero típicamente hasta 200 por curso/competencia.\nP: ¿Hay versión móvil? R: Es responsive, funciona en tablet y móvil, pero recomendamos computador para mejor experiencia.");

// ===== 28. THANK YOU =====
s=pres.addSlide(); applyBg(s,D);
addT(s,"¡Gracias!",{x:1,y:0.5,w:8,h:1,fontSize:48,color:W,bold:true,align:"center"});
// Contacto (izquierda)
s.addShape(RR,{x:0.8,y:1.7,w:4.7,h:3.2,fill:{color:T,transparency:25},rectRadius:0.12,shadow:sh()});
addT(s,"Leisy Rodríguez",{x:1.1,y:2.0,w:4.1,h:0.6,fontSize:24,color:W,bold:true});
addT(s,"fidelizacion@simuladoresdenegocios.co",{x:1.1,y:2.85,w:4.2,h:0.5,fontSize:12,color:W});
addT(s,[{text:"in  Perfil de LinkedIn",options:{hyperlink:{url:"https://www.linkedin.com/in/simuladores-de-negocios-colombia-s-a-s-2a4454216/"}}}],{x:1.1,y:3.5,w:4.2,h:0.4,fontSize:13,color:CY,bold:true,fontFace:"Montserrat"});
addT(s,"Simuladores de Negocios Colombia",{x:1.1,y:4.2,w:4.2,h:0.4,fontSize:12,color:"D6E6F2"});
// QR de WhatsApp (derecha)
s.addShape(RR,{x:6.0,y:1.7,w:3.2,h:3.2,fill:{color:W},rectRadius:0.12,shadow:sh()});
s.addImage({data:qr,x:6.35,y:1.95,w:2.5,h:2.5});
addT(s,"Escríbenos por WhatsApp",{x:6.0,y:4.5,w:3.2,h:0.35,fontSize:12,color:D,bold:true,align:"center"});
s.addNotes("CIERRE (44:30-45:00)\n\n\"Muchas gracias por su tiempo. Espero que la demo les haya dado una idea clara de lo que puede hacer un simulador en su aula.\"\n\n\"Mis datos están en pantalla. Si les interesa el piloto, escríbanme por correo, WhatsApp o LinkedIn.\"\n\n\"Les envío la grabación del webinar y la presentación por correo a todos los registrados.\"\n\n\"¡Excelente día y nos vemos pronto!\"");

await pres.writeFile({fileName:"Webinar_Diseno_BusinessGlobal.pptx"});
console.log("PPTX OK");
}
build().catch(e=>{console.error(e);process.exit(1);});
