require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const userRouter = require('./controllers/users')
/*const multer = require('multer')
const cors = require('cors')
const sharp = require('sharp')
const PORT = 4000

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=> {
        const ext = file.originalname.split('.').pop()
        cb(null, `${Date.now()}.${ext}`)
    }
})

const upload = multer.MulterError({ storage })

app.post('/upload', upload.single('file'), (req, res)=>{
    res.send({ data: 'Imagen cargada' })
})*/

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
app.use('/dashboard', express.static(path.resolve('views', 'dashboard')))
app.use('/admin', express.static(path.resolve('views', 'admin')))
app.use('/perfil', express.static(path.resolve('views', 'perfil')))
app.use('/empresa', express.static(path.resolve('views', 'empresa')))
app.use('/canje', express.static(path.resolve('views', 'canje')))
app.use('/ficha', express.static(path.resolve('views', 'ficha')))
app.use('/img', express.static(path.resolve('img')))
app.use('/icons', express.static(path.resolve('icons')))
app.use('/components', express.static(path.resolve('views', 'components')))

//Importante
app.use(express.json());
//app.use(cors())
//Rutas de backend
app.use('/api/users',userRouter);
//app.use()
module.exports = app

