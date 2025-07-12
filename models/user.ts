import Joi from 'joi'

export function validateNewUser(body:any){
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().max(30).required(),
        password: Joi.string().min(8).required()
    }).unknown(true)
    return schema.validate(body)
}