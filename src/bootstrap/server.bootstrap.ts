import { Application } from 'express';
import http from 'http'
import app from '../app'
import logger from '../helpers/logger';
import { IServer } from "./server.interface";

export class ServerBoostrap implements IServer{

    private port :number = 8000

    constructor(private app: Application) { 
        //super();
    }
    
    initialize(): Promise<any> {
        return new Promise((resolve,reject)=>{
            const server = http.createServer(app);
            server
            .listen(this.port)
            .on("listening", ()=>{
                logger.info(`Server is running in port ${this.port}`)
                resolve(true)
            })
            .on('error',err=>{
                logger.error(`Error starting the App \n ${JSON.stringify(err, null, '\t')}`)
                reject(err)
            })
        })
    }

}