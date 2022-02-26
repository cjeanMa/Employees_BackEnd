import fs from 'fs'
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

    getEmployees(): Employees[] {
        return this.dataEmployees
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
        this.dataEmployees.push(employee)
        try {
            writeData(this.dataEmployees)
            return employee
        } catch (error) {
            throw error
        }
    }

    async updateEmployee(employee: Employees): Promise<Employees> {
        let index
        for (let i = 0; i < this.dataEmployees.length; i++) {
            if (this.dataEmployees[i].id === employee.id) {
                index = i
                break
            }
        }
        this.dataEmployees[index] = employee
        try {
            writeData(this.dataEmployees)
            return employee
        } catch (error) {
            throw error
        }
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