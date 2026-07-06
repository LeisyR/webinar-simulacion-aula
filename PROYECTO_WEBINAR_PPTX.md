# Proyecto: Presentación Webinar — Simulación Gerencial en el Aula

## Objetivo
Generar y mantener una presentación PPTX profesional de 27 slides para un webinar de 45 minutos dirigido a directores de programa y profesores de Administración de Empresas en universidades colombianas. El producto que se vende son simuladores de negocios (CompanyGame, SimVenture Evolution/Validate, SimProject, SimAgile).

## Stack técnico
- **Generador:** Node.js + pptxgenjs
- **Íconos:** react-icons/fa + sharp (para renderizar SVG a PNG)
- **Formato de salida:** .pptx (compatible con PowerPoint, Google Slides, Keynote)
- **Dependencias:** `npm install pptxgenjs react-icons sharp react react-dom`

## Paleta de colores
| Variable | Hex | Uso |
|----------|---------|-----|
| D (Dark/Navy) | #1C213C | Fondos oscuros, títulos, texto principal |
| T (Teal) | #49C5B1 | Acentos, fondos secundarios, highlights |
| W (White) | #FFFFFF | Fondos claros, texto sobre oscuro |
| L (Light) | #F5F7FA | Fondos alternados en tablas/cards |
| M (Muted) | #5A5F70 | Texto secundario, descripciones |
| O (Orange) | #F97316 | Badges especiales ("Más popular") |

## Tipografía
- **Fuente:** Arial (única, sin variaciones de familia)
- **Títulos de slide:** 28px bold, color D o W según fondo
- **Subtítulos:** 14-16px, color M o T
- **Cuerpo:** 11-14px, color D o M
- **Stats grandes:** 42-96px bold, color T

## Diseño
- **Layout:** 16:9 (LAYOUT_16x9)
- **Fondos alternados:** se alternan slides con fondo D (oscuro), W (blanco), T (teal) y L (gris claro) para mantener dinamismo visual
- **Cards:** ROUNDED_RECTANGLE con rectRadius 0.08-0.15 y shadow exterior sutil
- **Íconos:** react-icons/fa renderizados como PNG via sharp, colocados en círculos (OVAL) con fondo D o T
- **Notas del presentador:** cada slide tiene speaker notes con guion detallado y timing

## Datos del webinar
- **Título:** "Simulación gerencial en el aula: del caso de papel al simulador digital"
- **Fecha:** Jueves 16 de julio, 2026
- **Hora:** 10:00 AM (hora Colombia, COT UTC-5)
- **Duración:** 45 minutos
- **Plataforma:** Zoom
- **Presentador:** 1 persona (solo)
- **Audiencia:** Directores de programa + profesores de Simulación Gerencial, Estrategia y Emprendimiento
- **Piloto gratuito:** máximo 30 estudiantes por piloto

---

## Estructura de slides (27 slides)

### BLOQUE 1: APERTURA (slides 1-3, 0:00-2:00)

**Slide 1 — Portada** (fondo: D)
- Fondo navy con rectángulo teal semitransparente
- Título: "Simulación gerencial en el aula" (40px, blanco, bold)
- Subtítulo: "Del caso de papel al simulador digital" (20px, teal)
- Info: "Webinar gratuito · Jueves 16 de julio, 2026 · 10:00 AM (hora Colombia)"
- Presenter: "[Tu nombre] · [Empresa]"
- **Guion:** "Buenos días. Gracias por acompañarnos. Soy [nombre] de [empresa]. Hoy vamos a ver cómo llevar la simulación gerencial al siguiente nivel. Al final hay demo en vivo y propuesta de piloto gratuito. Pueden hacer preguntas en el chat."

**Slide 2 — Agenda** (fondo: W)
- Título: "Agenda" (36px)
- Lista numerada 01-10 con filas alternadas (L/W):
  01. El reto: teoría vs práctica en Administración
  02. ¿Qué exige CNA sobre aprendizaje activo?
  03. Qué es un simulador de negocios y cómo funciona
  04. Demo en vivo: CompanyGame (15 min)
  05. Nuestros 5 simuladores: cuál para cada asignatura
  06. Implementación paso a paso: timeline de un semestre
  07. Resultados reales y casos de éxito
  08. Alineación con acreditación CNA
  09. Piloto gratuito y próximos pasos
  10. Preguntas y respuestas
