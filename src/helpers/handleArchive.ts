import fs from 'fs'
import { Employees } from '../employees/domain/employees'

const nameDB = 'employees.json'
const path = `./src/database/${nameDB}`
/**
 * 
 * @returns Data store in archive
 */
export const readData = () =>{
    if(!fs.existsSync(path))
        return null
    const data = fs.readFileSync(path, {encoding:'utf-8'})
    return JSON.parse(data)
}
/**
 * 
 * @param data Object with data top save
 * @returns Boolean to confirmate transaction
 */
export const writeData = async (data:Employees[]) =>{
    try {
        fs.writeFileSync(path,JSON.stringify(data))
        return true
    } catch (error) {
        console.log("Error writting file")
        throw error
    }
}