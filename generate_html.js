// Genera la versión web (HTML) de la presentación del webinar
// Diseño basado en businessglobal-simuladores.netlify.app (League Spartan + paleta azul/teal + degradados)
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

// Imágenes temáticas embebidas (base64) para mantener un único archivo portable
const img64 = n => "data:" + (n.endsWith(".png") ? "image/png" : "image/jpeg") + ";base64," +
  fs.readFileSync(path.join(__dirname,"assets",n)).toString("base64");
const IMG = {
  team: img64("team.jpg"), dashboard: img64("dashboard.jpg"), office: img64("office.jpg"),
  laptop: img64("laptop.jpg"), charts: img64("charts.jpg"), students: img64("students.jpg"),
  handshake: img64("handshake.jpg"), collab: img64("collab.jpg"), students2: img64("students2.jpg"),
  // Imágenes reales de los simuladores
  evolution: img64("sim_evolution.jpg"), validate: img64("sim_validate.jpg"),
  companygame: img64("sim_companygame.jpg"), companygame2: img64("sim_companygame2.jpg"),
  // Logos oficiales
  logoWhite: img64("logo-blanco.png"), logoWhiteH: img64("logo-blanco-h.png"), logoIcon: img64("logo-icon.png")
};

// Número de WhatsApp para el código QR (formato internacional, sin + ni espacios)
const WA_NUMBER = "573017903086";            // WhatsApp Simuladores de Negocios Colombia
const WA_LINK = "https://wa.me/" + WA_NUMBER;

const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

// ---------- Helpers de layout ----------
const slide = (theme, inner, extra="") => {
  const dark = /dark|teal/.test(theme);
  const logo = /nologo/.test(extra) ? "" :
    `<img class="slide-logo" src="${dark?IMG.logoWhiteH:IMG.logoIcon}" alt="Simuladores de Negocios">`;
  return `<section class="slide ${theme} ${extra}"><div class="inner">${inner}</div>${logo}</section>`;
};

const h = (t, sub="") =>
  `<h2 class="s-title">${esc(t)}</h2>` + (sub ? `<p class="s-sub">${esc(sub)}</p>` : "");

const cards = arr => `<div class="cards">` + arr.map(c =>
  `<div class="card"><div class="card-ic">${c.ic}</div><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p></div>`).join("") + `</div>`;

const checks = arr => `<ul class="checklist">` + arr.map(c =>
  `<li><span class="chk">✓</span><div><strong>${esc(c.t)}</strong>${c.d?`<span>${esc(c.d)}</span>`:""}</div></li>`).join("") + `</ul>`;

const rows = (arr, cls="") => `<div class="rows ${cls}">` + arr.map((r,i) =>
  `<div class="row ${i%2?"":"alt"}">${r.dot?`<span class="dot" style="background:${r.dot}"></span>`:""}<div class="r-lbl"${r.lc?` style="color:${r.lc}"`:""}>${esc(r.l)}</div><div class="r-txt">${esc(r.t)}</div></div>`).join("") + `</div>`;

const steps = arr => `<div class="steps">` + arr.map((s,i) =>
  `<div class="step"><div class="step-n">${i+1}</div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div>`).join("") + `</div>`;

const stats = arr => `<div class="stats">` + arr.map(s =>
  `<div class="stat"><div class="stat-n">${esc(s.n)}</div><div class="stat-l">${esc(s.l)}</div></div>`).join("") + `</div>`;

const twoCol = (a, b) =>
  `<div class="two"><div class="col ${a.theme||""}"><h3>${esc(a.t)}</h3>${a.body}</div><div class="col ${b.theme||""}"><h3>${esc(b.t)}</h3>${b.body}</div></div>`;

const bullets = (arr, cls="") => `<ul class="bullets ${cls}">` + arr.map(t=>`<li>${esc(t)}</li>`).join("") + `</ul>`;

const split = (txt, img, alt="") =>
  `<div class="split"><div class="split-txt">${txt}</div><img class="split-img" src="${img}" alt="${esc(alt)}"></div>`;

const simGrid = arr => `<div class="sim-grid">` + arr.map(s =>
  `<div class="sim-card"><img src="${s.img}" alt="${esc(s.name)}"><div class="sim-body">
     <h3 style="color:${s.color}">${esc(s.name)}</h3>
     <span class="sim-cat" style="background:${s.color}">${esc(s.cat)}</span>
     <p>${esc(s.desc)}</p>
     <p class="sim-subj"><strong>Asignaturas:</strong> ${esc(s.subj)}</p>
   </div></div>`).join("") + `</div>`;

const qcards = arr => `<div class="qgrid">` + arr.map(q =>
  `<div class="qcard"><span class="qic">${q.ic}</span><p>${esc(q.t)}</p></div>`).join("") + `</div>`;

const fcards = (arr, cls="") => `<div class="fgrid ${cls}">` + arr.map(f =>
  `<div class="fcard"><span class="fic">${f.ic}</span><div><h4>${esc(f.t)}</h4><p>${esc(f.d)}</p></div></div>`).join("") + `</div>`;

const qaList = arr => `<div class="qa-list">` + arr.map(o =>
  `<div class="qa-card"><div class="qa-q">${esc(o.q)}</div><div class="qa-a">${esc(o.a)}</div></div>`).join("") + `</div>`;

const timeline = arr => `<div class="timeline">` + arr.map(t =>
  `<div class="tl-item"><div class="tl-week">${esc(t.l)}</div><div class="tl-card">${esc(t.t)}</div></div>`).join("") + `</div>`;

// ---------- Contenido de las 27 slides ----------
const S = [];

// 1 - Portada
S.push(slide("dark center", `
  <img class="hero-logo" src="${IMG.logoWhite}" alt="Simuladores de Negocios Colombia">
  <div class="badge">Webinar gratuito</div>
  <h1>Simulación gerencial<br>en el aula</h1>
  <p class="lead">Del caso de papel al simulador digital</p>
  <p class="meta">📅 Jueves 16 de julio, 2026 · 🕙 10:00 AM (hora Colombia) · 💻 Zoom</p>
  <p class="meta">Presenta: <strong>Alan González Curiel</strong></p>
  <p class="meta dim">Simuladores de Negocios Colombia</p>`, "nologo"));