- **Guion:** "Miren todo lo que vamos a cubrir. Es un recorrido completo: del problema a la solución, con demo en vivo, casos reales y propuesta de piloto. Vamos."

**Slide 3 — Quiénes somos** (fondo: W)
- Dos cards lado a lado:
  - Izquierda (fondo L): "Nuestra misión" — "Ayudar a las facultades de Administración de Empresas en Colombia a cerrar la brecha entre teoría y práctica, integrando simuladores de negocios en sus asignaturas."
  - Derecha (fondo D): "Nuestros números" — 5 simuladores especializados, 30+ países donde se usan, 162 facultades en ASCOLFA (mercado), 100% soporte en español
- **Guion:** "Somos distribuidores autorizados de simuladores de negocios para universidades en Colombia. 5 simuladores, 30+ países, ASCOLFA agrupa 162 facultades — ese es nuestro mercado. Nuestro diferencial: estamos en Colombia, hablamos su idioma, damos soporte local."

### BLOQUE 2: EL PROBLEMA (slides 4-8, 2:00-8:30)

**Slide 4 — Stat impactante** (fondo: D)
- Número grande: "92%" (96px, teal, centrado)
- Descripción: "de los egresados de Administración de Empresas dicen que nunca tomaron una decisión gerencial real antes de graduarse"
- Caja inferior: "El estudiante analiza lo que OTROS hicieron. Pero nunca decide, nunca arriesga, nunca falla."
- **Guion:** "Piensen en esto: la gran mayoría de sus egresados se gradúan sin haber tomado una sola decisión gerencial real. Médicos practican con pacientes simulados. Pilotos de avión pasan cientos de horas en simulador. ¿Y los futuros gerentes de Colombia?"

**Slide 5 — Comparación** (fondo: W)
- Título: "El aula de hoy vs. el aula con simulación"
- Dos cards:
  - Izquierda (fondo L): "Método tradicional" — Leer casos escritos hace 10-20 años; Analizar decisiones de OTROS (Apple, Netflix, Zara); Debate y presentación en clase; Examen teórico; Sin consecuencias reales; Difícil medir competencias gerenciales
  - Derecha (fondo D): "Con simulador" — Dirigir TU propia empresa virtual; Tomar TUS decisiones con datos reales; Competir contra compañeros; Resultados inmediatos cada ronda; Consecuencias reales (virtuales) de cada error; Dashboard con métricas de aprendizaje
- **Guion:** "No digo que los casos sean malos. Son excelentes. Pero combinados con simulador, el aprendizaje se multiplica. La pregunta no es caso O simulador. Es caso Y simulador."

**Slide 6 — Qué exige CNA** (fondo: W)
- Título: "¿Qué exige el CNA sobre aprendizaje activo?"
- Caja amarilla con ícono bombilla: "Condición de Calidad — CNA: 'Estrategias de enseñanza y aprendizaje que promuevan la participación activa del estudiante en su proceso de formación y el desarrollo de competencias.'"
- Subtítulo: "Esto significa que el CNA espera EVIDENCIA de:"
- 4 items con check teal: Aprendizaje activo documentado, Competencias medibles, Trabajo colaborativo, Uso de tecnología educativa
- **Guion:** "El CNA exige estrategias de aprendizaje activo. No es opcional — es condición de calidad. ¿Qué herramienta cumple las cuatro al mismo tiempo? Un simulador de negocios."

**Slide 7 — Presión de acreditación** (fondo: T)
- Ícono escudo centrado
- Título: "La presión de la acreditación"
- Subtítulo: "Los pares evaluadores preguntan:"
- 4 preguntas en cajas semitransparentes: "¿Cómo desarrollan competencias gerenciales?", "¿Qué evidencia tienen de aprendizaje activo?", "¿Qué herramientas tecnológicas usan?", "¿Cómo miden el impacto de sus estrategias pedagógicas?"
- **Guion:** "Si su respuesta es 'damos clase magistral y ponemos exámenes', tienen un problema. Si usan simulador y tienen datos, tienen una ventaja."

**Slide 8 — Quote estudiante** (fondo: D)
- Ícono comentario centrado
- Quote: "Aprendí más en 8 rondas de simulación que en todo un semestre de clases magistrales. Por primera vez sentí que estaba tomando decisiones de verdad."
- Atribución: "— Estudiante de Administración de Empresas, 8vo semestre"
- **Guion:** "Cuando el estudiante 'quiebra' su empresa virtual por no controlar el flujo de caja, ese aprendizaje no se olvida nunca."

