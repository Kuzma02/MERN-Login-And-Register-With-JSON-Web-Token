const jwt = require('jsonwebtoken')
const User = require("../models/User");

const login = async (req, res) => {
    const { email, password } = req.body
  
    if (!email || !password) {
      return res.status(400).json({msg: "Bad request. Please add email and password in the request body"});
    }



    let foundUser = User.find((data) => email === data.email);
        if (foundUser) {
    
            const isMatch = await User.comparePassword(password);
            if (isMatch) {
                console.log("Match successful");
            } else {
                console.log("Match unsuccessful");
            }

            }


  
    //just for demo, normally provided by DB!!!!
    const id = new Date().getDate()
  
    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  
    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
  
    res.status(200).json({
      msg: `Hello, ${req.user.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
  }

const register = async (req, res) => {
    try{
        let foundUser = await User.find({email: req.body.email});
        console.log(req.body);
        if (foundUser.email !== "") {
            
            const person = new User({
                name: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });
            await person.save();
            console.log("User saved in DB");

        } else {
            console.log("Email already in use");
        }
    } catch(error){
        console.log(error);
    }
}

module.exports = {
    login,
    register,
    dashboard
}