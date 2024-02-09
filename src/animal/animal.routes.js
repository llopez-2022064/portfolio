'use strict'

import express from 'express'
import { addAnimal, updateA, deleteA, listAnimals } from './animal.controller.js'

const api = express.Router()

api.post('/addAnimal', addAnimal)
api.put('/updateAnimal/:id', updateA)
api.delete('/deleteAnimal/:id', deleteA)
api.get('/listAnimal', listAnimals)

export default api