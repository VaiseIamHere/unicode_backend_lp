import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)   return res.status(401).send('Login first !!')
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).send('Authorization Failed !!')

        req.user = user
        next()
    })
}

export default authenticate
