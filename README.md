# Webinar — Simulación gerencial en el aula

Presentación web para el webinar de **Simuladores de Negocios Colombia**:
*"Del caso de papel al simulador digital"*.

## Ver la presentación
- **En línea (GitHub Pages):** se publica automáticamente desde `index.html`.
- **Local:** abre `index.html` en el navegador, o corre `node server.js` y entra a `http://localhost:8080`.

Navegación: flechas `←` `→` o barra espaciadora · `F` para pantalla completa.

## Contenido
- 30 diapositivas navegables, identidad visual oficial (colores Pantone 2995/3553, tipografías League Spartan + Merriweather Sans, logo).
- Simuladores: CompanyGame, SimVenture Evolution, SimVenture Validate, SimProject, SimAgile.

## Regenerar
```bash
npm install pptxgenjs qrcode react-icons sharp react react-dom
node generate_html.js      # genera index.html (versión web)
node generate_webinar.js   # genera el .pptx (PowerPoint)
```

Presenta: **Alan González Curiel** · Contacto: fidelizacion@simuladoresdenegocios.co
