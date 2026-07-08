# Plantilla de presentaciones — Simuladores de Negocios Colombia

Este es el **diseño base** para las próximas presentaciones/webinars.
Archivo de partida: [`plantilla-webinar.html`](plantilla-webinar.html) (diseño completo y funcional).

## Cómo crear una presentación nueva
1. **Duplica** `plantilla-webinar.html` con un nombre nuevo (ej. `webinar-marketing.html`).
2. **Edita las diapositivas**: cada slide es un bloque `<div class="slide"> … </div>`. Copia, borra o reordena bloques.
3. **Cambia las imágenes** en la carpeta `assets/` (mismos nombres) o crea nuevas y actualiza el `src`.
4. **Prueba local**: abre el archivo en el navegador (o `node server.js` → `http://localhost:8080`).
5. **Publica**: haz `git add . && git commit -m "nueva presentación" && git push`. GitHub Pages la sirve sola.

Navegación: flechas `←` `→` / barra espaciadora · `F` pantalla completa · botón **▶ Iniciar** en la portada.

---

## Sistema de diseño

### Colores (variables CSS en `:root`)
| Variable | Hex | Uso |
|----------|-----|-----|
| `--primary` | `#1f7ec4` | Azul principal, títulos, acentos |
| `--primary-light` | `#6cc3ef` | Azul claro, highlights |
| `--accent-green` | `#0e9aa8` | Teal (badges, fondos de sección) |
| `--accent-orange`| `#0a5e96` | Azul oscuro secundario |
| `--accent-purple`| `#575476` | Morado (variedad) |
| `--dark` | `#2c3e50` | Texto principal |
| `--light` | `#ecf0f1` | Fondos claros |
| `--white` | `#ffffff` | Blanco |

> Nota: la paleta se puede afinar a los Pantone del manual de marca (cyan `#0caae3`, azul `#0c71b8`, grises `#7f8080`/`#cdcbcb`) cambiando estas variables.

### Tipografía
- **Montserrat** (títulos y cuerpo) · **Open Sans** (apoyo) — cargadas desde Google Fonts.

---

## Componentes (copia y pega)

### Estructura de una diapositiva
```html
<div class="slide">
  <div class="slide-content">
    <div class="slide-header">
      <h1>🗺️ Título de la diapositiva</h1>
      <h2>Subtítulo opcional</h2>
      <div class="slide-number">02</div>
    </div>
    <!-- contenido aquí -->
  </div>
</div>
```

### Cuadrícula de tarjetas
```html
<div class="card-grid">
  <div class="card"><div class="card-icon">📝</div><h3>Título</h3><p>Descripción.</p></div>
  <div class="card bd-green"><div class="card-icon">📊</div><h3>Título</h3><p>Descripción.</p></div>
</div>
```
Modificadores de borde: `bd-green`, `bd-blue`, `bd-purple` (color del filo superior).

### Dos columnas (texto + imagen)
```html
<div class="two-col">
  <div class="card" style="padding:0;overflow:hidden">
    <img src="assets/mi-imagen.jpg" style="width:100%" loading="lazy">
    <div style="padding:20px 24px">
      <span class="badge badge-green">Etiqueta</span>
      <p>Texto descriptivo.</p>
    </div>
  </div>
  <div class="card"><h3>Otra columna</h3><p>…</p></div>
</div>
```

### Comparativa (antes vs después)
```html
<div class="cmp">
  <div class="cmp-head old">❌ Método tradicional</div>
  <div class="cmp-head new">✅ Con simulador</div>
  <div class="cmp-cell">Punto tradicional…</div>
  <div class="cmp-cell">Punto con simulador…</div>
</div>
```

### Cadena de valor / pasos
```html
<div class="value-chain">
  <div class="chain-box"><span class="cb-emoji">📥</span>Reciben un reto</div>
  <div class="chain-arrow">→</div>
  <div class="chain-box"><span class="cb-emoji">🧠</span>Toman decisiones</div>
</div>
```

### Agenda numerada
```html
<div class="ag-item"><div class="ag-num">1</div><div>Punto de la agenda</div></div>
```

### Portada y cierre
- **Portada**: usa `assets/logo-portada.png`.
- **Cierre**: incluye `assets/qr.png` (QR de WhatsApp) + datos de contacto.
Reemplaza esos dos archivos para cambiar logo y QR.

---

## Imágenes incluidas en `assets/`
`logo-portada.png`, `qr.png`, `equipo.jpg`, `dashboard.jpg`, `caso.jpg`, `piloto.jpg`,
`companygame.jpg`, `interfaz-simulador.png`, `sim-evolution.jpg`, `sim-validate.jpg`,
`sim-project.jpg`, `sim-agile.jpg`.

Reemplázalas manteniendo el nombre (o usa nuevas y actualiza el `src` en el HTML).
