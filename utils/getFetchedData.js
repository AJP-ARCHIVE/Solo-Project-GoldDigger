// use free gold API: https://gold-api.com/docs
// no authentication - free endpoint with no rate limits
// API warns that IP address can be blocked if spammed: cache price for 30 seconds to avoid IP address from being blocked.
// utility to be used from any module 
import { changeGoldPrice } from "./changeGoldPrice.js"

// globally store gold price and lastUpdated date/time
const goldCache = {
    price: null,
    lastUpdated: null,
}

export async function getFetchedData() {
        try {
        const response = await fetch('https://api.gold-api.com/price/XAU/USD') // USD currency
        const data = await response.json()
   
        //console.log(data)
       
        if(data.updatedAt !== goldCache.lastUpdated) {
          
            //goldCache.price = (data.price + 200.00).toFixed(2)
            // if data is updated by API -> update cached data with api data
            if (goldCache.price === data.price.toFixed(2)) {
                //console.log('no api data change')
                goldCache.price = changeGoldPrice(data.price)
                goldCache.lastUpdated = data.updatedAt
            }
            // if no data price change from api then manipulate the gold price randomly using util function 
            else {
                // console.log('api data changed')
                // console.log('data price', data.price)
                // console.log('cached price', goldCache.price)
                goldCache.price = data.price.toFixed(2)
                goldCache.lastUpdated = data.updatedAt
            }
        
            
            // console.log('data price', data.price)
            // console.log('data type', typeof data.price)
            // console.log('cache', goldCache)
            // console.log('cache type', typeof goldCache)
        
        }
        
        // no data change from API -> invoke util func to manipulate random gold price change 
    
     
        return goldCache
        
    }
    catch (err) {
        console.error(err)
    }
    return goldCache 
}