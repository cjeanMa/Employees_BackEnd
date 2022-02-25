import app from "./app";
import { ServerBoostrap } from "./bootstrap/server.bootstrap";

const serverBootstrap = new ServerBoostrap(app)

const main = async() =>{
    try {
        await serverBootstrap.initialize()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main()