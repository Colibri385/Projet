
module.exports = (req,res) => {

    console.log(req.session.registerError)
    
 res.render ('register')
}