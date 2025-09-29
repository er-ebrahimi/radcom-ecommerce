const { createServer } = require("https");
const { parse, } = require('url');
const next = require('next');
const fs = require("fs");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, });
const handle = app.getRequestHandler();
const HOST = 'local.radsup.com';
const PORT = 8990;

const httpsOptions = {
  key: fs.readFileSync("./certificates/site.key"),
  cert: fs.readFileSync("./certificates/site.crt"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, HOST, (err) => {
    if (err) {
      console.log(JSON.stringify(err, null, 2));
    };
    console.log(`Starting Next.js at https://${HOST}:${PORT}`);
  });
});