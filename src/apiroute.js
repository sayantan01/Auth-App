const express=require('express')
const router=express.Router()
const Joi=require('joi')
const check=require('./validation')
const {User,Role}=require('./models')
const {SESS_NAME} = require('./config')



router.post('/register',async(req,res)=>{
    const {email,password,role} = req.body
    try{
        await Joi.validate({email,password},check)
        const user=await User.findOne({where:{email:email}})
        if(user!==null)
            res.send({status:'err',msg:'User exists!! Go to Sign in page'})
        else
        {
            const resUser=await User.create({email,password})
            const resRole=await Role.create({email,role,UserId:resUser.id})
            req.session.userId=resUser.id

            res.send({status:'ok',user:{
                email:resUser.email,
                id:resUser.id,
                role:resRole.role,
            }})

        }
    }
    catch(err)
    {
        console.log(err)
        res.status(400).send({status:'err',err})
    }
})

router.post('/login',async(req,res)=>{
    //validate email and password
    const {email,password}=req.body
    try{
        await Joi.validate({email,password},check)
        const user=await User.findOne({where:{email:email}})
        if(!user)
            res.send({status:'err',msg:'User Not Found!! Go to Sign up page'})
        else
        {
            const validate=await user.validatePassword(req.body.password)
            if(!validate)
                res.send({status:'err',msg:'Incorrect Password'})
            else
            {
                const role=await Role.findOne({where:{email:email}})
                req.session.userId=user.id
                
                res.send({status:'ok',user:{
                    email:user.email,
                    id:user.id,
                    role:role.role
                }})
            }
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({status:'err',err})
    }
})

router.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err)
        {
            res.send({status:'err',msg:'Logout Failed'})
        }
        else
        {
            res.clearCookie(SESS_NAME)
            res.send({status:'ok'})
        }
    })
})

router.get('/get',async(req,res)=>{
 
    try
    {
        const users=await User.findAll({attributes:['email'],include:[
            
                /*model:Role,
                required:true,*/
                {
                    model:Role,
                    required:true,
                    attributes:['role']}
            ]})
            
        res.send(users)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send(err)
    }

})

router.put('/put',async(req,res)=>{
    try
    {
        await Role.update({role:req.body.role},{
            where:{
                email:req.body.email
            }
        })
        res.send({msg:"Updated successfully"})
    }
    catch(err)
    {
        res.send({status:'err',err})
    }
})

module.exports=router;