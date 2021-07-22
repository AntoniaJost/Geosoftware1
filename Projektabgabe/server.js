let http = require('http')
let host = "localhost"
let port = 3000 

let server = http.createServer(handleRequest)// create a server 

server.listen(port, host) // where the sever should listen 

function handleRequest (req, res) 
{
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write("Hallo")
    res.end()
}

console.log(`Server is running on ${host} and ${port}.`)