import fs from 'node:fs'


export function sendServerResponse(res, status, contentType, content) {
    res.statusCode = status 
    res.setHeader('Content-Type', contentType)
    // if (contentType === 'text/plain') {
    //     // have log file downloaded as an attachment 
    //     res.setHeader('Content-Disposition', 'attachment; filename="Gold-Transaction.txt')
    // }
    res.end(content)
}