import { DB } from '../../db'
import { IDB } from '../../db.interface'
import { IEmployees } from '../application/employees.interface'
import { Employees } from '../domain/employees'

export class EmployeesOperation implements IEmployees{

    dbConnection:IDB

    constructor(){
        this.dbConnection = new DB()
    }

    getOne(id:string):Employees{
        return this.dbConnection.getEmployee(id)
    }

    getAll():Employees[]{
        return this.dbConnection.getEmployees()
    }

    async create(employee:Employees):Promise<Employees>{
        const newEmployee = this.dbConnection.createEmployee(employee)
        return newEmployee
    }

}