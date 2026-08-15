import fs from 'node:fs/promises'

export async function checkLogFileExits(filePath) {
    try {
        await fs.access(filePath) 
        console.log('File exists')
        return true 
    }
    catch {
        console.log('File does not exist', false)
        return false 
    }
}