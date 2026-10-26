const express = require('express');
const app = express();

const hbs = require('hbs');
const session = require('express-session')
const nocache = require('nocache');

app.use(express.static('public'));
app.set('view engine', 'hbs');



app.use(express.urlencoded({extended: true}));

app.use(express.json());

const userRoute = require('./routes/user');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

app.use(nocache());

app.use('/',userRoute);



app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});

 