
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
    // Jwt header
    const authHeader = req.headers.authorization;
    // Check if the token is provided
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided')
    }
    // Spliting the header
    const token = authHeader.split(' ')[1]
    // Varify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
        next()
    } catch (err) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }

}
module.exports = authenticationMiddleware