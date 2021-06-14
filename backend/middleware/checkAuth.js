const jsonwebtoken = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const privateKey = process.env.PRIVATE_KEY
    
        jsonwebtoken.verify(token, privateKey, {algorithms: 'HS256'})
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Usuario não autenticadoss!"
        })
    }
}