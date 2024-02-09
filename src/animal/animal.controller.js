'use strict'

import { checkUpdate } from '../utils/validator.js'
import Animal from './animal.model.js'

export const addAnimal = async(req, res) =>{
    try {
        let data = req.body

        let animal = new Animal(data)

        await animal.save()

        return res.send({message: 'I successfully add'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error when adding', error})
    }
}


export const updateA = async(req, res) =>{
    try {
        let {id} = req.params

        let data = req.body
        
        let updateAnimal = await Animal.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )

        if(!updateAnimal) return res.status(401).send({message: 'Animal not found and not updated'})
        return res.send({message: 'Updated animal', updateAnimal})
    } catch (error) {
        console.error(error)
        // if(error.keyValue.animal) return res.status(400).send({message: `Animal ${error.keyValue.animal} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteA = async(req, res) =>{
    try {
        let {id} = req.params

        let deleteAnimal = await Animal.findOneAndDelete({_id: id})

        if(!deleteAnimal) return res.status(404).send({message: 'Animal not found and not deleted'})
        return res.status(200).send({message: `Animal with name ${deleteAnimal.name} deleted successfully`})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting animal'})
    }
}

//Listar Animales
export const listAnimals = async(req, res) => {
    try {
        let data = await Animal.find();
        console.log(data);
        if(!data.length) {
            message = 'No exists';
        }
        return res.status(200).json({
          data
        });
    }
    catch(error) {
        console.error(error);
        let message = 'Error';
        return res.status(500).json({
            message
        });
    }
}


export const searchAnimal = (req, res) =>{
    try {
        let {id} = req.params

    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Animal not found'})
    }
}