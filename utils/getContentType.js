export function getContentType(fileExtension) {
    
    const mimeTypes  = {
        '.html': 'text/html',
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml"
    }
    // return mime 'Content-Type' of file extension if a valid file extension is passed otherwise pass in default ('text/html')
    return mimeTypes[fileExtension.toLowerCase()] ?? 'text/html'
}