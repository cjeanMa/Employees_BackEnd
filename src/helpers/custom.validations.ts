import { date } from "joi"
import pseudoData from "../constants/constants"

export const validateCountry = (value:string, helpers:any) =>{
    if(!pseudoData.paises.includes(value))
        throw new Error(`Country not valid [ ${pseudoData.paises.join(", ")} ]`)
    return value
}

export const validateID = (value:string, helpers:any) =>{
    if(!pseudoData.identificaciones.includes(value))
        throw new Error(`Type of identification not valid [ ${pseudoData.identificaciones.join(", ")} ]`)
    return value
}

export const validateArea = (value:string, helpers:any)=>{
    if(!pseudoData.area.includes(value))
        throw new Error(`Type od area no allow; [ ${pseudoData.area.join(", ")} ]`)
    return value
}

export const validateFechaIngreso = (value:Date, helpers:any) =>{
    const today = new Date().getTime()
    const before = new Date().getTime() - (60*60*24*30*1000)
    const valueInput = new Date(value).getTime()
    if(valueInput < today && valueInput > before)
       return value
    throw new Error(`Date allow until 30 days before`) 
}