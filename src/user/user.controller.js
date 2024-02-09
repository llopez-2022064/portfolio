//Logica

'use strict'

import User from './user.model.js' //Unico que puede ir en mayusculas
import { checkPassword, checkUpdate, encrypt } from '../utils/validator.js'

export const test = (req, res)=>{
    return res.send('Hello world')
}

export const register = async(req, res) =>{ //Solo para clientes
    try {
        //Capturar la informacion del cliente (body)
        let data = req.body //Captura todo lo que viene del body
        // console.log(data)

        //Encriptar la contrasena 
        data.password = await encrypt(data.password)

        //Asignar el rol por defecto
        data.role = 'CLIENT' //Si viene con otro valor o no viene, lo asigna a rol cliente

        //Crear una instancia del modelo (Schema)
        let user = new User(data)

        //Guardar la informacion 
        await user.save()

        //Respondo al usuario
        return res.send({message: 'Registered succcessfully'})

    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error registering user', error})
    }
}

export const login = async (req, res) =>{
    try {
        //capturar la informacion
        let {username , password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne({ username }) //usarname : jchitay 
        
        //Verifico que la contrasena coincida
        if(user && await checkPassword(password, user.password)){
            let loggedUserd = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Respondo al usuario (dar acceso)
            return res.send({message: `Welcome ${loggedUserd.name}`, loggedUserd})
        }
        return res.send.status(404).send({message: 'Invalid credentials'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Failed to login'})
    }
}

// Actualizar 
export const update = async(req, res)=>{ //Usuarios logeados
    try {
        //Obtener el id del usuario a actualizar
        let { id } = req.params
        //Obtener datos que vamos a actualizar
        let data = req.body
        //Validar si trae datos a actualizar
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        //Validar si tiene permisos para actualizar (tokenizacion) 

        //Actualizar en la DB
        let updateUser = await User.findOneAndUpdate(
            {_id: id}, //ObjectId <- hexadecimal (hora del sisterma, version del mongo, llave privada...)
            data, //Datos que va a actualizar
            {new: true} //Objeto de la BD ya actualizado
        )
        //Validar si se actualizo
        if(!updateUser) return res.status(401).send({message: 'User not found and not updated'})
        //Responder con el dato actualizado
        return res.send({message: 'Updated user', updateUser})
    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message: `Username ${error.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}


export const deleteU = async(req, res)=>{
    try {
        //Obtener el id
        let {id} = req.params
        //Validamos si esta legeado y es el mismo

        //Eliminar (deleteOne / findOneAndDelete)
        let deleteUser = await User.findOneAndDelete({_id: id})
        //Verificar que se elimino
        if(!deleteUser) return res.status(404).send({message: 'Account not found and not deleted'})
        //Responder
        return res.status(200).send({message: `Account with username ${deleteUser.username} deteled successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting user'})
    }
}