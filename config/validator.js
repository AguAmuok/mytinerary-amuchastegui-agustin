const joi = require('joi')

const validator = (req, res, next) => {
    // console.log("req.body es")
    // console.log(req.body)
    const schema = joi.object({
        nameUser: joi.string()
            .min(3)
            .max(20)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': 'name: min 3 characters',
                'string.max': 'name: max 20 characters'}),
        lastNameUser: joi.string()
            .min(3)
            .max(20)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))//expresiones regulares
            .required()
            .messages({
                'string.min': '"last name": min 3 characters',
                'string.max': '"last name": max 20 characters'}),
        photoUser: joi.string()
            .min(5)
            .trim()
            .required(),
        email: joi.string()
            .email({minDomainSegments:2})
            .required()
            .messages({
                'string.email': '"mail": incorrect format'}),
        country: joi.string()
            .min(0),
            
        
        from: joi.string(),
            // .required()
        password: joi.string()
            .min(5)
            .max(40)
            .pattern(new RegExp('[a-zA-Z0-9]'))
            .required()
            .messages({
                'string.min': '"password": min 8 characters',
                'string.max': '"password": max 30 characters'}),
        
    })
    const validation = schema.validate(req.body, {abortEarly:false})// realiza todas las verificaciones y lo devuelve en un array( muestra las alertas de los campos requeridos)
    if (validation.error) {
        return res.json({success: false, from: 'validator', message: validation.error.details, test: validation})//devuelve un error enc caso que algo este mal y manda un msj
    }
    next()// pasa al signIn si todo esta bien
}

module.exports = validator