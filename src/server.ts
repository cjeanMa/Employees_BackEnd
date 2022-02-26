import app from "./app";
import { ServerBoostrap } from "./bootstrap/server.bootstrap";
import logger from "./helpers/logger";

const serverBootstrap = new ServerBoostrap(app)

const main = async() =>{
    try {
        await serverBootstrap.initialize()
        logger.info("App Employees Running")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main()