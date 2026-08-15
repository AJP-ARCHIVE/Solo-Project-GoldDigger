export async function parseJSONBody(req) {
    let jsonBody = ''

    for await (const chunk of req) {
        jsonBody += chunk
    } 

    console.log('RAW BODY:', jsonBody);
    console.log('CONTENT TYPE:', req.headers['content-type']);

    try {
        const parsedJSONBody = JSON.parse(jsonBody)
        return parsedJSONBody
    }
    catch (err) {
        console.error(err)
        throw new Error(`Invalid JSON. Error: ${err}`)
    }
}