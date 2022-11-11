

const express = require('express');
const router = express.Router();
const Label = require('./models/label');

router.get('/:owner', async(req,res)=> {
    console.log('sono nella get'); 
    let owner= req.params.owner; 
    let labels = await Label.find({owner: owner}) 
    labels=labels.map((label)=>{return{
        self: '/api/v1/label/'+label.owner,
        _id: label._id,
        owner: label.owner, 
        location: label.location,
        mainColor: label.mainColor, 
        secondaryColor: label.secondaryColor,
        pattern: label.pattern,
        material: label.material,   
        washInfo: label.washInfo,
        washable: label.washable,
    }}); 
    res.status(200).json(labels);  
})

router.get(':id', async (req, res) => {
    let idLabel = req.params.id; 
    let label = await Label.findOne({_id: idLabel}); 
    if(!label){
        res.status(404).json(label);  
        console.log("label not found"); 
        return; 
    }
    res.status(200).json({
        self: '/api/v1/label/'+idLabel,
        _id: label._id,
        owner: label.owner, 
        location: label.location,
        mainColor: label.mainColor, 
        secondaryColor: label.secondaryColor,
        pattern: label.pattern,
        material: label.material,
        washInfo: label.washInfo,
        washable: label.washable,
    }); 
});


router.post('/:id', async (req, res) =>{
    let label=new Label({
        _id: req.params.id,
        owner: req.body.owner, 
        location: req.body.location,
        mainColor: req.body.mainColor, 
        secondaryColor: req.body.secondaryColor,
        pattern: req.body.pattern,
        material: req.body.material,
        washInfo: req.body.washInfo,
        washable: req.body.washable,
    })
    label=await label.save(); 
    res.location("/api/v1/label/" + label._id).status(201).send();
});


router.delete('/:id', async (req, res) => {
    let label = await Label.findById(req.params.id).exec(); 
    if(!label){
        res.status(404).send();
        console.log('Label not found');
        return; 
    }
    await label.deleteOne(); 
    res.location('/api/v1/label').status(204).send();
});

module.exports = router;