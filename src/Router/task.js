const express = require('express')
const Tasks = require('../modal/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks',auth, async (req,res)=>{
    const tasks = new Tasks({
        ...req.body,
        owner:req.user._id
    })

    try{
        await tasks.save()
        res.status(201).send(tasks)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks',async (req,res) =>{
    try{
        const tasks = await Tasks.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }    
})

router.get('/tasks/:id',async (req,res) =>{
    const _id = req.params.id


    try{
        const tasks = await Tasks.findById(_id)
        if(!tasks){
            res.status(404).send()
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send(err)
    }
    
})

router.patch('/tasks/:id', async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['description','completed']
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates !'})
    }

    try{

        const tasks = await Tasks.findById(req.params.id)

        updates.forEach((update) => tasks[update] = req.body[update] )

        await tasks.save()

        // const tasks = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true})
        
        if(!tasks){
         return  res.status(404).send()
        }
        res.send(tasks)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async(req,res) =>{
    try{
        const tasks = await Tasks.findByIdAndDelete(req.params.id)

        if(!tasks){
            res.status(404).send()
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router