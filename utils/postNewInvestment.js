import fs from 'node:fs/promises'
import path from 'node:path'



// EventEmitter listener function 
export async function postNewInvestment(parsedBody) {
        // console.log("LISTENER CALLED");
        // console.log('parsed body', parsedBody)
    
        // console.log('cwd', process.cwd())
        // console.log('price', parsedBody.price)
        // console.log('amount', parsedBody.amount)

        const logDirectory  = path.join(process.cwd(), 'logs')
        const filePath = path.join(logDirectory, 'investmentLog.txt')
        console.log('filepath', filePath)
        try {
  
       
        // data format for writing to log gold transactions 
        const transactionPost = `purchase date: ${parsedBody.date}, gold-price per Oz: $${parsedBody.price}, amount paid: $${parsedBody.amount}, gold_amount: ${parsedBody.goldAmount} Oz`

        
    
        await fs.appendFile(filePath, transactionPost + '\n')

        return
    }
    catch(err) {
        console.error(err)
    }
  
}