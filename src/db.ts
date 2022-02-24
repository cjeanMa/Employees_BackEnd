import fs from 'fs'
import { IDB } from './db.interface';
import { Employees } from './employees/domain/employees';
import { readData, writeData } from './helpers/handleArchive';

export class DB implements IDB{

    private dataEmployees:Employees[];
    
    constructor(){
        if(!readData()){
            this.dataEmployees = []
        } else {
            this.dataEmployees = readData()
        }
    }

    getEmployee(id:string):Employees{
        const employee = this.dataEmployees.find(el=>el.id===id)
        return employee
    }

    getEmployees():Employees[]{
        return this.dataEmployees
    }

    async createEmployee(employee:Employees):Promise<Employees>{
        this.dataEmployees.push(employee)
        try {
            writeData(this.dataEmployees)
            return employee
        } catch (error) {
            throw error
        }
    }

}