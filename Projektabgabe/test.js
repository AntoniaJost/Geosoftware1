let got = require("got")
let port = 3000; 
let objectID = 

describe ("Route testing", () => {

    let urlTouren = `http://localhost:${port}/tour`
    let urlHome = `http://localhost:${port}/home`
    let editTouren = `http://localhost:${port}/tour/edit/edit`

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

    /** 
    let tourAdd = `http://localhost:${port}/tour/add/add/details`
   
    test("/add route: check if post request does not allow to transfer empty JSON", async () => 
    {
        const testObject = {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Polygon",
                  "coordinates": [
                    [
                      [
                        8.9703369140625,
                        51.97134580885172
                      ],
                      [
                        9.151611328125,
                        51.5189980614127
                      ],
                      [
                        9.9591064453125,
                        51.587309751245456
                      ],
                      [
                        9.964599609375,
                        51.92394344554469
                      ],
                      [
                        9.404296875,
                        52.14697334064471
                      ],
                      [
                        8.9703369140625,
                        51.97134580885172
                      ]
                    ]
                  ]
                }
              }
            ]
          }
        const request = await got.post(tourAdd)
        expect(request.statusCode).toBe(500)

    })*/

    test("/edit/edit route: return status 200", async () => {
        const response = await got(editTouren)
        expect(response.statusCode).toBe(200)
    })
})