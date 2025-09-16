const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  // Handle homepage request
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);
  
  // Get file extension
  const extname = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        res.end('404 - File not found');
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      // Successful response
      res.writeHead(200, { 
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});