const router = require('express').Router()
const mongoose = require('mongoose')

const Anime = require('../models/animes')
const checkAuth = require('../middleware/checkAuth')

router.get('/', (req, res, next) => {
    
    Anime.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(reject => {
            res.status(500).json({
                error: reject
            })
        })
})

router.get('/:animeId', (req, res, next) => {

    Anime.findOne({ _id: req.params.animeId })
        .exec()
        .then(result => {
            if (result === null) {
                res.status(404).json({
                    message: "Anime não encontrado!",
                })
            }
            res.status(200).json({
                anime: result
            })
        })
        .catch(reject => {
            res.status(500).json({
                error: reject
            })
        })
})

router.post('/', (req, res, next) => {

    const anime = new Anime({
        _id: new mongoose.Types.ObjectId(),
        titulo: req.body.titulo,
        estudio: req.body.estudio,
        status: req.body.status,
        progresso: req.body.progresso,
        nota: req.body.nota
    })

    anime.save()
        .then(result => {
            res.status(201).json({
                message: 'Anime salvo com sucesso!',
                anime
            })
        })
        .catch(reject => {
            res.status(404).json({
                message: "Anime não encontrado!",
                error: reject
            })
        })
})

router.put('/:animeId', (req, res, next) => {

    Anime.updateOne(
        { _id: req.params.animeId },
        {
            titulo: req.body.titulo,
            estudio: req.body.estudio,
            status: req.body.status,
            progresso: req.body.progresso,
            nota: req.body.nota
        }
        )
        .then(result => {
            res.status(200).json({
                message: 'Anime atualizado com sucesso!',
            })
        })
        .catch(reject => {
            res.status(500).json({
                error: reject
            })
        })
})

router.delete('/:animeId', (req, res, next) => {

    Anime.deleteOne({ _id: req.params.animeId })
        .then(result => {
            res.status(200).json({
                message: 'Anime deletado com sucesso!',
            })
        })
        .catch(reject => {
            res.status(404).json({
                message: "Anime não encontrado!",
                error: reject
            })
        })
})

module.exports = router