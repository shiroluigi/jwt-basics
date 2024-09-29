require('dotenv').config()

const express = require('express')
const routes = require('./routes/routesHandle')
const app = express()
app.use(express.json())
app.set('view engine','ejs')
app.use(express.static(__dirname+'/public'))


app.get('/',(req,res)=>{
    res.render('home')
})

app.use('/api',routes)

const start = async () => {
    try {
        app.listen(process.env.PORT, console.log(`Server listening at port ${process.env.PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()