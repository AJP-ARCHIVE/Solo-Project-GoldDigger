import fs from 'node:fs/promises'
import path from 'node:path'
//import { getInvestmentData } from './getInvestmentData.js'
// import { checkLogFileExits } from './checkLogFileExits.js'


// EventEmitter listener function 
export async function postNewInvestment(parsedBody) {
     console.log("LISTENER CALLED");
    console.log('parsed body', parsedBody)
    //console.log('investment', await getInvestmentData())
    console.log('cwd', process.cwd())
    console.log('price', parsedBody.price)
     console.log('amount', parsedBody.amount)

        const logDirectory  = path.join(process.cwd(), 'logs')
        const filePath = path.join(logDirectory, 'investmentLog.txt')
        console.log('filepath', filePath)
        try {
        //const investment = await getInvestmentData()
       
        // data format for writing to log gold transactions 
        const transactionPost = `purchase date: ${parsedBody.date}, gold-price per Oz: $${parsedBody.price}, amount paid: $${parsedBody.amount}, gold_amount: ${parsedBody.goldAmount} Oz`

        //console.log('exists', checkLogFileExits(filePath))
        
        // check to see if a log file already exists - if so use appendFile method
        await fs.appendFile(filePath, transactionPost + '\n')
        // if (await checkLogFileExits(filePath)) {
   
        //     await fs.appendFile(filePath,'\n' + transactionPost)
        //     return
        // }
        // // otherwise use writeFile to create a new log file
        // else {
        //     await fs.writeFile(filePath, transactionPost)
        //     return
        // }
        return
    }
    catch(err) {
        console.error(err)
    }
  
}