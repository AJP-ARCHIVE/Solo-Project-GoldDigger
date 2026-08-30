import { getFetchedData } from "../utils/getFetchedData.js"
import { sendServerResponse } from "../utils/sendServerResponse.js"
import { parseJSONBody } from "../utils/parseJSONBody.js"
import { investmentEvents } from "../events/investmentEvents.js"
import PDFDocument from 'pdfkit' // pdf generator 



// handling live gold price data
export async function handleGold(res) {
    try {
        res.statusCode = 200
        res.setHeader('content-type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')

        // retrieve price from gold api
        const { price, lastUpdated} = await getFetchedData()
        res.write(`data: ${JSON.stringify({price, lastUpdated})}\n\n`) // send data to client 

        // invoke data fetch every 30 seconds to prevent api fetch spam
        setInterval(async () => {
            const { price, lastUpdated } = await getFetchedData()
            res.write(`data: ${JSON.stringify({price, lastUpdated})}\n\n`)
      
        }, 30000)
    }
    catch (err) {
        console.error(err)
    }
}

// handling post 'investment'
export async function handleInvestment(req, res) {
    // get submitted investment details from 'POST' method
  
    try {
        const parsedBody = await parseJSONBody(req)
   
    
        // emit the event 
        //console.log("ABOUT TO EMIT");

        investmentEvents.emit('gold-investment', parsedBody)

        //console.log("EMIT FINISHED");

  
        // format parsedBody data to return to client 
        const formattedParsedBody = {
            date_of_purchase: parsedBody.date,
            gold_price: `$${parsedBody.price}`,
            amount_paid: `$${parsedBody.amount}`,
            gold_amount: (parsedBody.amount / parsedBody.price).toFixed(4)
        }

        // generate pdf with parsed body using npm pdfkit
        const doc = new PDFDocument()

        // set headers for http response
        res.setHeader('Content-Type', 'application/pdf')

        res.setHeader("Content-Disposition", "attachment; filename=Gold-Transaction.pdf")
    

        // pipe pdf stream to http as response
        doc.pipe(res)

        // format pdf
        doc.fontSize(12).font('Helvetica-Bold')
        doc.text('Gold Transaction Summary', { align: 'center' });
        
        // add space after heading 
        doc.moveDown(4)

        doc.font('Helvetica')

        // generate table -- DOCS: https://pdfkit.org/docs/table.html
        doc.table({
            rowStyles: (i) => {
                return i < 1
                ? { border: [0, 0, 2, 0], borderColor: "black" }
                : { border: [0, 0, 1, 0], borderColor: "#aaa" };
            },
            data: [
                ['Date', 'Gold Price per Oz', 'Amount Paid', 'Gold Amount (Oz)'],
                // convert date format to mm/dd/yyyy
                [new Intl.DateTimeFormat('en-US', {timezone: 'UTC'}).format(new Date(parsedBody.date)), 
                `$${parsedBody.price}`, 
                `$${parsedBody.amount}`, 
                (parsedBody.amount / parsedBody.price).toFixed(4)]
            ],
            })

            doc.end() // finalize pdf generation -> send http response 


    }
    catch (err) {
        console.error(err)
        // send response back with error
        sendServerResponse(res, 404,'application/json', JSON.stringify(err))
    }
}