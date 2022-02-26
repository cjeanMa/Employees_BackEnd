import { Employees } from "./employees/domain/employees"

export interface IDB{
    getEmployee(id:string):Promise<Employees>
    getEmployees():Employees[]
    createEmployee(employee:Employees):Promise<Employees>
    updateEmployee(employee:Employees):Promise<Employees>
    deleteEmployee(id:string):Promise<Employees>
    findByIdAndType(id:string, type:string):Promise<Employees>
    findByEmail(email:string):Promise<Employees>
    listEmails():Promise<string[]>
}