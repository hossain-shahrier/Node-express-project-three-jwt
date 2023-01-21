const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
    const { username, password } = req.body

    // mongo
    // Joi
    // Check in the controller
    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400)
    }

    const id = new Date().getDate()
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(200).json({ msg: 'user created', token })
}
const dashboard = async (req, res) => {
    // Jwt header
    const authHeader = req.headers.authorization;
    // Check if the token is provided
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401)
    }
    const token = authHeader.split(' ')[1]
    // Varify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const luckeyNumber = Math.floor(Math.random() * 100)
        res.status(200).json({
            msg: `Hello, ${decoded.username}`, secret: `Here is your authorized data, your lucky number is ${luckeyNumber}`
        })
    } catch (err) {
        throw new CustomAPIError('Not authorized to access this route', 401)
    }
}
module.exports = {
    login,
    dashboard
}