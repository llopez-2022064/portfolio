'use strict'
import Animal from '../animal/animal.model.js'
import Appointment from '../appointment/appointment.model.js'

export const save = async(req, res) =>{
    try {
        //capturar la data
        let data = req.body
        data.user = req.user._id
        //Verificar queexista el animal
        let animal = await Animal.findOne({_id: data.animal})
        if(!animal) return res.status(404).send({message: 'Animal not found'}) //Si en caso de no enctrar el animal manda el msg
        
        
        

        let appointmentExist = await Appointment.findOne({
            $or:[
                {
                    //Validar que la mascota no tenga una cita activa con esa persona
                    animal : data.animal,
                    user: data.user,
                    
                },{
                    //Vlidar si un animal ya tiene una cita o si un usuario ya tien cita
                    date: data.date,
                    user: data.user
                }
            ]
        })
        if(appointmentExist) return res.send({message: 'Appointment already exist'})
        //Guardar
        let appointment = new Appointment(data)
        await appointment.save()
        return res.send({message: `Appointment saved successfully, for the date ${appointment.date}` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error saving appointment', error})
    }
}