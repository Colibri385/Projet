
// Récupère le schema de la BDD
const User = require ('../database/models/user')

// prends les données de la page body (email name ect.. puis return page accueil)
module.exports = (req,res) => {
    User.create(req.body, (error,user) => {

        if (error) {
            res.redirect('/user/create')
        }
        res.redirect('/')
    }) 
   }