// 2 - Agenda
S.push(slide("light", h("Agenda") + rows([
  ["01","El reto: teoría vs práctica en Administración"],["02","¿Qué exige CNA sobre aprendizaje activo?"],
  ["03","Qué es un simulador de negocios y cómo funciona"],["04","Demo en vivo: CompanyGame (15 min)"],
  ["05","Nuestros 5 simuladores: cuál para cada asignatura"],["06","Implementación paso a paso: timeline de un semestre"],
  ["07","Resultados reales y casos de éxito"],["08","Alineación con acreditación CNA"],
  ["09","Piloto gratuito y próximos pasos"],["10","Preguntas y respuestas"]
].map(a=>({l:a[0],t:a[1],lc:"#0e9aa8"})))));

// 3 - Quiénes somos
S.push(slide("light", h("¿Quiénes somos?") + split(`
  <h3 class="blk">Nuestra misión</h3>
  <p>Ayudar a las facultades de Administración de Empresas en Colombia a cerrar la brecha entre teoría y práctica, integrando simuladores de negocios en sus asignaturas.</p>
  <p>Somos distribuidores autorizados de simuladores de negocios para universidades del país, con acompañamiento pedagógico en cada implementación.</p>`,
  IMG.students2, "Estudiantes trabajando en equipo")));

// 4 - Big stat
S.push(slide("dark center", `<div class="bigstat">92%</div>
  <p class="lead narrow">de los egresados de Administración de Empresas dicen que nunca tomaron una decisión gerencial real antes de graduarse</p>
  <div class="callout">El estudiante analiza lo que OTROS hicieron. Pero nunca decide, nunca arriesga, nunca falla.</div>`));

// 5 - Comparación
S.push(slide("light", h("El aula de hoy vs. el aula con simulación") + twoCol(
  {theme:"soft", t:"Método tradicional", body: bullets([
    "Leer casos escritos hace 10-20 años","Analizar decisiones de OTROS (Apple, Netflix, Zara)",
    "Debate y presentación en clase","Examen teórico de conocimientos",
    "Sin consecuencias reales para el estudiante","Difícil medir competencias gerenciales"],"muted")},
  {theme:"teal", t:"Con simulador", body: bullets([
    "Dirigir TU propia empresa virtual","Tomar TUS decisiones con datos reales",
    "Competir contra tus compañeros","Resultados inmediatos cada ronda",
    "Consecuencias reales (virtuales) de cada error","Dashboard con métricas de aprendizaje"])}
)));

// 6 - CNA
S.push(slide("light", h("¿Qué exige el CNA sobre aprendizaje activo?") +
  `<div class="callout info">💡 <strong>Condición de Calidad — CNA:</strong> "Estrategias de enseñanza y aprendizaje que promuevan la participación activa del estudiante en su proceso de formación y el desarrollo de competencias."</div>
   <p class="lead-sm">Esto significa que el CNA espera EVIDENCIA de:</p>` + fcards([
    {ic:"📝",t:"Aprendizaje activo documentado",d:"Actividades donde el estudiante participa, decide y produce."},
    {ic:"📊",t:"Competencias medibles",d:"Resultados cuantificables, no solo notas de exámenes teóricos."},
    {ic:"🤝",t:"Trabajo colaborativo",d:"Equipos que trabajan juntos con roles definidos."},
    {ic:"💻",t:"Uso de tecnología educativa",d:"Herramientas que potencien la enseñanza-aprendizaje."}])));

// 7 - Presión acreditación
S.push(slide("teal center", `<div class="badge-ic">🛡️</div>${h("La presión de la acreditación","Esto es lo que preguntan los pares evaluadores del CNA:")}` +
  qcards([
    {ic:"🎯", t:"¿Cómo desarrollan competencias gerenciales en sus estudiantes?"},
    {ic:"📊", t:"¿Qué evidencia tienen de aprendizaje activo?"},
    {ic:"💻", t:"¿Qué herramientas tecnológicas usan en el aula?"},
    {ic:"📈", t:"¿Cómo miden el impacto de sus estrategias pedagógicas?"}
  ]) +
  `<p class="foot light">Con un simulador, cada una de estas respuestas viene respaldada por datos.</p>`));

// 8 - Quote estudiante
S.push(slide("dark center", `<div class="ic-big">💬</div>
  <blockquote>"Aprendí más en 8 rondas de simulación que en todo un semestre de clases magistrales. Por primera vez sentí que estaba tomando decisiones de verdad."</blockquote>
  <p class="attr">— Estudiante de Administración de Empresas, 8vo semestre</p>`));

// 9 - Qué es un simulador
S.push(slide("light", h("¿Qué es un simulador de negocios?") + cards([
  {ic:"💻",t:"Plataforma 100% web",d:"Acceso desde cualquier dispositivo. No hay que instalar nada. Solo navegador e internet."},
  {ic:"⚙️",t:"Empresa virtual realista",d:"Cada equipo recibe una empresa con estados financieros reales: P&L, balance, flujo de caja, mercado."},
  {ic:"🎓",t:"Aprendizaje medible",d:"Dashboard en tiempo real: ranking, decisiones y métricas de desempeño por equipo."}])));

// 10 - Cómo funciona una simulación (flujo común a todos los simuladores)
S.push(slide("teal", h("¿Cómo funciona una simulación de negocios?","El flujo es el mismo en todos nuestros simuladores") + steps([
  {t:"Reciben un reto",d:"Cada equipo o estudiante recibe una empresa, proyecto o idea de negocio, según el simulador."},
  {t:"Toman decisiones",d:"Ronda a ronda deciden en un entorno realista: gestión, finanzas, emprendimiento, proyectos o agilidad."},
  {t:"Ven el impacto",d:"El simulador procesa las decisiones y muestra resultados inmediatos. En varios, los equipos compiten entre sí."},
  {t:"Presentan y reflexionan",d:"Cierran presentando su estrategia y analizando lo aprendido junto al docente."}])));