### BLOQUE 3: LA SOLUCIÓN (slides 9-14, 8:30-15:00)

**Slide 9 — Qué es un simulador** (fondo: W)
- 3 cards verticales con ícono en círculo oscuro:
  - Plataforma 100% web (ícono laptop)
  - Empresa virtual realista (ícono engranajes)
  - Aprendizaje medible (ícono graduación)
- **Guion:** "Tres componentes: plataforma web, empresa virtual con estados financieros reales, y dashboard del profesor."

**Slide 10 — Cómo funciona CompanyGame** (fondo: T)
- 4 cards verticales con pasos numerados en círculos:
  1. Forman equipos (4-5 estudiantes)
  2. Toman decisiones (precio, producción, I+D, marketing, RRHH)
  3. Compiten (el simulador procesa todas las decisiones)
  4. Presentan (board meeting final)
- **Guion:** "Un ciclo típico: 6-10 rondas. Cada ronda puede ser una sesión de clase."

**Slide 11 — Decisiones que toman** (fondo: W)
- 5 filas alternadas:
  - Mercadeo: Precio de venta, inversión publicitaria, canales, posicionamiento
  - Producción: Volumen, capacidad de planta, control de calidad, inventarios
  - Finanzas: Inversión en I+D, créditos, dividendos, flujo de caja
  - Recursos Humanos: Contratación, salarios, capacitación, bienestar
  - Estrategia: Segmento, diferenciación vs costo, expansión, alianzas
- **Guion:** "No es un jueguito. Los estudiantes toman decisiones en las 5 áreas funcionales de una empresa real."

**Slide 12 — Competencias** (fondo: W)
- 6 items con checks teal:
  - Pensamiento estratégico
  - Toma de decisiones bajo incertidumbre
  - Trabajo en equipo
  - Análisis financiero
  - Pensamiento sistémico
  - Competitividad y adaptación
- **Guion:** "Todas son competencias que el CNA evalúa y que el mercado laboral exige."

**Slide 13 — Dashboard del profesor** (fondo: W)
- 5 items con ícono medalla:
  - Ranking en tiempo real
  - Decisiones por equipo y ronda
  - Estados financieros por empresa
  - Métricas exportables (rúbricas, CNA)
  - Historial completo
- **Guion:** "No es solo 'los estudiantes juegan': el profesor tiene control total."

**Slide 14 — Rol del profesor** (fondo: D)
- 4 filas con cajas teal semitransparentes:
  - "NO es un técnico de sistemas" → "Es web e intuitivo. Capacitación 2 horas."
  - "ES un facilitador del aprendizaje" → "Guía la discusión post-ronda."
  - "Diseña la integración curricular" → "Rondas, semanas, % evaluación."
  - "Evalúa con datos reales" → "Dashboard para calificar."
- **Guion:** "Su rol cambia de expositor a facilitador. Eso es pedagogía de alto nivel."

### BLOQUE 4: DEMO EN VIVO (slide 15, 15:00-30:00)

**Slide 15 — Transición demo** (fondo: D)
- Ícono cohete centrado
- Título: "Demo en vivo" (44px)
- Subtítulo: "Vamos a dirigir una empresa juntos — 15 minutos"
- **Guion demo (15 min):**
  1. (2 min) Mostrar interfaz del estudiante: dashboard, estados financieros iniciales
  2. (3 min) Tomar decisiones con la audiencia: "¿Subimos o bajamos el precio?"
  3. (2 min) Procesar ronda y mostrar resultados: market share, ingresos, utilidad
  4. (2 min) Mostrar ranking entre equipos
  5. (3 min) Mostrar dashboard del profesor
  6. (3 min) Mostrar un error a propósito: producir el triple sin demanda → efecto en inventario y flujo de caja
  - Tips: hacer preguntas al chat, enfatizar competencia, cerrar con dashboard del profesor

### BLOQUE 5: IMPLEMENTACIÓN (slides 16-18, 30:00-36:00)

