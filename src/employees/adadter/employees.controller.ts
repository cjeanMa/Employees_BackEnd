import { Request, Response } from 'express'
import { rmSync } from 'fs';
import { IEmployees } from '../application/employees.interface';
import { EmployeesUseCase } from '../application/employees.usecase';
import { EmployeesOperation } from '../infraestruture/employees.operation'

const operationEmployees = new EmployeesOperation();
const employeesUsecase = new EmployeesUseCase(operationEmployees)

export class EmployeesController {

    getOne(req: Request, res: Response) {
        const { id } = req.params
        const employee = employeesUsecase.getOne(id)
        res.status(200).json(employee)
    }

    getAll(req: Request, res: Response) {
        const employees = employeesUsecase.getAll()
        res.status(200).json(employees)
    }

    async createEmployee(req:Request, res:Response){
        const employee = {...req.body}
        const newEmployee = employeesUsecase.create(employee)
        if(!newEmployee)
            res.status(500).json({msg: "Error creating" })
        res.status(201).json(newEmployee)

    }

}