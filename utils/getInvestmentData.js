import path from 'node:path'
import fs from 'node:fs/promises'
import { checkLogFileExits } from './checkLogFileExits.js'

// only invoked when a investmentLog file exists 
export async function getInvestmentData() {
    //return 'invested'
    try {
        const logDirectory = path.join(process.cwd(), 'logs')
        const filePath = path.join(logDirectory, 'investmentLog.txt')
   
        const logContent = await fs.readFile(filePath, 'utf-8') // read text file 
        console.log(logContent)
        return logContent
    }
    catch (err) {
        console.error(err)
    }
}