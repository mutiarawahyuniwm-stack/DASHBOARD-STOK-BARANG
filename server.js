const http = require('http');
const fs   = require('fs');
const path = require('path');

const MIME = { html:'text/html', json:'application/json', js:'text/javascript', css:'text/css' };
const ROOT = __dirname;

http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = filePath.split('.').pop();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(8080, '127.0.0.1', () => console.log('Server running at http://127.0.0.1:8080'));
