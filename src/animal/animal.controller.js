'use strict'

import Animal from './animal.model.js'
import User from '../user/user.model.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    return res.send({ message: 'Function test ir running | Animal' })
}   

//Function creada por el profe
export const saveAnimal = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body
        //Validar que el Keeper exista (Buscar a la DB)
        let user = await User.findOne({ _id: data.keeper })
        if (!user) return res.status(404).send({ message: 'Keeper not found' })
        //Crear la instancia del animal
        let animal = new Animal(data)
        //Guardar
        await animal.save()
        //Responder si todo sale bien
        return res.send({ message: 'Animal saved successfully' })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error saving animal ', error })
    }
} //localhost:2880/animal/save

//Funcion creada por mi

// export const addAnimal = async(req, res) =>{
//     try {
//         let data = req.body

//         let animal = new Animal(data)

//         await animal.save()

//         return res.send({message: 'I successfully add'})
//     } catch (error) {
//         console.error(error)
//         return res.status(500).send({message: 'Error when adding', error})
//     }
// }


export const updateA = async (req, res) => {
    try {
        let { id } = req.params

        let data = req.body

        //Validar que vengan los datos
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submit some data that cannot be updated or missing data' })

        let updateAnimal = await Animal.findOneAndUpdate(
            { _id: id }, //A quien voy a actualizar
            data, // Que datos voy a actualizar
            { new: true }
        ).populate('keeper', ['name', 'phone']) //Mostrar los campos que queremos que el usuario vea

        if (!updateAnimal) return res.status(401).send({ message: 'Animal not found and not updated' })
        return res.send({ message: 'Updated animal', updateAnimal })
    } catch (error) {
        console.error(error)
        // if(error.keyValue.animal) return res.status(400).send({message: `Animal ${error.keyValue.animal} is already taken`})
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteA = async (req, res) => {
    try {
        //Obtener el id
        let { id } = req.params
        //Eliminar (deleteOne (Solo elimina y no devuelve el documento) || (findOneAndDelete (Elimina y devuelve el documento es decir muestra que se elimino)))
        let deleteAnimal = await Animal.deleteOne({ _id: id })

        //Validar que se elimino
        if (deleteAnimal.deletedCount == 0) return res.status(404).send({ message: 'Animal not found, not deleted' })
        return res.send({ message: 'Deleted animal successfully' })
        // if (!deleteAnimal) return res.status(404).send({ message: 'Animal not found and not deleted' })
        // return res.status(200).send({ message: `Animal with name ${deleteAnimal.name} deleted successfully` })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting animal' })
    }
}

//Listar Animales
export const listAnimals = async (req, res) => {
    try {
        let data = await Animal.find();
        console.log(data);
        if (!data.length) {
            message = 'No exists';
        }
        return res.status(200).json({
            data
        });
    }
    catch (error) {
        console.error(error);
        let message = 'Error';
        return res.status(500).json({
            message
        });
    }
}

//Obtenemos todos los datos - dado por el profe
export const get = async (req, res) => {
    try {
        let animals = await Animal.find()
        if (!animals.length == 0) return res.status(404).send({ message: 'Not found' })
        return res.send({ animals })
    } catch (error) {
        console.error(error)
        return res.status(401).send({ message: 'Error getting animals' })
    }
}



//Buscar Animal
export const search = async (req, res) => {
    try {
        //Obtener el parametro de busqueda
        let { search } = req.body
        console.log(search)
        //Buscar
        let animals = await Animal.find({
            name: search
        }).populate('keeper', ['name', 'phone'])


        //Validar la respuesta
        if (animals.length == 0) return res.status(404).send({ message: 'Animal not found' })

        //Responder si todo sale bien
        return res.send({ message: 'Animals found', animals })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error searching animals' })
    }
}