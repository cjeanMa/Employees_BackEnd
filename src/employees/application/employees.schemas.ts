import Joi from "joi";
import { validateCountry, validateID } from "../../helpers/custom.validations";

export const employeesSchema = {
    GET_ONE: Joi.object({
        id: Joi.string().required()
    }),
    CREATE: Joi.object({
        primerApellido: Joi.string().pattern(/^[A-Z]{3,20}$/).required(),
        segundoApellido: Joi.string().pattern(/^[A-Z]{3,20}$/).required(),
        primerNombre: Joi.string().pattern(/^[A-Z]{3,20}$/).required(),
        otrosNombres:Joi.string().pattern(/^[A-Z | \s]{3,50}$/),
        pais: Joi.string().custom(validateCountry, "Country").required(),
        tIdentificacion: Joi.string().custom(validateID, "Type Identification validation").required(),
        nIdentificacion:  Joi.string().required(),
    }),
    UPDATE: Joi.object({
        id: Joi.string().required(),
        primerApellido: Joi.string().required(),
        segundoApellido: Joi.string().required(),
        primerNombre: Joi.string().required(),
        otrosNombres:Joi.string(),
        pais: Joi.string(),
        tIdentificacion: Joi.string().required(),
        nIdentificacion:  Joi.string().required(),
    })
}