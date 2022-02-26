import { Request, Response } from 'express'
import { IEmployees } from '../application/employees.interface';
import { EmployeesUseCase } from '../application/employees.usecase';
import { EmployeesOperation } from '../infraestruture/employees.operation'
import logger from '../../helpers/logger';

const operationEmployees: IEmployees = new EmployeesOperation();
const employeesUsecase = new EmployeesUseCase(operationEmployees)

export class EmployeesController {

    async getOne(req: Request, res: Response) {
        const { id } = req.params
        const employee = await employeesUsecase.getOne(id)
        if (!employee) {
            logger.warn(`El ID ${id} no fue encontrado en la BD`)
            return res.status(400).json({ msg: "ID not found" })
        }
        logger.info(`Consulta de Employee con ID ${id} \n ${JSON.stringify(employee, null, '\t')}`)
        res.status(200).json(employee)
    }

    async getAll(req: Request, res: Response) {
        const employees = await employeesUsecase.getAll()
        if (!employees) {
            logger.warn(`List of Employees Empty`)
            return res.status(204).json({ msg: "no content" })
        }
        logger.info(`GET List of employees`)
        res.status(200).json(employees)
    }

    async createEmployee(req: Request, res: Response) {
        const employee = { ...req.body }
        const validateIds = await employeesUsecase.findByIdAndType(employee.nIdentificacion, employee.tIdentificacion)
        if (validateIds) {
            logger.warn(`Triying to create a employee when id and typeId exist in DB`)
            return res.status(400).json({
                msg: `employee exists in db`
            })
        }
        const newEmployee = await employeesUsecase.create(employee)
        if (!newEmployee) {
            logger.warn(`Error trying to create ${newEmployee}`)
            res.status(400).json({ msg: "Error creating" })
        }
        logger.info(`Succesfully creating new Employee \s ${JSON.stringify(newEmployee, null, '\t')}`)
        res.status(201).json(newEmployee)
    }

    async updateEmployee(req: Request, res: Response) {
        const employee = { id: req.params.id, ...req.body }
        const newEmployee = await employeesUsecase.update(employee)
        if (!newEmployee) {
            logger.warn(`Error triying to update a employee ${JSON.stringify(employee, null, '\t')}`)
            return res.status(400).json({ msg: "Error Updating" })
        }
        logger.info(`Succesfully Updating Employee \s ${JSON.stringify(newEmployee, null, '\t')}`)
        res.status(200).json(newEmployee)
    }

    async deleteEmployee(req: Request, res: Response) {
        const { id } = req.params
        const employee = await employeesUsecase.delete(id)
        if (!employee) {
            logger.warn(`Employee not found to delete with ID: ${id}`)
            return res.status(400).json({ msg: "Employee not found" })
        }
        logger.info(`Succesfully deleting Employee \s ${JSON.stringify(employee, null, '\t')}`)
        res.status(200).json(employee)
    }

}