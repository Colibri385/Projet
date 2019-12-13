
const mongoose = require('mongoose')
const Article = require('./database/models/article')

mongoose.connect('mongodb://localhost:27017/blog-test')




/*
Article.findById("5df217b7941d9e20644a223b", (error, articles) => {
    console.log(error, articles);
    
})

*/

/*
Article.find({
    content: 'critique'
}, (error, articles) => {
    console.log(error, articles);
    
})
*/

/*
Article.create({
    title: "Spiderman",
    intro: "test d'introduction",
    content: "critique du film spiderman" }, 
        (error, post) => {
        console.log(error, post);
}) 
*/

