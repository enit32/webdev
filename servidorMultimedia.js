"use strict"; /**

Servidor Express para contenido multimedia con soporte de streaming por rangos (HTTP Range).

Ideal para LAN/WiFi doméstica


Soporta salto en la reproducción (seek) y reanudación


Envía cabeceras eficientes (206 Partial Content, Cache-Control, ETag, Last-Modified)


Uso:

1. npm init -y && npm install express



2. node server.js



3. En un cliente de la misma red: http://<IP_DEL_SERVIDOR>:3000/video/sample.mp4 */




const express = require("express"); const fs = require("fs"); const path = require("path");

const PORT = Number(process.env.PORT) || 3000; const HOST = process.env.HOST || "0.0.0.0"; const MEDIA_DIR = process.env.MEDIA_DIR || path.join(__dirname, "media");

const app = express();

const MIME = new Map([ [".mp4", "video/mp4"], [".m4v", "video/mp4"], [".mov", "video/quicktime"], [".webm", "video/webm"], [".mkv", "video/x-matroska"], [".mp3", "audio/mpeg"], [".m4a", "audio/mp4"], [".aac", "audio/aac"], [".wav", "audio/wav"], ]);

function safeJoin(base, requested) { const safePath = path.normalize(requested).replace(/^\+|^/+/, ""); const fullPath = path.join(base, safePath); if (!fullPath.startsWith(base)) { throw new Error("Ruta no permitida"); } return fullPath; }

function buildETag(stats) { return 'W/"' + stats.size + "-" + Number(stats.mtimeMs).toString(16) + '"'; }

function serveFile(req, res, filePath) { fs.stat(filePath, (err, stats) => { if (err) { res.status(err.code === "ENOENT" ? 404 : 500).send("Error: " + (err.code || "INTERNAL")); return; }

const ext = path.extname(filePath).toLowerCase();
const contentType = MIME.get(ext) || "application/octet-stream";
const etag = buildETag(stats);
const lastModified = stats.mtime.toUTCString();

if (req.headers["if-none-match"] === etag) {
  res.status(304).set({
    ETag: etag,
    "Last-Modified": lastModified,
    "Cache-Control": "public, max-age=3600",
    "Accept-Ranges": "bytes",
  }).end();
  return;
}

const ifModifiedSince = req.headers["if-modified-since"];
if (ifModifiedSince && new Date(ifModifiedSince) >= stats.mtime) {
  res.status(304).set({
    ETag: etag,
    "Last-Modified": lastModified,
    "Cache-Control": "public, max-age=3600",
    "Accept-Ranges": "bytes",
  }).end();
  return;
}

const range = req.headers.range;
if (!range) {
  res.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": stats.size,
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=3600",
    ETag: etag,
    "Last-Modified": lastModified,
  });
  fs.createReadStream(filePath).pipe(res);
  return;
}

const match = range.match(/bytes=(\d*)-(\d*)/);
if (!match) {
  res.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
  res.end();
  return;
}

let start = match[1] ? parseInt(match[1], 10) : 0;
let end = match[2] ? parseInt(match[2], 10) : stats.size - 1;

if (isNaN(start) || isNaN(end) || start > end || start >= stats.size) {
  res.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
  res.end();
  return;
}

const chunkSize = end - start + 1;

res.writeHead(206, {
  "Content-Range": `bytes ${start}-${end}/${stats.size}`,
  "Accept-Ranges": "bytes",
  "Content-Length": chunkSize,
  "Content-Type": contentType,
  "Cache-Control": "public, max-age=3600",
  ETag: etag,
  "Last-Modified": lastModified,
});

fs.createReadStream(filePath, { start, end }).pipe(res);

}); }

// Página principal de prueba app.get("/", (req, res) => { const page = `<!doctype html>

<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Servidor LAN de Video con Express</title>
  <style>body{font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;margin:2rem;line-height:1.4}code{background:#f4f4f4;padding:.2rem .4rem;border-radius:6px} .hint{opacity:.7}</style>
</head>
<body>
  <h1>Servidor LAN de Video (Express + HTTP Range)</h1>
  <p class="hint">Coloca tus archivos en <code>${MEDIA_DIR.replace(/\\\\/g,'/')}</code> y accede por <code>/video/archivo.mp4</code></p>
  <video controls width="720" src="/video/sample.mp4"></video>
  <p class="hint">Ejemplo de URL desde otro dispositivo de la LAN: <code>http://IP_DEL_SERVIDOR:${PORT}/video/sample.mp4</code></p>
</body>
</html>`;
  res.status(200).send(page);
});// Ruta para videos/audio app.get("/video/:file", (req, res) => { try { const filePath = safeJoin(MEDIA_DIR, req.params.file); serveFile(req, res, filePath); } catch (e) { res.status(400).send("Ruta inválida"); } });

app.listen(PORT, HOST, () => { console.log(Servidor multimedia Express en http://${HOST}:${PORT}); console.log(Carpeta de medios: ${MEDIA_DIR}); try { if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true }); const sample = path.join(MEDIA_DIR, "sample.mp4"); if (!fs.existsSync(sample)) { fs.writeFileSync(path.join(MEDIA_DIR, "README.txt"), "Coloca aquí tus archivos multimedia"); } } catch (_) {} });

