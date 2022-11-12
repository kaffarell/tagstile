const express = require('express');
const router = express.Router();
const Wash = require('./models/wash');
const Label= require('./models/label'); 

//all washes divided by owner
router.get('', async(req,res)=> { 
    let washes = await Wash.find({}); 
    washes=washes.map((wash)=>{
        return{
        self: '/api/v1/wash',
        labelId: wash.labelId,
        date: wash.date,
        location: wash.location, 
        washingMachine: wash.washingMachine,
    }}); 
    res.status(200).json(washes);  
});

router.get('/id/:id', async(req,res)=> { 
    let washes = await Wash.find({labelId: req.params.id}); 
    let id= req.params.id; 
    washes=washes.map((wash)=>{
        return{
        self: '/api/v1/wash/id/'+id,
        labelId: wash.labelId,
        date: wash.date,
        location: wash.location, 
        washingMachine: wash.washingMachine,
    }});  
    res.status(200).json(washes);  
})


router.post('', async (req, res) =>{
    let wash=new Wash({
        labelId: req.body.labelId,
        date: new Date(),
        location: req.body.location, 
        washingMachine: req.body.washingMachine,
    })
    wash=await wash.save(); 
    res.location("/api/v1/wash/" + wash._id).status(201).send();
});


module.exports = router;