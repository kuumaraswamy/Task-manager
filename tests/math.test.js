const {calculateTip, farenhitToCelcius, celciusToFarenhit} = require('../src/math')

test('Should calculate total with Tip ! ', ()=>{
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with default tip ! ', ()=>{
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should Convert 32 F to 0 C', ()=>{
    const temp = farenhitToCelcius(32)
    expect(temp).toBe(0)
})

test('Should Convert 0 C to 32 F', ()=>{
    const temp = celciusToFarenhit(0)
    expect(temp).toBe(32)
})
