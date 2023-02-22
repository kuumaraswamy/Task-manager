const calculateTip = (total ,tipPercent = 0.25) => total+ (total *tipPercent)
    
const farenhitToCelcius = (temp) =>{
    return (temp-32)/1.8
}

const celciusToFarenhit = (temp) =>{
    return (temp*1.8) + 32
}

module.exports = {
    calculateTip,
    farenhitToCelcius,
    celciusToFarenhit
}