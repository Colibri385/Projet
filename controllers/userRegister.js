
// Récupère le schema de la BDD
const User = require ('../database/models/user')

// prends les données de la page body (email name ect.. puis return page accueil)
module.exports = (req,res) => {
    User.create(req.body, (error,user) => {

        if (error) {
            const registerError = Object.keys(error.errors).map(key => error.errors[key].message);
            req.session.registerError =registerError

            return res.redirect('/user/create')
        }
        res.redirect('/')
    }) 
   }