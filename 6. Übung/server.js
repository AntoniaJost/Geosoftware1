let http = require('http')
let host = "localhost"
let port = 5000 

let server = http.createServer(handleRequest) // create a server 

server.listen(port, host) // where the sever should listen 

function handleRequest (req, res) 
{
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write ("Hello")
    res.end()
}

console.log(`Server is running on ${host}:${port}`)
