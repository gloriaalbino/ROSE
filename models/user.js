//conectar con MongoDB y crear dependencias
const mongoose = require('mongoose')
//const userRouter = require('../controllers/users')

//definir el esquema
const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:String,
    rol:{
        type:String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    varified:{
        type:Boolean,
        default:false
    
    }
})

//Configurar la respuesta del usuario en el esquema
userSchema.set('toJSON',{
    transform:(document,returnObject)=>{
        //Estamos creando una nueva propiedad que se llame id
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.password;
    }
})

//Dar un nombre, registrar el modelo de datos
const User = mongoose.model('User',userSchema);
module.exports = User;