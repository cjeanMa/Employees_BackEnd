import { DB } from '../../db'
import { IDB } from '../../db.interface'
import { IEmployees } from '../application/employees.interface'
import { Employees } from '../domain/employees'

export class EmployeesOperation implements IEmployees{

    dbConnection:IDB

    constructor(){
        this.dbConnection = new DB()
    }

    async getOne(id:string):Promise<Employees>{
        try {
            return await this.dbConnection.getEmployee(id)
        } catch (error) {
            return null
        }
    }

    async getAll():Promise<Employees[]>{
        try {
            return await this.dbConnection.getEmployees()
        } catch (error) {
            return error
        }
    }

    async create(employee:Employees):Promise<Employees>{
        const newEmployee = this.dbConnection.createEmployee(employee)
        return newEmployee
    }

    async update(employee:Employees):Promise<Employees>{
        const updateEmployee = this.dbConnection.updateEmployee(employee)
        return updateEmployee
    }

    async findByIdAndType(id:string, type:string):Promise<Employees>{
        const employee = await this.dbConnection.findByIdAndType(id, type)
        return employee
    }

    async findByEmail(email:string):Promise<Employees>{
        const employee = await this.dbConnection.findByEmail(email)
        return employee
    }

    async listEmails():Promise<string[]>{
        const emails = await this.dbConnection.listEmails()
        return emails
    }

    async delete(id:string):Promise<Employees>{
        try {
            const employee = await this.dbConnection.deleteEmployee(id)
            return employee
        } catch (error) {
            return null
        }
    }

}