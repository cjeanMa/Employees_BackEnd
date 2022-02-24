import fs from 'fs'
import { Employees } from '../employees/domain/employees'

const nameDB = 'employees.json'
const path = `./src/database/${nameDB}`

export const readData = () =>{
    if(!fs.existsSync(path))
        return null
    const data = fs.readFileSync(path, {encoding:'utf-8'})
    return JSON.parse(data)
}

export const writeData = async (data:Employees[]) =>{
    try {
        fs.writeFileSync(path,JSON.stringify(data))
        return true
    } catch (error) {
        console.log("Error writting file")
        throw error
    }
}