
const bcrypt =require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{ 
        type : String,
        required : true
    }, 
    email: { 
        type : String,
        required :true,
        unique : true
    },
    password : {
        type : String,
        require : true
    }
  })

// crypter le mot de passe

UserSchema.pre('save', function (next){
   
    const user = this

    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
}) 


module.exports = mongoose.model('user', UserSchema)