**Slide 16 — 5 simuladores** (fondo: W)
- 5 filas con color-coded dots:
  - CompanyGame (teal) → Gestión integral / Estrategia → Simulación Gerencial, Dirección Estratégica, Mercadeo, Finanzas
  - SimVenture Evolution (verde) → Emprendimiento → Creación de Empresa, Plan de Negocio
  - SimVenture Validate (naranja) → Innovación / Lean Startup → Modelos de Negocio, Design Thinking
  - SimProject (azul) → Gerencia de Proyectos → Formulación y Evaluación de Proyectos
  - SimAgile (morado) → Metodologías Ágiles → Transformación Digital, Scrum
- **Guion:** "El simulador debe encajar en una asignatura EXISTENTE. No necesitan crear una nueva."

**Slide 17 — Timeline del semestre** (fondo: T)
- 7 filas con timeline:
  - Semana 0: Capacitación al profesor (2h)
  - Semana 1: Clase introductoria
  - Semana 2-3: Ronda de práctica (sin nota)
  - Semana 4-11: Rondas 1-8 (con nota, 1/semana, discusión post-ronda)
  - Semana 12: Presentación final (board meeting)
  - Semana 13: Evaluación con datos del dashboard
  - Semana 14-16: Resultados y métricas para acreditación
- **Guion:** "El esfuerzo del profesor es mínimo: 1 hora por semana. El simulador hace el trabajo pesado."

**Slide 18 — Preocupaciones comunes** (fondo: W)
- 5 filas Q&A:
  - "No soy experto en tecnología" → Web e intuitivo, capacitación 2h
  - "No hay presupuesto" → Piloto 100% gratuito
  - "Ya usamos otro simulador" → Complemento, nichos diferentes
  - "Los estudiantes no lo tomarán en serio" → Competencia genera motivación natural
  - "No tengo tiempo para cambiar mi curso" → Se integra, no reemplaza. 1h/semana
- **Guion:** "Respuesta corta a todas: piloto gratis, capacitación 2h, no hay que cambiar el plan de estudios."

### BLOQUE 6: RESULTADOS Y CASOS (slides 19-22, 36:00-40:00)

**Slide 19 — Big stats** (fondo: D)
- 4 cards con números grandes:
  - 4.2/5.0 — Nota promedio componente práctico
  - 92% — Satisfacción estudiantil
  - 3x — Profesores pidieron usar el simulador
  - 85% — De pilotos se convierten en licencias
- **Guion:** "Los números hablan. No necesitan confiar en mí: confíen en los datos."

**Slide 20 — Caso de éxito: Dirección Estratégica** (fondo: W)
- Card con dos secciones:
  - Izquierda: Contexto (profesor de Dir. Estratégica, 35 estudiantes, 8vo sem, antes solo casos Harvard) + Implementación (CompanyGame 40% evaluación, 8 rondas, discusión post-ronda, board meeting final)
  - Derecha: 5 resultados con checks (nota subió +0.6, eval docente 4.0→4.7, 92% satisfacción, 3 profes más pidieron, datos para CNA)
- **Guion:** "El profesor no cambió su curso: lo potenció con una herramienta."

**Slide 21 — Caso de éxito: Emprendimiento** (fondo: T)
- Card con contexto + 5 resultados:
  - Profesora de Creación de Empresa usó SimVenture Evolution, 4to semestre, 12 semanas
  - Resultados: entendieron flujo de caja, aprobación 78%→94%, usaron para planes de negocio reales, centro de emprendimiento pidió integrar, 3 equipos crearon microempresas reales
- **Guion:** "Cuando tu empresa virtual quiebra porque no controlaste la caja, ese aprendizaje no se olvida."

**Slide 22 — Testimonial profesor** (fondo: D)
- Ícono comentario
- Quote: "Llevo 10 años dictando Simulación Gerencial con Excel y casos de papel. El semestre que integré CompanyGame fue el mejor de mi carrera docente. Los estudiantes aprendieron más, yo trabajé menos, y tengo datos para demostrarlo."
- Atribución: "— Profesor de Simulación Gerencial, Programa de Administración de Empresas"
- **Guion:** "'Aprendieron más, trabajé menos, tengo datos.' Eso resume todo."

### BLOQUE 7: ACREDITACIÓN (slide 23, 40:00-41:00)

**Slide 23 — Evidencia para CNA** (fondo: W)
- 6 items con ícono escudo:
  - Aprendizaje activo documentado (dashboard con registro de decisiones)
  - Competencias medibles (rúbricas basadas en desempeño)
  - Evaluación por resultados (comparación entre equipos)
  - Trabajo colaborativo (registro de equipos y roles)
  - Uso de tecnología (plataforma web, analytics)
  - Satisfacción estudiantil (encuestas + engagement)
