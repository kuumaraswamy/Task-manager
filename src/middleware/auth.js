const jwt = require('jsonwebtoken')
const User = require('../modal/user')


const auth = async (req,res,next) =>{
    try{
        const authorizationHeader = req.header('Authorization')
        const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null
        // const token = req.header('Authorization').replace('Bearer' ,'')
        const decoded = jwt.verify(token,'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token})

        if(!user){
            throw new Error()
        }
        req.user = user
        next()
    }catch(e){
        res.status(401).send({error:'Please Authenticate'})
    }
}

module.exports = auth