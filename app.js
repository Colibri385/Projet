const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
const Handlebars = require("handlebars")
const MomentHandler = require("handlebars.moment")
const path = require("path")

MomentHandler.registerHelpers(Handlebars);

// Port local
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(fileUpload())

// Mongoose
mongoose.connect('mongodb://localhost:27017/blog')

// Post
const Post = require("./database/models/article")

app.use(express.static('public'));

// Route

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const middleware = (req,res, next) => {
    if(!req.files || req.body.title) {
        return res.redirect("/")
    }
    console.log("Je suis un Middleware");
    next()
}

app.use("/articles/post", middleware)


// methode Get sur page d'acceuil index.handlebars "/"
app.get("/", async (req, res) => {
    //attend le retour de la requete pour afficher le contenu de la BDD
    const posts = await Post.find({})
    res.render("index", {
        posts: posts
    }) // affiche la collection
})

app.get("/contact", (req, res) => {
    res.render("contact")
})

// Page articles

// Ajoute articledb.
app.get("/articles/add", (req, res) => {
    res.render("article/add")
})

app.get("/articles/:_id", async (req, res) => {
    const article = await Post.findById(req.params._id)
    res.render("articles", {article: article})
})



// POST

app.post("/articles/post", (req, res) => {

    // envoyer img dans dossier static articles 
    // récupère l'image 
    const {image} = req.files
    const uploadFile = path.resolve(__dirname, 'public/articles', image.name)

    // afficher image  
    image.mv(uploadFile, (error) => {
        Post.create(
            {
            ...req.body, 
            image : `/articles/${image.name}`
            }
            ,(error, post) => {
            res.redirect("/")
        })
    })
})

// Port du serveur

app.listen(port, function () {
    console.log(`Le serveur tourne sur le port ${port}, lancé à ${new Date().toLocaleString()}`)
})


