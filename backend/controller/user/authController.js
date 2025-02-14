const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//regstration
async function userSignUpController(req,res){
    try{
        const { email, password, name} = req.body

        const user = await userModel.findOne({email})

        console.log("user",user)


        if(!email){
           throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", error: true, success: false });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })


    }catch(err){
      res.status(400).json({
        message: err.message || "Something went wrong",
        error: true,
        success: false,
    });
    
    }
}




//login

async function userSignInController(req,res){
  try{
      const { email , password} = req.body

      if(!email){
          throw new Error("Please provide email")
      }
      if(!password){
           throw new Error("Please provide password")
      }

      const user = await userModel.findOne({email})

     if(!user){
          throw new Error("User not found")
     }

     const checkPassword = await bcrypt.compare(password,user.password)

     console.log("checkPassoword",checkPassword)

     if(checkPassword){
      const tokenData = {
          _id : user._id,
          email : user.email,
      }
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

      const tokenOption = {
          httpOnly : true,
          secure : true
      }

      res.cookie("token",token,tokenOption).status(200).json({
          message : "Login successfully",
          data : token,
          success : true,
          error : false
      })

     }else{
       throw new Error("Please check Password")
     }







  }catch(err){
      res.json({
          message : err.message || err  ,
          error : true,
          success : false,
      })
  }

}


//logout
async function userLogout(req,res){
    try{
        res.clearCookie("token")

        res.json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data : []
        })
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}


module.exports = {
  userSignUpController,
  userSignInController,
  userLogout
};