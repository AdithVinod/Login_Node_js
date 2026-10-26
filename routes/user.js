
const express = require('express');
const dotenv = require('dotenv');
const user= express.Router();

dotenv.config();

const username = process.env.USER_NAME;
const password = process.env.PASSWORD;


user.get('/', (req, res)=>{
    if(req.session.user){
        res.render('home');
    }

    else{
        if(req.session.passwordwrong){
            res.render('login',{message:"Invalid credentials"});
            req.session.passwordwrong = false;
        }
        
        else{
            res.render("login");
        }
    }

});




user.post('/verify', (req, res) => {
    console.log(req.body);

    if (
        req.body.username === username &&
        req.body.password === password
    ) {
        req.session.user = req.body.username;
        // req.session.passwordwrong = false;

        return res.redirect('/home');
    } else {
        req.session.passwordwrong = true;

        return res.redirect('/');
    }
});


user.get('/home', (req,res)=>{
     if (req.session.user) {
        res.render('home');
     }

     else {
        if(req.session.passwordwrong){
            req.session.passwordwrong = false;
            res.render('login',{message:"Invalid credentials"});
        }
        else{
            res.render('login');
        }
     }
});

user.get('/logout', (req,res)=>{
    req.session.destroy();
    // res.send("Logout successful");
    res.render('login',{message: "Logged Out"});
});



module.exports = user;