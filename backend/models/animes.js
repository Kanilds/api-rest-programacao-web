const mongoose = require('mongoose')

const animeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titulo: {
        type: String,
        require: true
    },
    estudio: {
        type: String
    },
    status: {
        type: String,
        require: true
    },
    progresso: {
        type: Number
    },
    nota: {
        type: Number
    }
})

module.exports = mongoose.model('Anime', animeSchema)