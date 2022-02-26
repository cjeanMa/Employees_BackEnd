import Joi from "joi";
import moment from "moment"
import { validateArea, validateCountry, validateFechaIngreso, validateID } from "../../helpers/custom.validations";

export const employeesSchema = {
    GET_ONE: Joi.object({
        id: Joi.string().required()
    }),
    CREATE: Joi.object({
        primerApellido: Joi.string().pattern(/^[A-Z|\s]{3,20}$/).required(),
        segundoApellido: Joi.string().pattern(/^[A-Z|\s]{3,20}$/).required(),
        primerNombre: Joi.string().pattern(/^[A-Z]{3,20}$/).required(),
        otrosNombres:Joi.string().pattern(/^[A-Z|\s]{3,50}$/),
        pais: Joi.string().custom(validateCountry, "Country").required(),
        tIdentificacion: Joi.string().custom(validateID, "Type Identification validation").required(),
        nIdentificacion:  Joi.string().pattern(/[a-zA-Z0-9|-]{8,20}/).required(),
        area: Joi.string().custom(validateArea, "Validation Area").required(),
        fechaIngreso: Joi.date().custom(validateFechaIngreso, "Validation FechaIngreso").required()
    }),
    UPDATE: Joi.object({
        id: Joi.string().required(),
        primerApellido: Joi.string().pattern(/^[A-Z|\s]{3,20}$/).required(),
        segundoApellido: Joi.string().pattern(/^[A-Z|\s]{3,20}$/).required(),
        primerNombre: Joi.string().pattern(/^[A-Z]{3,20}$/).required(),
        otrosNombres:Joi.string().pattern(/^[A-Z|\s]{3,50}$/),
        pais: Joi.string().custom(validateCountry, "Country").required(),
        tIdentificacion: Joi.string().custom(validateID, "Type Identification validation").required(),
        nIdentificacion:  Joi.string().pattern(/[a-zA-Z0-9|-]{8,20}/).required(),
        area: Joi.string().custom(validateArea, "Validation Area").required(),
        fechaIngreso: Joi.date().custom(validateFechaIngreso, "Validation FechaIngreso").required()
    }),
    DELETE: Joi.object({
        id: Joi.string().required()
    })
}