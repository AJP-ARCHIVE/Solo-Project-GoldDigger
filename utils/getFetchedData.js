// use free gold API: https://gold-api.com/docs
// no authentication - free endpoint with no rate limits
// API warns that IP address can be blocked if spammed: cache price for 30 seconds to avoid IP address from being blocked.
// utility to be used from any module 
import { changeGoldPrice } from "./changeGoldPrice.js"

// globally store gold price and lastUpdated date/time
const goldCache = {
    price: null,
    apiPrice: null,
    lastUpdated: null,
}

export async function getFetchedData() {
        try {
        const response = await fetch('https://api.gold-api.com/price/XAU/USD') // USD currency
        const data = await response.json()
   
        //console.log(data)
       
        if(data.updatedAt !== goldCache.lastUpdated) {
          
            // if no data price change from api then manipulate the gold price randomly using util function 
            // determine if api updated gold price by comparing cached gold price from api with the new fetched api gold price
            if (goldCache.apiPrice === data.price.toFixed(2)) {
                // console.log('no api data change', goldCache.apiPrice)
                goldCache.price = changeGoldPrice(data.price)
                // console.log('new price', goldCache.price)
                goldCache.lastUpdated = data.updatedAt
            }
            // if data is updated by API -> update cached price and apiPrice data
            else {
                // console.log('api data changed')
                // console.log('data price', data.price)
                // console.log('cached price', goldCache.price)
                // set new gold price from api as cached data
                goldCache.price = data.price.toFixed(2)
                // store new API price to use as comparison 
                goldCache.apiPrice = data.price.toFixed(2)
                goldCache.lastUpdated = data.updatedAt
            }
        
        
        }
        
     
        return goldCache
        
    }
    catch (err) {
        console.error(err)
    }
    return goldCache 
}