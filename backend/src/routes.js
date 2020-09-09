const express                      = require('express');
const { celebrate, Segments, Joi } = require ('celebrate');

const IncidentController = require('./controllers/IncidentController');
const OngController      = require('./controllers/OngController');
const ProfileController  = require('./controllers/ProfileController');
const SessionController  = require('./controllers/SessionController');

const routes = express.Router(); //DIFERENÇA

routes.   post('/sessions', SessionController.create) //VALIDAR O ID

routes.    get('/ongs', OngController.index)

routes.   post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({ //Validação
        name     : Joi.string().required(),
        email    : Joi.string().required().email(),
        whatsapp : Joi.string().required().min(10).max(11),
        city     : Joi.string().required(),
        uf       : Joi.string().required().length(2)
    })
}), OngController.create);

routes.    get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({ //Headers é diferente do body pois não tem o keys, é direto no object
        authorization : Joi.string().required()
    }).unknown()
}) , ProfileController.index);

routes.   post('/incidents', IncidentController.create);                                        //VALIDAÇÃO DO HEADER E DO BODY
routes.    get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}) , IncidentController.index);
routes. delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}) , IncidentController.delete);

module.exports = routes;