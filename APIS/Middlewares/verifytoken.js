const jwt=require("jsonwebtoken")

const checkToken=(req,res,next)=>
    {
        let tokenWithBearer=req.headers.authorization;

        let token
        
        if(tokenWithBearer===undefined)
        {
            return res.send({message:"unauthorized access"})
        }
        else
        {
            token=tokenWithBearer.split(" ")[1];
            jwt.verify(token,"abcdef",(err,decoded)=>{
               
                if(err)
                {
                    console.log(err.message)
                    return res.send({message:"session expired..login to continue"})

                }
                else
                {
                    next()
                }
            })
        }
    }

module.exports=checkToken