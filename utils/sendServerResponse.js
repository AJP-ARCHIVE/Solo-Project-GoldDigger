import fs from 'node:fs'


export function sendServerResponse(res, status, contentType, content) {
    res.statusCode = status 
    res.setHeader('Content-Type', contentType)
    res.end(content)
}