const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');
// Get All members
router.get('/',(req,res)=>{
    res.json(members);
});

// Get a single member
// Note member.id is a number but req.param.id is a string
router.get('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg:`Member with id:${req.params.id} not found!`});
    }

    
});

// Create a single member
router.post('/',(req,res)=>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email:req.body.email,
        status:'active'
    }

    if(!newMember.name || !newMember.email){
       return res.status(400).json({msg:'Please include name and email!'});
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

// Update member
router.put('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                // if upd name is send then use that else use older name
                member.name =  updMember.name ? updMember.name : member.name;
                member.email =  updMember.email ? updMember.email : member.email;
                res.json({msg:'Member was updated', member});
            }
        });


    }else{
        res.status(400).json({msg:`Member with id:${req.params.id} not found!`});
    }

    
});

// Delete member
router.delete('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json({msg:'Member Deleted!',members:members.filter(member => member.id !== parseInt(req.params.id))} );
    }else{
        res.status(400).json({msg:`Member with id:${req.params.id} not found!`});
    }

    
});
module.exports = router;