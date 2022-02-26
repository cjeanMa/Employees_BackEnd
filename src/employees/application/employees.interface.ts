import { Employees } from "../domain/employees";

export interface IEmployees{
    getOne(id:string):Promise<Employees>
    getAll():Promise<Employees[]>
    create(emp:Employees):Promise<Employees>
    update(emp:Employees):Promise<Employees>
    findByIdAndType(id:string, type:string):Promise<Employees>
    findByEmail(email:string):Promise<Employees>
    listEmails():Promise<string[]>
    delete(id:string):Promise<Employees>
}