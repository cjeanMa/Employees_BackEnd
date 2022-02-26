import moment from "moment";
import { v4 as uuidv4 } from 'uuid'
import { Employees } from "../domain/employees";
import { IEmployees } from "./employees.interface";
import { generateEmail } from "./employees.service";
import pseudoData from "../../constants/constants";

export class EmployeesUseCase {

    constructor(private operationEmployees: IEmployees) { }

    async getOne(id: string): Promise<Employees> {
        return await this.operationEmployees.getOne(id)
    }

    async getAll(): Promise<Employees[]> {
        return await this.operationEmployees.getAll()
    }

    async create(emp: Partial<Employees>): Promise<Employees> {
        const id = uuidv4()
        const estado = "activo"
        const fechaCreacion = moment().format("DD-MM-YYYY hh:mm:ss")
        const lEmails = await this.operationEmployees.listEmails();
        const correo = await generateEmail(emp.primerNombre, emp.primerApellido, emp.pais, lEmails)
        const newEmployee: Employees = { id, ...emp, correo, estado, fechaCreacion } as Employees
        return this.operationEmployees.create(newEmployee)
    }

    async update(emp: Partial<Employees>): Promise<Employees> {
        try {
            const dEmployee = await this.getOne(emp.id);
            const fechaActualizacion = moment().format("DD-MM-YYYY hh:mm:ss")
            let newEmployee: Employees = null
            if (dEmployee.primerNombre != emp.primerNombre || dEmployee.primerApellido != emp.primerApellido) {
                const firstValueCorreo = !emp.primerNombre?
                                            dEmployee.primerNombre:
                                            emp.primerNombre
                const secondValueCorreo = !emp.primerApellido?
                                            dEmployee.primerApellido:
                                            emp.primerApellido
                const valuePais = !emp.pais?
                                dEmployee.pais:
                                emp.pais
                const lEmails = await this.operationEmployees.listEmails();
                const correo = await generateEmail(firstValueCorreo, secondValueCorreo, valuePais, lEmails)
                newEmployee = Object.assign(dEmployee,{ ...emp, correo, fechaActualizacion }) as Employees
            }
            else {
                newEmployee = Object.assign(dEmployee,{ ...emp, fechaActualizacion }) as Employees
            }
            return this.operationEmployees.update(newEmployee)  
        } catch (error) {
            console.log("Error updating")
            return null
        }
    }

    async findByIdAndType(id: string, type: string): Promise<Employees> {
        try {
            const employee = await this.operationEmployees.findByIdAndType(id, type)
            return employee
        } catch (error) {
            console.log("Error findingIds")
            return error
        }
    }

    async findByEmail(email: string): Promise<Employees> {
        const employee = await this.operationEmployees.findByEmail(email)
        return employee
    }

    async delete(id:string):Promise<Employees>{
        try {
            const employee = await this.operationEmployees.delete(id)
            return employee    
        } catch (error) {
            return null
        }
    }

}