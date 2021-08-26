const exp=require("express")
const userapi=exp.Router()
const mc=require("mongodb").MongoClient
userapi.use(exp.json())
const expressErrorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const checkToken=require("./Middlewares/verifytoken")
const cloudinary=require("cloudinary")
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")

//configure cloudinary
cloudinary.config({
    cloud_name:'drvtxx97q',
    api_key:'332719842249923',
    api_secret:'EDpLY_nd_pmWDXUQmsHPwiCpWDc'
})


//configure multer storage
const clstorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"java",
            public_id:file.fieldname+"-"+Date.now()
        }
    }
})

//configure multer
const multerObj=multer({storage:clstorage})

//get users
userapi.get("/getusers",expressErrorHandler(async (req,res,next)=>
{
    let usercollection=req.app.get("usercollection")
    let userList= await usercollection.find().toArray()
    res.send({message:userList})
}))

//get user by username

userapi.get("/getusers/:username",expressErrorHandler(async (req,res,next)=>
{
    let usercollection=req.app.get("usercollection")
    let un=req.params.username
    let user=await usercollection.findOne({username:un})
    if(user===null)
    {
        res.send({message:"no user found"})
    }
    else
    {
        res.send({message:user})
    }
}))


//create user
userapi.post("/createuser",multerObj.single('photo'),expressErrorHandler(async (req,res,next)=>
{
    let usercollection=req.app.get("usercollection")
    let newuser=req.body.userobj
    let user=await usercollection.findOne({username:newuser.username})
    if(user!==null)
    {
        res.send({message:"user already exsits"})
        
    }
    else
    {
        let hashedpassword=await bcryptjs.hash(newuser.password,7)
        newuser.password=hashedpassword
        //add image url 
        newuser.profileImage=req.file.path
        await usercollection .insertOne(newuser)
        res.send({message:"user created"})
    }
}))


//update user
userapi.put("/updateuser/:username",expressErrorHandler(async (req,res,next)=>
{
    let usercollection=req.app.get("usercollection")
    let modifieduser=req.body
    let un=req.params.username
    let user=await usercollection.findOne({username:un})
    if(user===null)
    {
        res.send({message:"user not found"})
    }
    else
    {
        await usercollection.updateOne({username:modifieduser.username},{$set:{...modifieduser}})
        res.send({message:"user updated successfully"})
    }
}))


//delete user
userapi.delete("/deleteuser/:username",expressErrorHandler(async (req,res,next)=>{
    let usercollection=req.app.get("usercollection")
    let un=req.params.username
    let userobj= await usercollection.findOne({username:un})
    if(userobj===null)
    {
        res.send({message:"user not existed"})
    }
    else
    {
        await usercollection.deleteOne({username:un})
        res.send({message:"user deleted suucessfully"})
    }
}))



//login
userapi.post("/login",expressErrorHandler(async (req,res)=>
{
    let usercollection=req.app.get("usercollection")
    let credentials=req.body
    let user=await usercollection.findOne({username:credentials.username})
    if(user===null)
    {
        res.send({message:"username invalid"})
    }
    else
    {
        let result=await bcryptjs.compare(credentials.password,user.password)
        if(result===false)
        {
            res.send({message:"password invalid"})
        }
        else
        {
            let signedToken=jwt.sign({username:credentials.username},'abcdef',{expiresIn:"120"})
            res.send({message:"login success",token:signedToken,username:credentials.username,userobj:user})
        }
    }
}))


//dummy route
userapi.get("/dummyroute",checkToken,(req,res)=>{
    
    console.log("hello")
    res.send({message:"this is protected data"})
})

  
module.exports=userapi



