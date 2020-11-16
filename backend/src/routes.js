const { Router } = require('express');
const ParticipanteController = require('./controllers/ParticipanteController');
const AmigoInvisivel = require('./controllers/AmigoInvisivel');

const routes = Router();

routes.get('/participantes', ParticipanteController.index);
routes.post('/participantes', ParticipanteController.store);
routes.put('/participantes/:id', ParticipanteController.update);
routes.delete('/participantes/:id', ParticipanteController.destroy);

routes.delete('/participantes/', AmigoInvisivel.destroy);

module.exports = routes;