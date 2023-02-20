const express = require('express')
require('./src/db/mongoose')
const userRouter = require('./src/Router/user')
const tasksRouter = require('./src/Router/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next) =>{
//     res.status(503).send('Site is currently down. check back soon ! ')
// })

app.use(express.json())
app.use(userRouter)
app.use(tasksRouter)




app.get('*', async(req,res)=>{

    try{
        res.status(404).send("<h1>Something Went Wrong !</h1>")
    }catch(e){
        res.status(404).send(e)
    }
})


app.listen(port, ()=>{
    console.log('Server is up on ' + port)
})


// git init
// git add .
// git commit -m " Auto cropping and Image formatting "
// git push -u origin master
