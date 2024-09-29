const jwt = require('jsonwebtoken')

const handleDashboard = (req, res) => {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer')) {
        res.status(401).json({ message: "no token" })
    }
    const token = auth.split(' ')[1]
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const number = Math.floor(Math.random() * 100)
        res.status(200).json({ msg: `Hi ${decoded.name} your random number is ${number}` })
    } catch (error) {
        console.log(error)
        res.status(401)
    }

}
const handleLogin = (req, res) => {
    console.log(req.body)
    const { name, password } = req.body
    const token = jwt.sign({ name, password }, process.env.JWT_SECRET, { expiresIn: '30d' })//never send password lol
    res.status(200).json({ msg: "User Created", token })
}


module.exports = { handleLogin, handleDashboard }