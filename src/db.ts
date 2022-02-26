import fs from 'fs'
import { resolve } from 'path/posix';
import { IDB } from './db.interface';
import { Employees } from './employees/domain/employees';
import { readData, writeData } from './helpers/handleArchive';

export class DB implements IDB {

    private dataEmployees: Employees[];

    constructor() {
        if (!readData()) {
            this.dataEmployees = []
        } else {
            this.dataEmployees = readData()
        }
    }

    getEmployee(id: string): Promise<Employees> {
        return new Promise((resolve, reject) => {
            const employee = this.dataEmployees.find(el => el.id === id)
            if (employee)
                resolve(employee)
            reject(null)
        })
    }

    getEmployees(): Promise<Employees[]> {
        return new Promise((resolve, reject)=>{
            if(this.dataEmployees.length === 0)
                reject(null)
            resolve(this.dataEmployees)
        })
    }

    findByIdAndType(id: string, type: string): Promise<Employees> {
        return new Promise((resolve, reject) => {
            let sEmployee: Employees = null
            for (let employee of this.dataEmployees) {
                if (employee.nIdentificacion === id && employee.tIdentificacion === type) {
                    sEmployee = employee
                    resolve(sEmployee)
                    break;
                }
            }
            reject(null)
        })
    }

    findByEmail(email: string): Promise<Employees> {
        return new Promise((resolve, reject) => {
            let sEmployee: Employees = null
            for (let employee of this.dataEmployees) {
                if (employee.correo === email) {
                    sEmployee = employee
                    resolve(sEmployee)
                    break;
                }
            }
            return reject(null)
        })
    }

    listEmails(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const emails: string[] = this.dataEmployees.map(el => el.correo)
            resolve(emails)
        })
    }

    async createEmployee(employee: Employees): Promise<Employees> {
        return new Promise((resolve, reject) => {
            this.dataEmployees.push(employee)
            writeData(this.dataEmployees)
            resolve(employee)
        })
    }

    async updateEmployee(employee: Employees): Promise<Employees> {
        return new Promise((resolve, reject) => {
            let index
            for (let i = 0; i < this.dataEmployees.length; i++) {
                if (this.dataEmployees[i].id === employee.id) {
                    index = i
                    break
                }
            }
            if (!this.dataEmployees[index]) {
                reject(null)
            }
            this.dataEmployees[index] = employee
            writeData(this.dataEmployees)
            resolve(employee)
        })
    }

    async deleteEmployee(id: string): Promise<Employees> {
        const employee = await this.getEmployee(id)
        return new Promise((resolve, reject) => {
            if (!employee)
                reject(null)
            this.dataEmployees = this.dataEmployees.filter(el => el.id != id)
            writeData(this.dataEmployees)
            resolve(employee)
        })
    }

}