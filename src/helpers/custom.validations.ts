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