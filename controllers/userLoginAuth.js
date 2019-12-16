const bcrypt = require('bcrypt')
const User = require ('../database/models/user')


module.exports = (req,res) => {

    // récupère l'émail et le mot de passe
    const {email, password} = req.body;

    User.findOne({email},(error,user) => {
        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same){
                    
                    res.redirect('/')
                } 
                else {
                    res.redirect('/user/login')
                }
            })
        } else {
            return res.redirect('/user/login')
        }   
    })
}