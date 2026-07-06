// Servidor web local para revisar la presentación
const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 8080;

const types = { ".html":"text/html", ".png":"image/png", ".pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation", ".js":"text/javascript", ".css":"text/css" };

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split("?")[0]);
  if (url === "/") url = "/index.html";
  const file = path.join(__dirname, url);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end("No encontrado"); return; }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, () => console.log("Presentación en línea: http://localhost:" + PORT));
