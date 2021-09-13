let got = require("got")
let port = 3000; 

describe ("Route testing", () => {

    let urlTouren = `http://localhost:${port}/tour`
    let urlHome = `http://localhost:${port}/home`

    test("/tour route: returns status 200", async () => 
    {
        const response = await got(urlTouren)
        expect(response.statusCode).toBe(200)
    })

    test("/home route: check content type", async () => 
    {
        const response = await got(urlHome)
        expect(response.headers['content-type']).toBe("text/html; charset=utf-8")
    })

    let tourAdd = `http://localhost:${port}/tour/add/add/details`
    
    test("/add route: check if post request is fine", async () => 
    {
        const request = await got.post(tourAdd)
        expect(request.statusCode).toBe(200)

    })
})