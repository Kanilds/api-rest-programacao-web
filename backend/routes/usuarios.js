const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const Usuario = require('../models/usuarios')

router.post('/singin', (req, res, next) => {
    Usuario.find({ email: req.body.email })
        .exec()
        .then(usuario => {
            if (usuario.length >= 1) {
                return res.status(409).json({
                    message: "Usuario já cadastrado!"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        })
                    } else {
                        const usuario = new Usuario({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        usuario
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: "Usuario criado!"
                                })
                            })
                            .catch(error => {
                                res.status(500).json({
                                    error: error
                                })
                            })
                    }
                })
            }
        })
        .catch()
})

router.post('/login', (req, res, next) => {
    Usuario.find({ email: req.body.email })
        .exec()
        .then(usuario => {
            if (usuario.length < 1) {
                return res.status(401).json({
                    message: "Usuario não cadastrado!"
                })
            }
            bcrypt.compare(req.body.password, usuario[0].password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: "Senha incorreta!"
                    })
                }
                if (result) {
                    const token = jsonwebtoken.sign({
                        email: usuario[0].email,
                        id: usuario[0]._id
                    },
                    process.env.PRIVATE_KEY,
                    {
                        expiresIn: '1h'
                    })
                    return res.status(200).json({
                        message: "Usuario autenticado com sucesso!",
                        token: token
                    })
                }
                return res.status(401).json({
                    message: "Senha incorreta!"
                })
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
})

module.exports = router