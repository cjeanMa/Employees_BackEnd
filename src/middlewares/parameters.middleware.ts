import { Response, Request, NextFunction } from "express"

export const mergeParameter= () =>{
    return (req:Request, res: Response, next: NextFunction) =>{
        let paramsMerged = {};
        if(req.hasOwnProperty("params")){
            paramsMerged = {...paramsMerged, ...req.params}
        }
        if(req.hasOwnProperty("body")){
            paramsMerged = {...paramsMerged, ...req.body}
        }
        if(req.hasOwnProperty("query")){
            paramsMerged = {...paramsMerged, ...req.query}
        }
        res.locals.paramsMerged = {...paramsMerged};
        next()
    }
}