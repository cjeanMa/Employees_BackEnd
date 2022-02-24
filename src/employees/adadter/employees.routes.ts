import { Router } from 'express'
import { EmployeesController } from './employees.controller'

const router = Router()
const employeesController = new EmployeesController()

router.get("", employeesController.getAll)
router.get("/:id", employeesController.getOne)
router.post("", employeesController.createEmployee)

export {router}