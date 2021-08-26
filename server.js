const exp=require("express")
const app=exp();
const path=require("path")
const mc=require("mongodb").MongoClient




//imports
const userapi=require('./APIS/userapi')


//connection string
const dburl="mongodb+srv://New_Database:yasmin@mycluster.zplkl.mongodb.net/mydb?retryWrites=true&w=majority"


//connect database
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("err from connecting database")
    }
    else
    {
        let databaseObj=client.db("mydb")
       
        console.log("connected to database")
      let usercollection=databaseObj.collection("user")
      app.set("usercollection",usercollection)
    }
})



//execute specific api based on path
app.use(exp.static(path.join(__dirname,"./dist/GiftGalaxy/")))
app.use('/user',userapi)

















const port=3000
app.listen(port,()=>{
    console.log(`server listening on ${port}`)
})