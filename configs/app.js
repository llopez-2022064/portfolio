//Configuracion express

//Importaciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'
import appointmentRoutes from '../src/appointment/appointment.routes.js'


//Configuraciones
const app = express() //Crear el servidor
config()
const port = process.env.PORT || 3200

//Configurar el servidor de express
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) //aceptar o denegar las solicitudes de diferentes origenes (Local o remota) / politicas de acceso al server
app.use(helmet())  //Aplica capa de seguridad
app.use(morgan('dev')) //Crea logs de solicitudes al servidor HTTP

//Declaracion de rutas
app.use(userRoutes)
app.use('/animal', animalRoutes) //localhost:2880/animal/test
app.use('/appointment', appointmentRoutes)


//Levantar el servidor
export const initServer = () =>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}