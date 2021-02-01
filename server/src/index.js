const http = require('http');
const {getUserInfo} = require('./mysql/connect');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log(123);
    getUserInfo();
    res.end('Hello Worldasd');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});