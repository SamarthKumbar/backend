const asynchandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const User=require("../models/user");
const registeruser = asynchandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email }); 

    if (userAvailable) {
        res.status(400);
        throw new Error("Email already registered");
    }
    const hashedpassword=await bcrypt.hash(password,15);
    console.log("hashedpassword:",hashedpassword);
    const reg = await User.create({
        username,
        email,
        password:hashedpassword
    });
    console.log(`user created ${reg}`);
    if(reg)
    {
        res.status(200).json({_id:reg.id,email:reg.email});
    }
    else{
        throw new Error("user not created");
    }

    res.status(201).json(reg);
});

const loginuser=asynchandler(async(req,res)=>{
        const { email, password } = req.body;
        if (!email || !password) {
          res.status(400);
          throw new Error("All fields are mandatory!");
        }
        const user = await User.findOne({ email });
        //compare password with hashedpassword
        if (user && (await bcrypt.compare(password, user.password))) {
          const accessToken = jwt.sign(
            {
              user: {
                username: user.username,
                email: user.email,
                id: user.id,
              },
            },
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "15m" }
          );
          res.status(200).json({ accessToken });
        } else {
          res.status(401);
          throw new Error("email or password is not valid");
        }
      });

const currentuser=asynchandler(async(req,res)=>{
    res.json({message:"this is current user"});
});
module.exports={registeruser,loginuser,currentuser};