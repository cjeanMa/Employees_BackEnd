import { Employees } from "./employees/domain/employees"

export interface IDB{
    getEmployee(id:string):Employees
    getEmployees():Employees[]
    createEmployee(employee:Employees):Promise<Employees>
}