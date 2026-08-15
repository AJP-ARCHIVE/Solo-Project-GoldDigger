
// helper function to changeGoldPrice 
// generate random number between 50-100 to increment or decrement gold price from gold api
function generateRandomNumber() {
  // logic -> fluctuate gold price between $50-$100 randomly by generating random num between 50 and 100
  const randomGoldPriceChange = Math.floor(Math.random() * 100) + 50
  console.log('manipulated gold price increase or decrease', randomGoldPriceChange)
  return randomGoldPriceChange
}

// increment or decrement gold price retrieved by gold api if gold price from api did not update
export function changeGoldPrice(goldPrice) {
  const operator = ['+', '-']
  const randomNumber = Math.floor(Math.random() * operator.length)
  console.log('random number', randomNumber)
  const randomGoldRate = generateRandomNumber()
  const operatorType = operator[randomNumber]
  console.log('operator type', operatorType)
  console.log('gold price', goldPrice)

  
  if(operatorType === '+') {
    return (goldPrice + randomGoldRate).toFixed(2)
  }
  else {
    return (goldPrice - randomGoldRate).toFixed(2)
  }
}