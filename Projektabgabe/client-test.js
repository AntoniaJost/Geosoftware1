const chai = window.chai
const expect = chai.expect   // https://www.chaijs.com/
//chai.use(require('chai-json'))
const expect = chai.expect

console.log(sum(1,2))

describe ("my first test", () => 
{
    it ("should return an appropriate value for sums", () =>
    {
        expect(sum(1, 2)).to.equal(3)
    })

    it ("should return an appropriate value for multiplications", () => 
    {
        expect(multiply(2, 6)).to.equal(12)
    })

    it("should return an appropriate value for divisons", () => 
    {
        expect(divide(14, 7)).to.equal(2)
    })

    it("should validate that a file is a json", () => {
        expect(testFile).to.be.a.jsonFile(); 
    })
})