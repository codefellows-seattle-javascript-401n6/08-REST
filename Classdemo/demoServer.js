const http = require('http');
const PORT = process.env.PROT || 3000
const server = http.createServer((req, res) => {
    res.writeHead(200, {'content type': 'text/plan'})
    res.write('stuff')
    res.end()
});


server.listen(PORT,()=> console.log('localhost'+ PORT));