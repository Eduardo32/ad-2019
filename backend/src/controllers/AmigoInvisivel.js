const Participante = require('../models/Participante');

module.exports = {
    async destroy(req, res) {
        await Participante.deleteMany({});

        return res.json({"mensagem": "ok"});
    }
}