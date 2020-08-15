const Joi = require('joi')


const email=Joi.string().email().required()
const password=Joi.string().max(10).required()

//more validations should be done

const check=Joi.object().keys({
	email,
	password
})

module.exports=check