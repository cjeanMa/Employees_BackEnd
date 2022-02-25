import { Application } from 'express';
import http from 'http'
import app from '../app'
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
                console.log(`app running in port ${this.port}`)
                resolve(true)
            })
            .on('error',err=>{
                console.log("Error initializing app")
                reject(err)
            })
        })
    }

}