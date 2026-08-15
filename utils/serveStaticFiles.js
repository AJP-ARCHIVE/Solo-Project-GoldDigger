import path from 'node:path'
import fs from 'node:fs/promises'
import { getContentType } from './getContentType.js'
import { sendServerResponse } from './sendServerResponse.js'


// Serve static files from public folder using base directory of module retrieving the static resources 
export async function serveStaticFiles(req, res, baseDirectory) {

    // get directory to public folder 
    const publicDirectory = path.join(baseDirectory, 'public')
    
    // compose absolute file path to file in public folder 
    // use req.url as the file or index.html if the req.url is equal to the root 
    const filePath = path.join(publicDirectory, req.url === '/' ? 'index.html' : req.url)

    // get file extension to configure Content-Type
    const fileExtension = path.extname(filePath)

    // get file's 'Content-Type' using file extension 
     const contentType = getContentType(fileExtension)

   try {
        // read static file 
        const content = await fs.readFile(filePath) 
    
        // arguments: res, status, contentType, content
        sendServerResponse(res, 200, contentType, content)
   }
   catch (error) {
        console.error(error)
        // if no file is found (Error No ENTry) serve '404.html' page
        if(error.code === 'ENOENT') {
            // get filepath to error page
            const errorFilePath = path.join(publicDirectory, '404.html')
            // send server response with file
            const errorContent = await fs.readFile(errorFilePath)
            // arguments: res, status, contentType, content
            sendServerResponse(res, 404, 'text/html', errorContent)
        }
        else {
            // other error 'e.g. - server' - send server response
            sendServerResponse(res, 500, 'text/html', `Error: ${error}`)
        }
   }


}