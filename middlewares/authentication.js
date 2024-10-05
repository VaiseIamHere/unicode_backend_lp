import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)   return res.status(401).send('Login first !!')
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).send('Authorization Failed !!')

        req.user = user
        next()
    })
}

export const authenticateCompany = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)   return res.status(401).send('Login first !!')
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, company) => {
        if(err) return res.status(403).send('Authorization Failed !!')

        req.company = company
        next()
    })
}

const exports__ = {
    authenticateCompany,
    authenticateUser
}

export default exports__

