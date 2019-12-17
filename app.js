const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
const expressSession = require("express-session")

// Controler //
// Articles
const articleSingleController = require('./controllers/articleSingle')
const articleAddController =require('./controllers/articleAdd')
const articlePostController =require ('./controllers/articlePost')
const homePage = require ('./controllers/homePage')
// USER 
const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')

const Handlebars = require("handlebars")
const MomentHandler = require("handlebars.moment")
MomentHandler.registerHelpers(Handlebars);

// Port local //
const port = 3000

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    resave: true,
    saveUninitialized: true
  }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(fileUpload())

// Mongoose //
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true,  useUnifiedTopology: true})

// Post

app.use(express.static('public'));

// Route

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const articleValidPost = require('./middleware/articleValidPost')
 
 // s'il y a un post sur url 'article/post' applique le middleware
app.use("/articles/post", articleValidPost)


// methode Get sur page d'acceuil index.handlebars "/"
app.get("/", homePage) // affiche la collection

// Page articles //
// Ajoute articledb.
app.get("/articles/add", articleAddController)
app.get("/articles/:_id", articleSingleController)
app.post("/articles/post", articlePostController)

// Users (tu mets le chemin que tu veux) 
app.get("/user/create", userCreate)
app.post("/user/register", userRegister)
app.get('/user/login', userLogin)
app.post('/user/loginAuth', userLoginAuth)

// Contact
app.get("/contact", (req, res) => {
    res.render("contact")
})


// Port du serveur

app.listen(port, function () {
    console.log(`Le serveur tourne sur le port ${port}, lancé à ${new Date().toLocaleString()}`)
})