- **Guion:** "Todo sale del dashboard sin trabajo adicional del profesor. Evidencia lista para el informe."

### BLOQUE 8: CIERRE (slides 24-27, 41:00-45:00)

**Slide 24 — Piloto gratuito** (fondo: T)
- Título: "Piloto gratuito" (40px)
- Subtítulo: "1 curso · 1 semestre · sin costo · sin compromiso"
- 6 items con checks blancos:
  - Acceso completo al simulador para el curso seleccionado
  - Capacitación al profesor: sesión de 2 horas
  - Soporte técnico durante todo el semestre
  - Dashboard completo con métricas exportables
  - Guía de integración curricular personalizada
  - Sin costo y sin compromiso — si no funciona, no perdió nada
- Pie: "¿Qué necesitamos? Un curso + un profesor motivado + máximo 30 estudiantes"
- **Guion:** "El 85% de nuestros pilotos se convierten en licencias pagas. Eso les dice todo."

**Slide 25 — Próximos pasos** (fondo: W)
- 5 pasos con círculos numerados:
  1. Hoy → Escríbame al chat o por correo
  2. Esta semana → Le envío acceso de prueba
  3. Semana 1 → Capacitación de 2 horas
  4. Semana 2 → Clase introductoria con estudiantes
  5. Semana 3+ → ¡Arranca la simulación!
- **Guion:** "Del primer contacto a la primera ronda: 2-3 semanas."

**Slide 26 — Q&A** (fondo: D)
- Ícono pregunta centrado
- Título: "Preguntas y respuestas"
- Subtítulo: "Escriban sus preguntas en el chat de Zoom"
- **FAQs en notas:**
  - ¿En qué idioma? CompanyGame en español, SimVenture en inglés con guías en español
  - ¿Necesita internet? Sí, 100% web
  - ¿Funciona con Moodle? Plataforma independiente, resultados exportables
  - ¿Tiempo de implementación? Capacitación 2h, accesos 48h, primera ronda la semana siguiente
  - ¿Cuántos estudiantes? Máximo 30 por piloto
  - ¿Versión móvil? Responsive, pero recomendamos computador

**Slide 27 — Gracias** (fondo: D)
- Título: "¡Gracias!" (48px)
- Card teal semitransparente con datos:
  - [Tu nombre]
  - [Cargo] · [Empresa]
  - [correo@empresa.com]
  - [+57 XXX XXX XXXX] · WhatsApp
  - LinkedIn: [perfil]
- Pie: "Solicite su piloto gratuito: [link de agendamiento]"
- **Guion:** "Les envío grabación y presentación por correo. ¡Excelente día!"

---

## Reglas de diseño para Claude Code

1. **Alternar fondos:** D (oscuro) → W (blanco) → T (teal) → W → D. No poner dos slides del mismo fondo seguidas.
2. **Cards con sombra:** Usar shadow outer con blur 8, offset 3, opacity 0.12 en todas las cards.
3. **Íconos en círculos:** OVAL de fondo D con ícono blanco adentro. O viceversa.
4. **Filas alternadas:** En listas/tablas, alternar L (#F5F7FA) y W.
5. **Speaker notes:** Cada slide DEBE tener notas con guion detallado y timing.
6. **Máximo texto por slide:** No más de 6-7 bullets o items por slide. Si hay más, dividir en 2 slides.
7. **Fuente única:** Arial en todo. Sin excepciones.
8. **Stats grandes:** Los números deben ser legibles desde lejos (42-96px). Pocos por slide.

## Cómo ejecutar
```bash
npm install pptxgenjs react-icons sharp react react-dom
node generate_webinar.js
```

El script genera `Webinar1_V2_Completo.pptx` en el directorio de trabajo.

## Modificaciones frecuentes
- **Cambiar fecha/hora:** Slide 1, campo de info
- **Cambiar nombre/empresa:** Slides 1 y 27
- **Agregar/quitar slides:** Respetar la regla de alternancia de fondos
- **Cambiar datos de resultados:** Slides 19, 20, 21 (actualizar con datos reales cuando haya pilotos)
- **Actualizar testimoniales:** Slides 8 y 22 (reemplazar con testimonios reales)
- **Ajustar límite de estudiantes:** Slide 24 (actualmente "máximo 30 estudiantes")
