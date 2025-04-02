require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const userRouter = require('./controllers/users')
const productosRouter = require('./controllers/productos');
const perfilRouter = require('./controllers/perfil');
const canjeRouter = require('./controllers/canje');
const donacionRouter = require('./controllers/donacion');
const donarRouter = require('./controllers/donar');

// Middleware para parsear JSON
app.use(express.json()); //maneja las solicitudes
app.use('api/productos', productosRouter); //conecta las rutas de productos

//Conexion a la BD 
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log('Conexion a BD correcta')
    } catch(error) {
        console.log(error)
    }

//crear rutas de frontend
app.use('/',express.static(path.resolve('views','principal'))) //REVISAR
app.use('/principal',express.static(path.resolve('views','principal')))
app.use('/sesion', express.static(path.resolve('views', 'sesion')))
app.use('/registro', express.static(path.resolve('views', 'registro')))
app.use('/donaciones', express.static(path.resolve('views', 'donaciones')))
app.use('/recibirDonacion', express.static(path.resolve('views', 'recibirDonacion')))
app.use('/donar', express.static(path.resolve('views', 'donar')))
app.use('/dashboard', express.static(path.resolve('views', 'dashboard')))
app.use('/admin', express.static(path.resolve('views', 'admin')))
app.use('/perfil', express.static(path.resolve('views', 'perfil')))
app.use('/producto', express.static(path.resolve('views', 'producto')))
app.use('/canje', express.static(path.resolve('views', 'canje')))
app.use('/ficha', express.static(path.resolve('views', 'ficha')))
app.use('/img', express.static(path.resolve('img')))
app.use('/icons', express.static(path.resolve('icons')))
app.use('/components', express.static(path.resolve('views', 'components')))
app.use('/controllers', express.static(path.resolve('controllers')))

//Importante
app.use(express.json());
//app.producto(express.json());
//app.use(cors())

//Rutas de backend
app.use('/api/users',userRouter);
app.use('/api/productos',productosRouter);
app.use('/api/perfil', perfilRouter);
app.use('/api/medicamentos', canjeRouter);
app.use('/api/donaciones', donacionRouter);
app.use('/api/donar', donarRouter);

//app.use()
module.exports = app