// 11 - Decisiones
S.push(slide("light", h("¿Qué decisiones toman los estudiantes?","Ejemplo en un simulador de gestión como CompanyGame: 5 áreas funcionales de la empresa") + fcards([
  {ic:"📣",t:"Mercadeo",d:"Precio de venta, inversión publicitaria, canales de distribución, posicionamiento."},
  {ic:"🏭",t:"Producción",d:"Volumen de producción, capacidad de planta, control de calidad, inventarios."},
  {ic:"💰",t:"Finanzas",d:"Inversión en I+D, créditos bancarios, dividendos, flujo de caja."},
  {ic:"👥",t:"Recursos Humanos",d:"Contratación, salarios, capacitación, bienestar laboral."},
  {ic:"🧭",t:"Estrategia",d:"Segmento de mercado, diferenciación vs costo, expansión, alianzas."}
], "cols3")));

// 12 - Competencias
S.push(slide("light", h("Competencias que desarrolla el simulador") + fcards([
  {ic:"🎯",t:"Pensamiento estratégico",d:"Analizar el entorno, definir una estrategia y ejecutarla con recursos limitados."},
  {ic:"🎲",t:"Toma de decisiones",d:"Decidir bajo incertidumbre, con información incompleta y asumiendo consecuencias."},
  {ic:"🤝",t:"Trabajo en equipo",d:"Negociar, delegar y alinear al equipo en cada ronda de decisiones."},
  {ic:"💰",t:"Análisis financiero",d:"Leer estados financieros, interpretar indicadores y gestionar el flujo de caja."},
  {ic:"🔄",t:"Pensamiento sistémico",d:"Entender cómo una decisión en mercadeo afecta finanzas, producción y RRHH."},
  {ic:"🏆",t:"Competitividad y adaptación",d:"Reaccionar ante la competencia y ajustar la estrategia sobre la marcha."}
], "cols3")));

// 13 - Dashboard del profesor
S.push(slide("light", h("Lo que ve el profesor: dashboard completo") + `
  <div class="split">
    <img class="split-img" src="${IMG.dashboard}" alt="Dashboard del profesor">
    <div class="split-txt">` + checks([
      {t:"Ranking en tiempo real",d:"Quién lidera, quién mejora, quién necesita ayuda."},
      {t:"Decisiones por equipo y ronda",d:"Material perfecto para la discusión post-ronda."},
      {t:"Estados financieros por empresa",d:"P&L, balance y flujo de caja con datos reales."},
      {t:"Métricas exportables",d:"Listas para rúbricas, competencias y reportes CNA."},
      {t:"Historial completo",d:"Registro de decisiones y resultados de todo el semestre."}
    ]) + `</div>
  </div>`));

// 14 - Rol del profesor
S.push(slide("dark", h("El rol del profesor con el simulador") + fcards([
  {ic:"🧩",t:"No necesita ser técnico",d:"El simulador es web e intuitivo. La capacitación dura solo 2 horas."},
  {ic:"🧑‍🏫",t:"Es un facilitador",d:"Su rol cambia: de exponer contenido a guiar la discusión post-ronda."},
  {ic:"🗂️",t:"Diseña la integración",d:"Define rondas, semanas y % de evaluación. Nosotros lo acompañamos."},
  {ic:"📊",t:"Evalúa con datos reales",d:"Usa el dashboard para calificar desempeño y calidad de decisiones."}
])));

// 15 - Demo transición
S.push(slide("dark center", `<div class="ic-big">🚀</div><h1 class="md">Demo en vivo</h1>
  <p class="lead">Vamos a dirigir una empresa juntos — 15 minutos</p>
  <img class="hero-img" src="${IMG.companygame}" alt="Interfaz real de CompanyGame">`));

// 16 - 5 simuladores
S.push(slide("light", h("Nuestros 5 simuladores: uno para cada necesidad") + rows([
  {l:"CompanyGame",t:"Simulación Gerencial, Dirección Estratégica, Mercadeo, Finanzas",dot:"#0e9aa8",lc:"#0e9aa8"},
  {l:"SimVenture Evolution",t:"Creación de Empresa, Plan de Negocio, Emprendimiento",dot:"#0c71b8",lc:"#0c71b8"},
  {l:"SimVenture Validate",t:"Modelos de Negocio, Design Thinking, Innovación, Semilleros",dot:"#2e9fd9",lc:"#2e9fd9"},
  {l:"SimProject",t:"Formulación y Evaluación de Proyectos, Gerencia de Proyectos",dot:"#0a5183",lc:"#0a5183"},
  {l:"SimAgile",t:"Transformación Digital, Scrum, Agilidad",dot:"#575476",lc:"#575476"}])));

// 16a - Detalle: CompanyGame (insignia)
S.push(slide("light", h("En detalle: CompanyGame","Nuestro simulador insignia de gestión integral y estrategia") + `
  <div class="split">
    <img class="split-img" src="${IMG.companygame}" alt="Interfaz de CompanyGame">
    <div class="split-txt">
      <span class="sim-cat" style="background:#0caae3">Gestión Integral · Estrategia</span>
      <p>Cada equipo dirige una compañía y compite en un mercado real, tomando decisiones ronda a ronda en las 5 áreas funcionales —marketing, producción, finanzas, RRHH y estrategia— con estados financieros reales (P&amp;L, balance, flujo de caja) y ranking competitivo en vivo.</p>
      <p>Escenarios sectoriales listos (ej. InnovaHotel), dashboard completo para el docente, 100% web y en español. Usado por grupos como Repsol, Santander y Michelin, y más de 150 universidades y escuelas de negocio.</p>
      <p class="sim-subj"><strong>Asignaturas:</strong> Simulación Gerencial, Dirección Estratégica, Política Empresarial, Mercadeo, Finanzas</p>
    </div>
  </div>`));

