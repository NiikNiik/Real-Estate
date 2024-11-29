const User = require('../models/userModel');
// ! Still need to create this
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    registerUser: async (req, res) => {
        try{
            // * Check if the email that was entered in the reg form is already in the DB
            const potentialUser = await User.findOne({email:req.body.email})
            if(potentialUser){
                res.status(400).json({message: 'That email already exists please login'})
            }else{
                // * create user
                const newUser = await User.create(req.body);

                // * Generating a usertoken and storing the id and email of the newly created user
                const userToken = jwt.sign({_id: newUser._id, email:newUser.email}, secret, {expiresIn:'2h'})
                console.log(userToken);
                // * Sending user data back to the client
                res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2 * 60 * 60 * 1000}).json(newUser);
            }
        }
        catch(err){
            res.status(400).json({ error: err })
        }
    },
    // ! Login user controller
    loginUser: async (req, res) => {
        try{
            // * check if the user already exists
            const user = await User.findOne({email:req.body.email})
            if(user){
                // * Check to see if the password entered matches the password in the DB for that email specifically the hash
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if(passwordsMatch){
                    // * generate userToken 
                    const userToken = jwt.sign({_id: user._id, email:user.email}, secret, {expiresIn:'2h'})
                    // * Log the user in 
                    res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2 * 60 * 60 * 1000}).json(user);
                }
                else{
                    // * This is if the email does exist but the passwords dont match
                    res.status(400).json({ message: 'Invalid email/password'})
                }
            }
            // * if the user doesnt exist
            else{
                res.status(400).json({ message: 'Invalid email/password'})
            }
        }
        catch(err){
            res.status(400).json({ error: err })
        }
    },
    logout: (req, res) => {
        res.clearCookie('userToken').json({message:'You logged out'})
    },
    getLogged: async (req, res) => { console.log("trying to get a user")
        try {
            const user = jwt.verify(req.cookies.userToken, secret); 
            console.log("this is user", user)
            // const currentUser = await Model.findOne({ _id: user._id });
            res.json(user);
        } catch (error) {
            res.status(400).json({ errors: 'failed to get logged in user' })
        }
    },
    updateOne: async (req, res) => {
        console.log('updateOne:', req.body)
        Model.findOneAndUpdate( {_id: req.body._id}, req.body, { new: true } )
            .then( e => {res.json(e)} )
            .catch( e => res.json(e) )
    }
}