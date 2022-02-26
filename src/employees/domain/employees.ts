export interface Employees{
    id: string
    primerApellido:string
    segundoApellido:string
    primerNombre:string
    otrosNombres?:string
    pais: string
    tIdentificacion:string
    nIdentificacion:string
    correo:string
    fechaIngreso:Date
    area:string
    estado:string
    fechaCreacion:string
    fechaActualizacion?:string
}