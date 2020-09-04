const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
const http = require('http');
require('dotenv').config();

const host = 'localhost';
const port = process.env.PORT || 80;
const requestListener = function(req, res) {
  const fullPath =
    __dirname + '/public' + (req.url === '/' ? '/index.html' : req.url);
  console.log(
    'request url: ' + req.url,
    'file type: ' + path.extname(fullPath)
  );

  if (fs.existsSync(fullPath)) {
    fsPromises
      .readFile(fullPath)
      .then((contents) => {
        let contentType;

        switch (path.extname(fullPath)) {
          case '.html':
            contentType = 'text/html';
            break;
          case '.js':
            contentType = 'application/javascript';
            break;
          default:
            break;
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public');
        res.writeHead(200);
        res.end(contents);
      })
      .catch((err) => {
        res.writeHead(500);
        res.end(err);
        return;
      });
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
