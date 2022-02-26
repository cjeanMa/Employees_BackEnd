import { Router } from 'express'
import { mergeParameter } from '../../middlewares/parameters.middleware'
import { validatorJoi } from '../../middlewares/validator.middleware'
import { employeesSchema } from '../application/employees.schemas'
import { EmployeesController } from './employees.controller'

const router = Router()
const employeesController = new EmployeesController()

router.get("", employeesController.getAll)
router.get("/:id",
    mergeParameter(),
    validatorJoi(employeesSchema.GET_ONE),
    employeesController.getOne)
router.post("", [
    mergeParameter(),
    validatorJoi(employeesSchema.CREATE)
], employeesController.createEmployee)
router.put("/:id", [
    mergeParameter(),
    validatorJoi(employeesSchema.UPDATE)
], employeesController.updateEmployee)
router.delete("/:id",
    mergeParameter(),
    validatorJoi(employeesSchema.DELETE),
    employeesController.deleteEmployee)

export { router }