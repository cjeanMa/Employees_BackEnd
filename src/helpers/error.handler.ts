import { Request, Response, NextFunction } from "express";

export interface IError extends Error{
    status?:number
}

export class ErrorHandler {

    static notFound(req:Request, res:Response, next:NextFunction){
        const error:IError = new Error("Page not found")
        error.status = 404
        next(error)
    }

    static errorGeneral(error:IError, req:Request, res:Response, next:NextFunction){
    const errorResponse = {
        name: error.name,
        status: error.status,
        message: error.message,
        stack: error.stack
    }
    res.status(error.status).json(errorResponse)
    }

}