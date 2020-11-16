const Participante = require('../models/Participante');

module.exports = {
    async store(req, res) {
        const { nome, email } = req.body;

        let participante = await Participante.findOne({ email });

        if(!participante) {    
            participante = await Participante.create({
                nome,
                email,
            });
        }
    
        return res.json(participante);
    },

    async index(req, res) {
        const participantes = await Participante.find();

        return res.json(participantes);
    },

    async update(req, res) {
        const { nome, email, amigo } = req.body;

        const participante = await Participante.findByIdAndUpdate(
            req.params.id, {
                nome,
                email,
                amigo,
            }
        );

        return res.json(participante);
    },

    async destroy(req, res) {
        await Participante.deleteOne({ _id: req.params.id });

        return res.json({"mensagem": "ok"});
    }
};