// 16b - Detalle: Emprendimiento e Innovación
S.push(slide("light", h("En detalle: Emprendimiento e Innovación") + simGrid([
  {img:IMG.evolution, name:"SimVenture Evolution", color:"#0c71b8", cat:"Emprendimiento · Gestión integral",
   desc:"Los estudiantes fundan y hacen crecer una empresa virtual por hasta 10 años simulados (40 trimestres), gestionando dinero, tiempo, moral del equipo, habilidades, sostenibilidad y eficiencia. El docente usa el 'Control Tower' para crear escenarios, agrupar estudiantes y monitorear el progreso con reportes y un leaderboard.",
   subj:"Creación de Empresa, Plan de Negocio, Emprendimiento"},
  {img:IMG.validate, name:"SimVenture Validate", color:"#0caae3", cat:"Innovación · Lean Startup",
   desc:"Plataforma para idear, planear, testear y presentar ideas de negocio. Los estudiantes construyen su Business Model Canvas (con componente de sostenibilidad), identifican y prueban sus supuestos críticos con técnicas de validación, y arman un portafolio digital presentable. Incluye guías, herramientas y 8 casos reales.",
   subj:"Innovación, Design Thinking, Modelos de Negocio, Semilleros"}
])));

// 16c - Detalle: Proyectos y Agilidad
S.push(slide("light", h("En detalle: Proyectos y Agilidad") + simGrid([
  {img:IMG.charts, name:"SimProject", color:"#0a5183", cat:"Gerencia de Proyectos · Premio PMI",
   desc:"Simulación premiada por el PMI. Los estudiantes planean y gestionan un proyecto de 11 semanas y 7 tareas equilibrando alcance, cronograma, costo, calidad y productividad del equipo. Usan herramientas reales —Project Charter, diagrama de Gantt y WBS— con stakeholders y miembros de equipo simulados. Individual o en equipos (3 estudiantes por licencia).",
   subj:"Formulación y Evaluación de Proyectos, Gerencia de Proyectos"},
  {img:IMG.students, name:"SimAgile", color:"#575476", cat:"Metodologías Ágiles · Scrum",
   desc:"Simulación end-to-end que replica un equipo Scrum real. Los estudiantes lideran y entrenan a su equipo ágil para entregar un MVP recorriendo toda la cadencia: sprint planning, daily standups, product backlog, sprints y burndown charts, con tips de coaching y escenarios de la vida real.",
   subj:"Transformación Digital, Scrum, Agilidad"}
])));

// 17 - Timeline
S.push(slide("teal", h("Implementación: un semestre, paso a paso","De la capacitación del docente a las métricas de acreditación") + timeline([
  {l:"Semana 0",t:"Capacitación al profesor (2h). Definir curso, rondas y evaluación."},
  {l:"Semana 1",t:"Clase introductoria: presentación del simulador a los estudiantes."},
  {l:"Semana 2-3",t:"Ronda de práctica (sin nota). Se familiarizan con la interfaz."},
  {l:"Semana 4-11",t:"Rondas 1-8 (con nota). Una por semana, con discusión post-ronda."},
  {l:"Semana 12",t:"Presentación final: cada equipo presenta su estrategia (board meeting)."},
  {l:"Semana 13",t:"Evaluación con datos del dashboard + presentación."},
  {l:"Semana 14-16",t:"Resultados y recolección de métricas para acreditación."}
])));

// 18 - Preocupaciones
S.push(slide("light", h("Preocupaciones comunes (y respuestas)") + qaList([
  {q:"\"No soy experto en tecnología\"", a:"Es web e intuitivo. Capacitación de 2h. Si usa correo, puede usarlo."},
  {q:"\"No hay presupuesto\"", a:"El piloto es 100% gratuito. Los resultados justifican la inversión."},
  {q:"\"Ya usamos otro simulador\"", a:"Los nuestros complementan: emprendimiento, proyectos, ágiles. Nichos distintos."},
  {q:"\"Los estudiantes no lo tomarán en serio\"", a:"La competencia entre equipos genera motivación natural."},
  {q:"\"No tengo tiempo de cambiar mi curso\"", a:"Se integra como herramienta. 1h/semana de su tiempo."}
])));

// 19 - Resultados big stats
S.push(slide("dark", h("Resultados reales") + stats([
  {n:"4.2/5.0",l:"Nota promedio componente práctico"},{n:"92%",l:"Satisfacción estudiantil"},
  {n:"3x",l:"Profesores pidieron usar el simulador"},{n:"85%",l:"De pilotos se convierten en licencias"}])));

// 20 - Caso 1
S.push(slide("light", h("Caso de éxito: Dirección Estratégica") + `
  <div class="split">
    <div class="split-txt">
      <p><strong>Contexto:</strong> Profesor de Dirección Estratégica, 35 estudiantes, 8vo semestre. Antes solo usaba casos de Harvard.</p>
      <p><strong>Implementación:</strong> CompanyGame como 40% de la evaluación; 8 rondas, discusión post-ronda y board meeting final.</p>` +
      checks([
        {t:"Nota promedio subió de 3.6 a 4.2 (+0.6)"},
        {t:"Evaluación docente: de 4.0 a 4.7/5.0"},
        {t:"92% de satisfacción estudiantil"},
        {t:"3 profesores más pidieron usarlo"},
        {t:"Dashboard generó evidencia para CNA"}]) + `
    </div>
    <img class="split-img" src="${IMG.companygame2}" alt="Interfaz de CompanyGame">
  </div>`));

// 21 - Caso 2
S.push(slide("teal", h("Caso de éxito: Emprendimiento") + `
  <div class="split">
    <div class="split-txt">
      <p class="lead-sm light">Profesora de Creación de Empresa usó SimVenture Evolution en 4to semestre; sus estudiantes crearon y operaron una empresa virtual durante 12 semanas.</p>` +
      checks([
        {t:"Entendieron flujo de caja por primera vez (\"ahí es donde duele\")"},
        {t:"Tasa de aprobación subió del 78% al 94%"},
        {t:"Usaron la experiencia para sus planes de negocio reales"},
        {t:"El centro de emprendimiento pidió integrar SimVenture"},
        {t:"3 equipos crearon microempresas reales"}],"on-dark") + `
    </div>
    <img class="split-img" src="${IMG.evolution}" alt="SimVenture Evolution">
  </div>`));

