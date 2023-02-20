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

//GET /tasks?completed=true
//Pagination /tasks?limit=107skip=0
router.get('/tasks',auth,async (req,res) =>{
    const match = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    try{
        // const tasks = await Tasks.find({ owner:req.user._id})
                     //(or)
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip)
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }    
})

router.get('/tasks/:id',auth,async (req,res) =>{
    const _id = req.params.id


    try{
        const tasks = await Tasks.findOne({_id, owner:req.user._id})
        if(!tasks){
            res.status(404).send()
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send(err)
    }
    
})

router.patch('/tasks/:id', auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['description','completed']
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates !'})
    }

    try{

        const tasks = await Tasks.findOne({_id:req.params.id, owner:req.user._id})

        if(!tasks){
         return  res.status(404).send()
        }

        updates.forEach((update) => tasks[update] = req.body[update] )
        await tasks.save()

        res.send(tasks)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async(req,res) =>{
    try{
        const tasks = await Tasks.findOneAndDelete({_id:req.params.id, owner:req.user._id})

        if(!tasks){
            res.status(404).send()
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router