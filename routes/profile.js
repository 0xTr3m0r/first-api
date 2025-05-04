const express = require ('express');
const router = express.Router();
const db = require('../models');
const Porfile = require('../models/Porfile');
const { Profile } = db;


router.get('/:id',async (req ,res)=>{
    try {
        const profile=await Profile.findAll({where:{userId:req.params.id}});
        if(!profile){
            return res.status(404).json({message:'Profile not found'});
        }
        res.status(200).json(profile);

    }catch(err){
        res.status(500).json({message:err.message});
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName,bio } = req.body;

    try {
        const post = await Porfile.findByPk(id);
        if (!profile) {
            return res.status(404).json({ message: 'Post not found' });
        }

        profile.title = firstName;
        porfile.content = lastName;
        porfile.bio =bio
        await profile.save();

        res.status(200).json({ message: 'profile updated successfully', profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;