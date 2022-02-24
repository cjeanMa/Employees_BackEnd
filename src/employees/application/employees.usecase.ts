import { Employees } from "../domain/employees";
import { IEmployees } from "./employees.interface";
import {v4 as uuidv4} from 'uuid'

export class EmployeesUseCase{

    constructor(private operationEmployees:IEmployees){}

    getOne(id:string):Employees{
        return this.operationEmployees.getOne(id)
    }

    getAll():Employees[]{
        return this.operationEmployees.getAll()
    }

    async create(emp:Partial<Employees>):Promise<Employees>{
        const id = uuidv4()
        const newEmployee:Employees={id, ...emp} as Employees
        return this.operationEmployees.create(newEmployee)
    }

}