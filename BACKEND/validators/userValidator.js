const joi = require('joi');

const validator = (schema) => (payload) => {
    return schema.validate(payload, { abortEarly: false });
};

const userSchema = joi.object({
    Name: joi.string().required(),
    Username: joi.string().required(),
    Password: joi.string().required(),
    Email: joi.string().email().required()
});

exports.uservalidator = validator(userSchema);
