const priceDisplay = document.getElementById('price-display') // html element for displaying live gold price 
const form = document.getElementById('gold-form') // html element for form
const dialogModal = document.querySelector('.outputs') // modal for successful submission 
const modalSummary = document.getElementById('investment-summary') // html element for displaying summary of gold purchase 
const modalBtn = document.getElementById('modal-btn') // modal button

// global variable to store http response Blob 'raw data' 
let blob

// form submit -> event listener 
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log('form')
    const formData = new FormData(form)
    const amount = formData.get('amount')
    const date = new Date().toISOString()
    const price = priceDisplay.textContent
    const goldAmount = (amount / price).toFixed(4)
    

    try {
        const response = await fetch('/api', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({date, price, amount, goldAmount})
        }) 
        if (response.ok) {
            // console.log('Form submitted')
            // console.log({date,price,amount})
            
            
            // get http response body -> convert to Blob (Binary Large Object) 'get raw data'
            blob = await response.blob();
            const goldSold = calculateGoldAmount(price, amount)
            dialogModal.showModal()
            modalSummary.textContent = `You just bought ${goldSold} (ozt) for $${amount}. \n You will receive documentation shortly.`            

        }
        else {
            throw new Error('Server error')
        }
    }
    catch (err) {
        console.error(err)
    }
    finally {
        form.reset()
    }
})



function calculateGoldAmount(price, amount) {
// ounces (oz) of gold = total money invested 'purchased' / gold price per oz
    return (amount / price).toFixed(4)
}

// handle when dialog 'modal' is closed 
function handleModal() {
    dialogModal.close()
    // create browser url to Blob 'file generated in memory'
    const url = URL.createObjectURL(blob);

    // temporary dom element added 
    const link = document.createElement("a");
    link.href = url;
    link.download = "Gold-Transaction.pdf";

    document.body.appendChild(link)

    // auto trigger the link to download file
    link.click();
    // remove link
    link.remove();
    // Clear Blob and remove it from memory
    URL.revokeObjectURL(url)
}

// close dialog and trigger purchase summary file download 
modalBtn.addEventListener('click', handleModal)