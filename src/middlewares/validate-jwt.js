'use strict'

//Validar los datos del JWT


import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt = async(req, res, next)=>{
    try {
        //Obtener la llave de accceso al token
        let secretKey = process.env.SECRET_KEY
        //Obtener el token de los headers
        let {token} = req.headers
        //Verificar si viene el token
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        //Obtener el id del usuario (uid) que envio el token
        let {uid} = jwt.verify(token, secretKey)
        //Validar si el usuario aun existe en la DB
        let user = await User.findOne({_id:uid})
        if(!user) return res.status(404).send({message: 'User not found - Unauthorized'}) 
        //Ok del Middleware-
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Unauthorized'})
    }
}

export const isAdmin = async(req, res, next)=>{
    try {
        let { role, username } = req.user
        if(!role || role !== 'ADMIN') return res.status(403).send({message: `You dont have access | username ${username}`})
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Unauthorized Role'})
    }
}