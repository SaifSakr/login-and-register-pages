const express=require('express')
const router =express.Router()
const User =require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
router.post('/register',async(req,res)=>{
    data=req.body
    usr=new User(data)
    salt=bcrypt.genSaltSync(10)
    cryptedpass=await bcrypt.hashSync(data.password,salt)
    usr.password=cryptedpass
    usr.save()
    .then(
        (saved)=>{
            res.status(200).send(saved)
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
})

router.post('/login',async(req,res)=>{
    data=req.body
    user=await User.findOne({email:data.email ,username:data.username})
    if (!user){
        res.status(404).send('email or password or username invalid')
    }else{
        validpass=bcrypt.compareSync(data.password,user.password)
        if(!validpass){
            res.status(401).send('email or password or username invalid !')

        }else{
            payload={
                _id:user._id,
                email:user.email,
                username:user.username

            }
            token=jwt.sign(payload,"1234567")
            res.status(200).send({mytoken:token})
            
        }
    }
})
router.post('/create',async(req,res)=>{
    try{
        data=req.body
        usr=new User(data)
        saveduser=await usr.save()
        res.send(saveduser)
    } catch(error){
        res.send(error)
    }
})



router.get ('/getall',(req,res)=>{
    User.find()
       .then(
        (users)=>{
            res.send (users)
        }
       )
       .catch(
        (err)=>{
            res.send(err)
        }
       )
})

router.get('/all',async(req,res)=>{
    try{
        
        users=await User.find()
        res.send(users)
    } catch(error){
        res.send(error)
    }
})

router.get('/getbyid/:id',(req,res)=>{
    myid=req.params.id
    User.findOne({_id:myid})
        .then(
            (user)=>{
                res.send(user)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
})

router.get('/byid/:id',async(req,res)=>{
    try{
        id =req.params.id
        user=await User.findById({_id :id})
        res.send(user)

    }catch (error){
        res.send(error)
    }
})

router.get('/upt/:id',async(req,res)=>{
    try{
        id =req.params.id
        newdata=req.body
        updated=await User.findByIdAndUpdate({_id :id},newdata)
        res.send(updated)

    }catch (error){
        res.send(error)
    }
})





router.delete('/delete/:id',(req,res)=>{
    id=req.params.id
    User.findByIdAndDelete({_id:id})
        .then(
            (deletedUser)=>{
                res.send(deletedUser)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
})




module.exports=router