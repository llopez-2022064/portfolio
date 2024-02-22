'use strict'

import { Router } from 'express'
import {test} from './animal.controller.js'
import { saveAnimal, updateA, deleteA, listAnimals, get, search} from './animal.controller.js'

const api = Router()

api.post('/saveAnimal', saveAnimal)
api.put('/updateAnimal/:id', updateA) //Cuando es req.params, es porque se va a enviar un dato
api.delete('/deleteAnimal/:id', deleteA)
api.get('/listAnimal', listAnimals)
api.get('/get', get)
api.post('/search', search)

api.get('/test', test)

export default api