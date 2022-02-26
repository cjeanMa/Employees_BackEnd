import pseudoData from "../../constants/constants"
import { EmployeesOperation } from "../infraestruture/employees.operation";
import { IEmployees } from "./employees.interface";
import { EmployeesUseCase } from "./employees.usecase";

export const normalizarText = (text:string) =>{
    return text.split(" ").join("")
}
/**
 * Function to generate a new email
 * @param nombre 
 * @param apellido 
 * @param pais 
 * @param lEmail 
 * @returns 
 */
export const generateEmail = async (nombre: string, apellido: string, pais: string, lEmail:string[]) => {
    let stateGenerate: boolean = false
    let dominio: string = null
    let email:string=null
    if (pseudoData.dominio.hasOwnProperty(pais))
        dominio = pseudoData.dominio[pais as keyof typeof pseudoData.dominio];
    let index:number = 0;
    while (!stateGenerate) {
        email = (!index)?
                `${nombre}.${normalizarText(apellido)}@${dominio}`:
                `${nombre}.${normalizarText(apellido)}.${index}@${dominio}`
       if(lEmail.includes(email.toLowerCase())){
           index++
       }
       else{
           stateGenerate = true
       }
    }
    return email.toLowerCase()
}
