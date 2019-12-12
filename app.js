const express = require('express')
const app = express()
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const port = 3000

app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Mongoose
mongoose.connect('mongodb://localhost:27017/blog')

// Route

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/",function (req,res) {  
    res.render("index")    
})

app.get("/contact",function (req,res) {
    res.render("contact")
})

// Page articles
app.get("/articles/add",(req,res) => {
        res.render("articles/add")
})

// POST

const Post = require("./database/models/article")

app.post("/articles/post",(req,res) => {
   
   Post.create(req.body, (error, post) => {
       res.redirect("/")
   })
   console.log(req.body);
   
   })
    

    


// Port du serveur

app.listen(port, function(){
    console.log(`écoute le port ${port}, lancé à ${new Date().toLocaleString()}`)
})

