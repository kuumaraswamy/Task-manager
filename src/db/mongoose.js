const mongoose = require('mongoose')


const connectionURL = 'mongodb+srv://kuumaraswamy:kuumaraswamy@local-db.pmy5xvy.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery', false);
DatabaseURL ="mongodb+srv://kumaraswamy:kumaraswamy@cluster0.g248bpe.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DatabaseURL,{useNewUrlParser:true}).then(() =>{
    console.log('DB connected !')
}).catch((err) =>{
    console.log(err)
})



