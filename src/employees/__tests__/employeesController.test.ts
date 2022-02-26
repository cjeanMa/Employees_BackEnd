import app from '../../app'
import request from 'supertest'
import { assert } from 'console';
//Para hacer las pruebas es necesario tener un id deRegistro 
//y cambiar el nIdentifiaction del primer POST

let idCreated:string = "/employees/e273a1f7-604d-45c8-9b98-23fd54ec2b70"

describe("POST EMPLOYEE", ()=>{
    it("return status 201 when send employee with ids register before", async()=>{
        const res = await request(app)
            .post("/employees")
            .send({
                "primerApellido": "DOLORES ",
                "segundoApellido": "TICONA",
                "primerNombre": "GABO",
                "otrosNombres": "RONALDO",
                "pais": "Estados Unidos",
                "tIdentificacion": "Cédula de Extranjería",
                "nIdentificacion": "80991812",
                "area": "Administración",
                "fechaIngreso": "2022-02-20"
            })
            .expect(201)
    })

    it("return status 400 when send correct values", async()=>{
        const res = await request(app)
            .post("/employees")
            .send({
                "primerApellido": "DOLORES ",
                "segundoApellido": "TICONA",
                "primerNombre": "GABO",
                "otrosNombres": "RONALDO",
                "pais": "Estados Unidos",
                "tIdentificacion": "Cédula de Extranjería",
                "nIdentificacion": "80917892",
                "area": "Administración",
                "fechaIngreso": "2022-02-20"
            })
            .expect(400)
            .then(response=>{
                assert(response.body.msg, "employee exists in db")
            })
    })

    it("return status 411 when send employee with invalid parameters", async()=>{
        const res = await request(app)
            .post("/employees")
            .send({
                "primerApellido": "DOLORES ",
                "segundoApellido": "TICONA",
                "otrosNombres": "RONALDO",
                "pais": "Estados Unidos",
                "tIdentificacion": "Cédula de Extranjería",
                "nIdentificacion": "80997812",
                "area": "Administración",
                "fechaIngreso": "2022-02-20"
            })
            .expect(411)
    })
})

describe("GET_ALL EMPLOYEES",()=>{
    it("return status code 200 if exist records", async()=>{
        const res = await request(app)
            .get("/employees");
        expect(res.statusCode).toEqual(200)
    })
})

describe("GET_ONE EMPLOYEES",()=>{
    it("return status code 200 if exist records", async()=>{
        const res = await request(app)
            .get(idCreated);
        expect(res.statusCode).toEqual(200)
    })


    it("return status code 400 if exist records", async()=>{
        const res = await request(app)
            .get("/employees/id-no-valido");
        expect(res.statusCode).toEqual(400)
    })
})


describe("UPDATE EMPLOYEE", ()=>{
    it("return status 200 when send employee with ids register before", async()=>{
        const res = await request(app)
            .put(idCreated)
            .send({
                "primerApellido": "DOLORES DEL CAMPO",
            })
            .expect(200)
    })

    it("return status 400 when send id employee invalid", async()=>{
        const res = await request(app)
            .put(`/employees/id-employee-invalid`)
            .send({
                "primerApellido": "CAMPOS",
            })
            .expect(400)
    })

    it("return status 411 when send employee with invalid parameters", async()=>{
        const res = await request(app)
            .put(idCreated)
            .send({
                "primerApellido": "dolores",
            })
            .expect(411)
    })
})

describe("DELETE EMPLOYEE", ()=>{
    it("Return status 400 if id employee not exits", async()=>{
        const res = await request(app)
            .delete("/employees/id-no-valido")
            .expect(400)
    })

    it("Return status 200 when succesfully delete a employee", async()=>{
        const res = await request(app)
            .delete(idCreated)
            .expect(200)
    })
})
