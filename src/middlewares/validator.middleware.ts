import { NextFunction, Request, Response } from "express"
import { IError } from "../helpers/error.handler"

export const validatorJoi = (schema:any) =>{
    return (req:Request, res:Response, next:NextFunction)=>{
        const validation = schema.validate(res.locals.paramsMerged)
        let errorValidation: string[] = []
        if(validation.hasOwnProperty('error')){
            validation.error.details.forEach((item:any)=>{
                errorValidation.push(item.message)
            })
        }
        if(errorValidation.length > 0){
            const error:IError = new Error("Error in validation of data")
            error.message = "Error in parameters"
            error.status = 411
            error.stack = errorValidation.join("")
            error.name = "Error Validation"
            return next(error)
        }
        next()
    }

}