import express, { Application } from 'express'
import {router as employeeRouter} from './employees/adadter/employees.routes'
import { ErrorHandler } from './helpers/error.handler'
import cors from 'cors'

const app:Application = express()

app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.use("/employees", employeeRouter)

app.use("*", ErrorHandler.notFound)

app.use(ErrorHandler.errorGeneral)

//app.listen(8000, ()=>console.log(`running in 8000`))

export default app