// 22 - Testimonial profesor
S.push(slide("dark center", `<div class="ic-big">💬</div>
  <blockquote>"Llevo 10 años dictando Simulación Gerencial con Excel y casos de papel. El semestre que integré CompanyGame fue el mejor de mi carrera docente. Los estudiantes aprendieron más, yo trabajé menos, y tengo datos para demostrarlo."</blockquote>
  <p class="attr">— Profesor de Simulación Gerencial · Programa de Administración de Empresas</p>`));

// 23 - Evidencia CNA
S.push(slide("light", h("Evidencia para acreditación CNA que genera el simulador") + fcards([
  {ic:"📋",t:"Aprendizaje activo documentado",d:"Registro de TODAS las decisiones y resultados, ronda a ronda."},
  {ic:"📏",t:"Competencias medibles",d:"Rúbricas basadas en desempeño y calidad de decisiones."},
  {ic:"📊",t:"Evaluación por resultados",d:"Comparación de desempeño entre equipos: evidencia cuantitativa."},
  {ic:"👥",t:"Trabajo colaborativo",d:"Registro de equipos, roles y decisiones conjuntas."},
  {ic:"💻",t:"Uso de tecnología",d:"Plataforma web, dashboard digital, analytics de aprendizaje."},
  {ic:"⭐",t:"Satisfacción estudiantil",d:"Encuestas integradas + métricas de engagement."}
], "cols3")));

// 24 - Piloto gratuito
S.push(slide("teal", `<div class="tc">${h("Piloto gratuito","1 curso · 1 semestre · sin costo · sin compromiso")}</div>
  <div class="split">
    <div class="split-txt">` + checks([
      {t:"Acceso completo al simulador para el curso seleccionado"},
      {t:"Capacitación al profesor: sesión de 2 horas"},
      {t:"Soporte técnico durante todo el semestre"},
      {t:"Dashboard completo con métricas exportables"},
      {t:"Guía de integración curricular personalizada"},
      {t:"Sin costo y sin compromiso — si no funciona, no perdió nada"}],"on-dark") + `
    </div>
    <img class="split-img" src="${IMG.handshake}" alt="Piloto sin compromiso">
  </div>
  <p class="foot light tc">¿Qué necesitamos? Un curso + un profesor motivado + máximo 30 estudiantes</p>`));

// 25 - Próximos pasos
S.push(slide("light", h("Próximos pasos: cómo arrancar") + steps([
  {t:"Hoy",d:"Escríbame al chat o por correo si le interesa el piloto."},
  {t:"Esta semana",d:"Le envío acceso de prueba al simulador."},
  {t:"Semana 1",d:"Sesión de capacitación de 2 horas."},
  {t:"Semana 2",d:"Clase introductoria con sus estudiantes."},
  {t:"Semana 3+",d:"¡Arranca la simulación!"}])));

// 26 - Q&A
S.push(slide("dark center", `<div class="ic-big">❓</div><h1 class="md">Preguntas y respuestas</h1>
  <p class="lead">Escriban sus preguntas en el chat de Zoom</p>`));

// 27 - Gracias
S.push(slide("dark center", `<img class="hero-logo sm" src="${IMG.logoWhite}" alt="Simuladores de Negocios">
  <h1 class="gracias">¡Gracias!</h1>
  <div class="close-grid">
    <div class="contact">
      <p class="c-name">Leisy Rodríguez</p>
      <p>✉️ fidelizacion@simuladoresdenegocios.co</p>
      <p><a href="https://www.linkedin.com/in/simuladores-de-negocios-colombia-s-a-s-2a4454216/" target="_blank">in&nbsp; Perfil de LinkedIn</a></p>
    </div>
    <div class="qr-box">
      <img class="qr" src="__QR__" alt="WhatsApp QR">
      <p class="qr-cap">📱 Escríbenos por WhatsApp</p>
    </div>
  </div>`, "nologo"));

