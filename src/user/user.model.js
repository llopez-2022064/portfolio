import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true //Campo oblogatorio
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        unique: true, //Solo puede existir un registro unico
        lowercase: true, //Hacerlo todo minusculas
        required: true
    },
    password:{
        type: String,
        minLength: [8, 'Password must be 8 characteres'],
        required: true
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    role:{
        type: String,
        uppercase: true, //Siempre a mayusculas
        enum: ['ADMIN', 'CLIENT'], //Solo los datos que esten en el arreglo son validos
        required: true
    }
})


//Pre mongoose
                            //Pluralizar
export default mongoose.model('user', userSchema)

