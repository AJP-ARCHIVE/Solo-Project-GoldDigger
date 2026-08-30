import http from 'node:http'
import { serveStaticFiles } from './utils/serveStaticFiles.js'
import { handleGold, handleInvestment } from  "./handlers/routeHandlers.js"


// assign a port 
const PORT = 8000 

// get directory of server.js 
const __dirname = import.meta.dirname 

// create a Node.js server
const server = http.createServer(async (req, res) => {


    if (req.url === '/api') {
        if (req.method === 'POST') {
            console.log("=== API REQUEST ===")
            return await handleInvestment(req, res)
        }
    }

    else if (req.url === '/gold-prices') {
        return await handleGold(res) // retrieve live data of gold prices

    }
    else {
         // if req.url is root retrieve/render static resources 
        await serveStaticFiles(req, res, __dirname) // utility function
    }


})

// Listen to port
server.listen(PORT, () => console.log(`Server connected. Listening to PORT: ${PORT}.`))
