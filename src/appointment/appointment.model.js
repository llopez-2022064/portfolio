'use strict'

import {Schema, model} from 'mongoose'

const appointmentSchema = Schema({
    date:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['CREATED', 'ACCEPTED', 'CANCELLED', 'COMPLETED'],
        default: 'CREATED',
        required: true
    },
    animal:{
        type: Schema.ObjectId,
        ref: 'animal', //Igual al modelo -> no puede ser por ej: pet, tiene que ser si o si animal, como lo exportamos en model
        required: true
    },
    user:{
        type: Schema.ObjectId,
        ref: 'user', 
        required: true
    }
}, {
    versionKey: false //Para quitar el v__v, lo que esta en la DB  //Quita el manejor de versiona que trae por defecto mongo
})

export default model('appointment', appointmentSchema)