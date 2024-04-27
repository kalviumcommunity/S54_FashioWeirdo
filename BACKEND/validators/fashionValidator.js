const joi = require('joi')

const validator=(schema)=>(payload)=>{
    return schema.validate(payload,{abortEarly:false});
};

const fashionSchema = joi.object({
    name: joi.string().required(),
    region: joi.string().required(),
    image:joi.string().required(),
    description:joi.string().required(),
    Username:joi.string().required()

})

exports.fashionValidator = validator(fashionSchema)