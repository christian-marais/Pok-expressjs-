const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({
         where: { username: req.body.username } 
    })
    .then(user => {
        if(!user){
            
        }
        bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
            if(isPasswordValid) {
                const message = `L'utilisateur a été connecté avec succès`;
                return res.json({ message, data: user })
            }
        })
    }).catch(erreur =>{
        const message = "l'utilisateur n'existe pas"
        res.status(400).json({message,data:erreur})
    })
  })
}