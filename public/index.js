const eventSource = new EventSource('/gold-prices') // live interface for gold prices

// html element for displaying live gold price 
const priceDisplay = document.getElementById('price-display')
// html element to display server connection status based on event source 
const connectionStatus = document.getElementById('connection-status')


// retrieve gold price from eventSource 
eventSource.onmessage = (event => {
    const data = JSON.parse(event.data)
    const price = data.price
    priceDisplay.textContent = price // display gold price in html
    connectionStatus.textContent = 'Live Price 🟢'  // display app connection status (live gold updates) in html
})

eventSource.onerror = () => {
    console.log('Connection failed.')
    priceDisplay.textContent = '----.--' // display gold price in html
    connectionStatus.textContent = 'Disconnected 🔴' // display app connection status (live gold updates) in html
}


// const form = document.getElementById("gold-form");

// form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     console.log("SUBMIT HANDLER FIRED");

//     const amount = document.getElementById("investment-amount").value;
//     const price = document.getElementById("price-display").value;
//     const date = new Date().toISOString();

//     console.log({
//         date,
//         price,
//         amount
//     });

//     try {
//         const response = await fetch("/api", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 date,
//                 price,

//             })
//         });

//         console.log("Response:", response);

//         if (response.ok) {
//             console.log("Form submitted");
//         } else {
//             console.log("Server error");
//         }
//     } catch (err) {
//         console.error(err);
//     }
// });

// try {
//     const response = await fetch("/api")
//     const data = await response.json()
// }
// catch (err) {
//     console.error(err)
// }