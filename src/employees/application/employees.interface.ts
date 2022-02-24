import { Employees } from "../domain/employees";

export interface IEmployees{
    getOne(id:string):Employees
    getAll():Employees[]
    create(emp:Employees):Promise<Employees>
}