//Hacer el router
//Router:registrar POST, GET, DELETE (toda la parte del CRUD)
const userRouter = require('express').Router();
const User = require('../models/user')

//Registrar la informacion que el usuario envia a traves del formulario
userRouter.post('/',(request,response)=>{
    const {name,email,password,password2} = request.body;
    console.log(name,email,password,password2);
    //console.log(request.body)
    if(!name || !email || !password || !password2){
        return response.status(400).json({error:'Todos los campos son requeridos'})
        }
    else{
        //guardar en la DB
        let usuario = new User();
        usuario.name = name;
        usuario.email = email;
        usuario.password = password;
        usuario.rol = 'usuario'

        async function guardarUsuario(){
            await usuario.save();
            const usuarios = await User.find();
            console.log(usuarios)
        }
        guardarUsuario().catch(console.error)

        return response.status(200).json({msg:'Se ha creado su cuenta satisfactoriamente. Verifique su email, le hemos enviado un correo'})

        
    }
})

//editar usuario
userRouter.post('edit-user',async(req,res)=>{
    try{
        const {name,email,password,password2, id} = request.body;

        if(!name && !email && !password && !password2){
            return res.status(400).json({error:"Todos los campos son obligatorios"})
        }else{
            const updateUser = await User.findOneAndUpdate({_id:id},{name:name, email:email, password:password})

            await updateUser.save()

            return res.status(200).json({msg:'Se han actualizado los datos correctamente'})
        }
    }catch(error){
        return res.status(400).json({error:"Error"})
    }
})

//eliminar usuario
userRouter.post('/eliminar-user',async(req,res)=>{
    const {id} = req.body;

    try{
        const usuario = await User.deleteOne({_id:id})
        return res.status(200).json({msg:"Se ha eliminado el usuario correctamente"})
    }catch(error){
        return res.status(400).json({error:'Error'})
    }
})

//consultar usuario o usuarios
userRouter.get('/consultar-user',async(req,res)=>{
})

userRouter.get('/lista-users',async(req,res)=>{
    try{
        const listado = await User.find()
        return res.status(200).json({textOk:true,data:listado})

    }catch(error){
        return res.status(400).json({error:"Ha ocurrido un error"})
    }
})

//Verificar el registro
userRouter.get('/validar-confirmacion/:email',async (req,res)=>{
    try{
        //obtener los parametros del request
        const {email} = res.param;

        console.log(email)

        //verificar si el usuario existe
        const usuario = await User.findOne({email:email});

        if(!usuario){
            res.send('Error: El usuario no esta registrado')
        }else if(usuario.verified){
            res.send('Error: El usuario ya esta verificado')
        }else{
            //actualizar el campo de verificacion
            const actualizarUsuario = await User.findOneAndUpdate
            ({email:email},{verified:true})
            await actualizarUsuario.save();

            //redireccionar 
            //return res.redirect()
            //FALTA CREAR FRONT DE CONFIRMAR
        }

    } catch (error) {
        res.status(500).json({ message: "Error en el login.", error });
    }
})

userRouter.get('/')

module.exports = userRouter