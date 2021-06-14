require('dotenv/config')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const animeRouter = require('./routes/animes')
const usuarioRouter = require('./routes/usuarios')

const app = express()
app.use(morgan('dev'))

mongoose.connect('mongodb+srv://unidesc:unidesc@unidesc.zrjpt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Controll-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header('Acess-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    res.header(
        'Access-Controll-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method == 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, GET, DELETE')
        return res.status(200).json({})
    }
    next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/animes', animeRouter)
app.use('/usuarios', usuarioRouter)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app