// ---------- HTML ----------
const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Simulación gerencial en el aula — Webinar</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800;900&family=Merriweather+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
 /* Paleta oficial Simuladores de Negocios Colombia (Manual de Identidad Visual) */
 --primary:#0c71b8;--primary-light:#0caae3;--dark:#33393c;
 --teal:#0caae3;--teal-d:#0c71b8;--blue:#0c71b8;--sky:#0caae3;
 --purple:#7f8080;--light:#eef4f9;--muted:#7f8080;--white:#fff;
 --grad-dark:linear-gradient(135deg,#0a3f6b,#06233b);
 --grad-teal:linear-gradient(135deg,#0caae3,#0c71b8);
 --grad-light:linear-gradient(135deg,#f2f8fc,#e7f3fb);
 --shadow:0 10px 40px rgba(12,113,184,.16);--radius:18px;
}
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%}
body{font-family:'League Spartan',sans-serif;color:var(--dark);overflow:hidden;background:#02263f}
.slide{position:absolute;inset:0;display:none;padding:4vh 6vw;overflow:auto}
.slide.active{display:flex;flex-direction:column;justify-content:center;animation:fade .45s ease}
@keyframes fade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.inner{width:100%;max-width:1080px;margin:0 auto}
.slide.center .inner{text-align:center}
/* Temas */
.slide.light{background:var(--grad-light);color:var(--dark)}
.slide.dark{background:var(--grad-dark);color:#fff}
.slide.teal{background:var(--grad-teal);color:#fff}
/* Tipografía */
h1{font-size:clamp(34px,5.5vw,68px);font-weight:800;line-height:1.05;letter-spacing:-1px}
h1.md{font-size:clamp(30px,4.5vw,52px)}
.s-title{font-size:clamp(24px,3.4vw,40px);font-weight:700;color:var(--primary);margin-bottom:6px}
.slide.dark .s-title,.slide.teal .s-title{color:#fff}
.s-sub{color:var(--muted);font-size:clamp(14px,1.6vw,19px);margin-bottom:22px}
.slide.dark .s-sub,.slide.teal .s-sub{color:rgba(255,255,255,.85)}
.lead{font-size:clamp(18px,2.4vw,28px);font-weight:500;margin-top:14px;line-height:1.4}
.lead.narrow{max-width:760px;margin:14px auto 0}
.lead-sm{font-size:clamp(15px,1.7vw,19px);font-weight:600;margin:16px 0}
.lead-sm.light,.light .lead-sm{color:var(--muted)}
.teal .lead-sm.light{color:rgba(255,255,255,.95)}
.meta{font-size:clamp(13px,1.5vw,17px);margin-top:18px;color:rgba(255,255,255,.9)}
.meta.dim{color:rgba(255,255,255,.6);margin-top:8px}
.badge{display:inline-block;background:var(--teal);color:#fff;font-weight:700;font-size:13px;
 padding:7px 16px;border-radius:30px;margin-bottom:22px;letter-spacing:.5px;text-transform:uppercase}
.bigstat{font-size:clamp(80px,16vw,190px);font-weight:800;color:var(--primary-light);line-height:1}
.attr{margin-top:24px;color:var(--primary-light);font-weight:600;font-size:clamp(14px,1.6vw,18px)}
blockquote{font-size:clamp(20px,2.7vw,32px);font-weight:600;line-height:1.45;max-width:900px;margin:0 auto;font-style:italic}
.ic-big{font-size:clamp(48px,7vw,84px);margin-bottom:10px}
/* Callouts */
.callout{background:rgba(255,255,255,.12);border-radius:var(--radius);padding:18px 26px;margin:22px auto 0;
 max-width:780px;font-size:clamp(14px,1.7vw,18px);font-style:italic}
.callout.info{background:#e7f5fc;color:var(--dark);font-style:normal;text-align:left;border-left:5px solid var(--teal)}
.foot{margin-top:26px;font-weight:600;font-size:clamp(14px,1.6vw,18px)}
.foot.light{color:#fff}
.light .foot{color:var(--primary)}
/* Cards */
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:24px}
.card{background:#fff;border-radius:var(--radius);padding:30px 24px;box-shadow:var(--shadow);text-align:center}
.card-ic{width:74px;height:74px;border-radius:50%;background:var(--grad-dark);display:flex;align-items:center;
 justify-content:center;font-size:34px;margin:0 auto 16px}
.card h3{color:var(--primary);font-size:19px;margin-bottom:10px}
.card p{color:var(--muted);font-size:14px;line-height:1.5;font-family:'Merriweather Sans',sans-serif}
/* Checklist */
.checklist{list-style:none;margin-top:22px;display:grid;gap:14px;max-width:920px}
.checklist.center-list{margin-left:auto;margin-right:auto}
.checklist li{display:flex;gap:14px;align-items:flex-start;text-align:left}
.checklist .chk{flex:none;width:28px;height:28px;border-radius:50%;background:var(--teal);color:#fff;
 display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px}
.checklist.on-dark .chk{background:#fff;color:var(--teal)}
.checklist strong{display:block;font-size:clamp(14px,1.6vw,17px)}
.checklist span{display:block;color:var(--muted);font-size:13px;font-family:'Merriweather Sans',sans-serif;margin-top:2px}
.on-dark strong{color:#fff}.on-dark span{color:rgba(255,255,255,.8)}
/* Rows */
.rows{margin-top:20px;display:grid;gap:8px}
.row{display:flex;align-items:center;gap:16px;padding:13px 20px;border-radius:12px;background:#fff;box-shadow:0 3px 14px rgba(10,79,128,.06)}
.row.alt{background:rgba(255,255,255,.65)}
.on-dark .row{background:rgba(255,255,255,.12);box-shadow:none}
.on-dark .row.alt{background:rgba(255,255,255,.06)}
.row .dot{flex:none;width:16px;height:16px;border-radius:5px}
.r-lbl{flex:none;width:200px;font-weight:700;font-size:clamp(13px,1.5vw,16px)}
.r-txt{color:var(--muted);font-size:clamp(12px,1.4vw,15px);font-family:'Merriweather Sans',sans-serif}
.on-dark .r-txt{color:rgba(255,255,255,.85)}
/* Steps */
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:20px;margin-top:26px}
/* Objeción -> respuesta */
.qa-list{display:grid;gap:13px;margin-top:18px}
.qa-card{display:grid;grid-template-columns:minmax(230px,.95fr) 1.35fr;border-radius:14px;overflow:hidden;box-shadow:var(--shadow)}
.qa-q{background:var(--grad-dark);color:#fff;padding:15px 22px;font-weight:700;font-style:italic;display:flex;align-items:center;font-size:clamp(13px,1.5vw,16px)}
.qa-a{background:#fff;padding:15px 20px 15px 46px;color:var(--muted);display:flex;align-items:center;position:relative;font-family:'Merriweather Sans',sans-serif;font-size:clamp(12px,1.4vw,15px);line-height:1.4}
.qa-a:before{content:"✓";position:absolute;left:18px;color:var(--teal);font-weight:800;font-size:16px}
.step{background:#fff;border-radius:var(--radius);padding:26px 18px;text-align:center;box-shadow:var(--shadow);color:var(--dark)}
.step-n{width:56px;height:56px;border-radius:50%;background:var(--grad-dark);color:#fff;font-weight:800;font-size:24px;
 display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.step h3{color:var(--primary);font-size:17px;margin-bottom:8px}
.step p{color:var(--muted);font-size:13px;line-height:1.45;font-family:'Merriweather Sans',sans-serif}
/* Stats */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:26px}
.stat{background:#fff;border-radius:var(--radius);padding:32px 16px;text-align:center;box-shadow:var(--shadow)}
.stat-n{font-size:clamp(34px,4.4vw,52px);font-weight:800;color:var(--primary-light);line-height:1}
.stat-l{margin-top:10px;font-size:13px;font-family:'Merriweather Sans',sans-serif;color:var(--muted)}
/* Two columns */
.two{display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:24px;align-items:stretch}
.col{border-radius:var(--radius);padding:28px;box-shadow:var(--shadow)}
.col h3{font-size:20px;margin-bottom:14px}
.col.soft{background:#fff;color:var(--dark)}.col.soft h3{color:var(--muted)}
.col.dark{background:var(--grad-dark);color:#fff}.col.dark h3{color:var(--primary-light)}
.col.teal{background:var(--grad-teal);color:#fff}
.col:not(.soft):not(.dark):not(.teal){background:#fff}
.col p{font-size:14px;line-height:1.55;font-family:'Merriweather Sans',sans-serif;margin-bottom:10px}
.col .checklist{margin-top:0}
/* Bullets */
.bullets{list-style:none;display:grid;gap:11px}
.bullets li{position:relative;padding-left:24px;font-size:15px;line-height:1.4;font-family:'Merriweather Sans',sans-serif}
.bullets li:before{content:"›";position:absolute;left:4px;font-weight:800;color:var(--teal)}
.bullets.muted li{color:var(--muted)}
.col.teal .bullets li:before{color:#fff}
/* Qbox */
.qbox-list{display:grid;gap:12px;max-width:760px;margin:18px auto 0}
.qbox{background:rgba(255,255,255,.15);border-radius:12px;padding:14px 22px;font-style:italic;font-size:clamp(14px,1.6vw,18px)}
/* Contact */
.contact{background:rgba(255,255,255,.12);border-radius:var(--radius);padding:30px 40px;margin:26px auto 0;max-width:520px}
.contact p{font-size:16px;margin:6px 0;font-family:'Merriweather Sans',sans-serif}
.c-name{font-size:24px!important;font-weight:800;font-family:'League Spartan',sans-serif!important}
.c-role{color:var(--primary-light);font-weight:600}
.contact a{color:var(--primary-light);text-decoration:none;font-weight:600}
.contact a:hover{text-decoration:underline}
.close-grid{display:flex;gap:34px;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:26px}
.close-grid .contact{margin:0;text-align:left;max-width:420px}
.qr-box{background:#fff;border-radius:var(--radius);padding:18px;box-shadow:var(--shadow);text-align:center}
.qr-box .qr{width:190px;height:190px;display:block;border-radius:8px}
.qr-cap{color:var(--dark);font-weight:700;font-size:14px;margin-top:10px;font-family:'League Spartan',sans-serif}
.tc{text-align:center}
/* Logo de marca */
.slide-logo{position:absolute;top:22px;right:30px;height:30px;width:auto;opacity:.9;z-index:6}
.slide.light .slide-logo{height:40px}
.hero-logo{width:min(215px,44%);height:auto;margin:0 auto 22px;display:block}
.hero-logo.sm{width:min(140px,30%);margin-bottom:14px}
/* Imágenes */
.split{display:grid;grid-template-columns:1.05fr .95fr;gap:36px;align-items:center;margin-top:18px}
.split-txt h3.blk{color:var(--primary);font-size:clamp(18px,2vw,23px);margin-bottom:12px}
.split-txt p{font-family:'Merriweather Sans',sans-serif;font-size:clamp(13px,1.6vw,16px);line-height:1.6;color:var(--muted);margin-bottom:12px}
.split-img{width:100%;height:clamp(240px,42vh,380px);object-fit:cover;border-radius:var(--radius);box-shadow:var(--shadow)}
.hero-img{width:min(620px,82%);height:clamp(200px,34vh,300px);object-fit:cover;border-radius:var(--radius);box-shadow:var(--shadow);margin:26px auto 0;display:block}
.sim-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:22px}
.sim-card{background:#fff;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column;text-align:left}
.sim-card img{width:100%;height:clamp(120px,18vh,160px);object-fit:cover}
.sim-body{padding:18px 24px}
.sim-body h3{font-size:clamp(17px,2vw,22px);margin-bottom:9px}
.sim-cat{display:inline-block;color:#fff;font-size:11px;font-weight:700;padding:4px 13px;border-radius:20px;margin-bottom:11px;text-transform:uppercase;letter-spacing:.4px}
.sim-body p{font-family:'Merriweather Sans',sans-serif;font-size:clamp(12px,1.4vw,14px);line-height:1.55;color:var(--muted);margin-bottom:9px}
.sim-subj{font-size:13px!important;color:var(--dark)!important}
.sim-subj strong{color:var(--primary)}
/* Tarjetas de features (2x2 con ícono) */
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px}
.fcard{display:flex;gap:16px;align-items:flex-start;background:#fff;border-radius:14px;padding:19px 22px;
 box-shadow:0 6px 22px rgba(10,79,128,.10);border:1px solid rgba(10,81,131,.06)}
.fcard .fic{flex:none;width:50px;height:50px;border-radius:13px;background:var(--grad-teal);
 display:flex;align-items:center;justify-content:center;font-size:24px}
.fcard h4{color:var(--primary);font-size:clamp(15px,1.7vw,18px);margin-bottom:5px}
.fcard p{font-family:'Merriweather Sans',sans-serif;font-size:clamp(12px,1.4vw,14px);color:var(--muted);line-height:1.45}
.fgrid.cols3{grid-template-columns:repeat(3,1fr);gap:16px}
.fgrid.cols3 .fcard{flex-direction:column;gap:12px}
@media(max-width:1080px){.fgrid.cols3{grid-template-columns:1fr 1fr}}
/* Badge circular + cuadrícula de preguntas */
.badge-ic{width:clamp(70px,9vw,90px);height:clamp(70px,9vw,90px);border-radius:50%;
 background:rgba(255,255,255,.16);border:2px solid rgba(255,255,255,.55);backdrop-filter:blur(2px);
 display:flex;align-items:center;justify-content:center;font-size:clamp(34px,5vw,44px);margin:0 auto 4px}
.qgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:26px auto 0;max-width:900px}
.qcard{display:flex;gap:15px;align-items:center;background:#fff;border-radius:14px;padding:18px 22px;
 box-shadow:0 6px 22px rgba(0,0,0,.16);text-align:left}
.qcard .qic{flex:none;width:48px;height:48px;border-radius:13px;background:var(--grad-dark);
 display:flex;align-items:center;justify-content:center;font-size:23px}
.qcard p{font-family:'Merriweather Sans',sans-serif;font-size:clamp(13px,1.5vw,15.5px);line-height:1.4;color:var(--dark);font-weight:600}
/* Timeline */
.timeline{position:relative;margin-top:24px;display:grid;gap:13px}
.timeline:before{content:"";position:absolute;left:148px;top:16px;bottom:16px;width:2px;background:rgba(255,255,255,.45)}
.tl-item{display:grid;grid-template-columns:138px 1fr;gap:22px;align-items:center}
.tl-week{font-weight:800;color:#fff;font-size:clamp(13px,1.7vw,17px);text-align:right;line-height:1.15}
.tl-card{position:relative;background:#fff;color:var(--dark);border-radius:12px;padding:13px 22px;
 box-shadow:0 6px 22px rgba(0,0,0,.16);font-family:'Merriweather Sans',sans-serif;font-size:clamp(12px,1.5vw,15px);line-height:1.45}
.tl-card:before{content:"";position:absolute;left:-18px;top:50%;transform:translateY(-50%);
 width:13px;height:13px;border-radius:50%;background:#fff;box-shadow:0 0 0 4px rgba(255,255,255,.4)}
/* Navegación */
.nav{position:fixed;bottom:22px;right:26px;display:flex;gap:10px;z-index:20}
.nav button{width:48px;height:48px;border-radius:50%;border:none;background:var(--teal);color:#fff;font-size:20px;
 cursor:pointer;box-shadow:var(--shadow);transition:.2s;display:flex;align-items:center;justify-content:center}
.nav button:hover{background:var(--teal-d);transform:translateY(-2px)}
.nav button:disabled{opacity:.35;cursor:default;transform:none}
.counter{position:fixed;bottom:30px;left:26px;color:rgba(255,255,255,.8);font-weight:600;font-size:14px;z-index:20;
 background:rgba(0,0,0,.25);padding:7px 14px;border-radius:20px}
.progress{position:fixed;top:0;left:0;height:5px;background:var(--primary-light);z-index:30;transition:width .3s}
.light .counter{color:var(--primary)}
/* Pantalla inicio */
#start{position:fixed;inset:0;z-index:40;background:var(--grad-dark);color:#fff;display:flex;flex-direction:column;
 align-items:center;justify-content:center;text-align:center;padding:6vw}
#start h1{margin-bottom:14px}
#start p{font-size:clamp(16px,2vw,22px);color:rgba(255,255,255,.85);margin-bottom:34px}
#start button{background:var(--teal);color:#fff;border:none;font-family:'League Spartan';font-weight:700;font-size:18px;
 padding:16px 38px;border-radius:40px;cursor:pointer;box-shadow:var(--shadow);transition:.2s}
#start button:hover{background:var(--teal-d);transform:scale(1.04)}
@media(max-width:760px){
 .cards,.steps,.stats,.two,.split,.sim-grid{grid-template-columns:1fr}
 .r-lbl{width:130px}
 .qgrid,.fgrid,.fgrid.cols3,.qa-card{grid-template-columns:1fr}
 .timeline:before,.tl-card:before{display:none}
 .tl-item{grid-template-columns:1fr;gap:4px}
 .tl-week{text-align:left;color:#fff}
}
</style>
</head>
<body>
<div class="progress" id="prog"></div>
<div id="deck">
${S.join("\n")}
</div>
<div id="start">
  <div class="badge">Webinar gratuito · 16 julio 2026</div>
  <h1>Simulación gerencial<br>en el aula</h1>
  <p>Del caso de papel al simulador digital</p>
  <p style="margin-top:-18px;margin-bottom:30px;color:rgba(255,255,255,.7);font-size:16px">Presenta: <strong>Alan González Curiel</strong></p>
  <button onclick="startDeck()">▶ INICIAR PRESENTACIÓN</button>
</div>
<div class="counter" id="counter"></div>
<nav class="nav">
  <button id="prev" onclick="go(-1)">‹</button>
  <button id="next" onclick="go(1)">›</button>
</nav>
<script>
const slides=[...document.querySelectorAll('.slide')];
let i=0;
function render(){
  slides.forEach((s,k)=>s.classList.toggle('active',k===i));
  document.getElementById('counter').textContent=(i+1)+' / '+slides.length;
  document.getElementById('prev').disabled=i===0;
  document.getElementById('next').disabled=i===slides.length-1;
  document.getElementById('prog').style.width=((i+1)/slides.length*100)+'%';
}
function go(d){i=Math.min(slides.length-1,Math.max(0,i+d));render();}
function startDeck(){document.getElementById('start').style.display='none';render();}
document.addEventListener('keydown',e=>{
  if(['ArrowRight','PageDown',' '].includes(e.key))go(1);
  if(['ArrowLeft','PageUp'].includes(e.key))go(-1);
  if(e.key==='Home'){i=0;render();}
  if(e.key==='End'){i=slides.length-1;render();}
  if(e.key==='f'||e.key==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}
});
render();
</script>
</body>
</html>`;

(async () => {
  const qr = await QRCode.toDataURL(WA_LINK, { margin: 1, width: 600,
    color: { dark: "#0a5183", light: "#ffffff" } });
  fs.writeFileSync("index.html", html.replace("__QR__", qr), "utf8");
  console.log("HTML OK -> index.html (" + S.length + " slides) | WhatsApp: " + WA_LINK);
})();
