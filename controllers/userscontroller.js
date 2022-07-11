const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendVerification = require('./sendVerification')
const jwt = require('jsonwebtoken')

const UserControllers = {

    signUp: async (req,res) => {
        const { nameUser, lastNameUser, photoUser, email, country, from, password } = req.body//pido los datos requeridos
        try {
            const user = await User.findOne({email}) //esperamos que encuentre un usuario por su email
            const hashWord = bcryptjs.hashSync(password, 10) //hasheo la contraseña
            const verification = false //por defecto si es por formulario
            const uniqueString = crypto.randomBytes(20).toString('hex') // uso los metodos de crypto para enviar un mail de verificacion
            if (!user) { //si NO existe el usuario                
                const newUser = await new User({nameUser, //espera las propiedades
                    lastNameUser, photoUser, email, country, verification,
                    uniqueString: uniqueString,
                    password: [hashWord],
                    from: [from]})
                if (from === "SignUpForm") { //si la data viene del formulario
                    await newUser.save()
                    await sendVerification(email, uniqueString)//espero que sea enviado el mail de verificion
                    res.json({//si el mail es correcto cambia la verificacion a true
                        success: true, 
                        from: from,
                        message: `check ${email} and finish your SIGN UP!`}) 
                    } else { //si los datos vienen de Google o una red social
                        newUser.verification = true
                    await newUser.save()
                    res.json({
                        success: true, 
                        from: from,
                        message: `you SIGNED UP by ${from}! now LOG IN!`})
                }
            } else { //si existe el usuario, significa que al menos tiene un registro
                if (user.from.indexOf(from) !== -1) { //coincide la forma de registro ACTUAL con alguna ya EXISTENTE en mi bd
                    res.json({ //devolvemos la respuesta
                        success: false,
                        from: from,
                        message: `${email} has been registered, please LOG IN!`})
                //si no coincide, se tiene que cumplir esta otra:                
                } else {
                    user.password.push(hashWord)
                    user.from.push(from)
                    user.verification = true
                    await user.save()
                    res.json({
                        success: true, 
                        from: from, 
                        message: `check ${email} to confirm your SIGN UP!`}) 
                }
            }
        } catch (error) {
            
            res.json({
                props:console.log(error),
                success: false,
                from: from,
                message: 'ERROR'})
        }
    },

    signIn: async (req, res) => {
        
        const {email, password, from} = req.body
        try {
            const loginUser = await User.findOne({email}) ///espera que busque el user por email
            //console.log(loginUser);
            if (!loginUser) { //si NO existe el usuario
                res.json({
                    success: false,
                    from: 'No from',
                    message: `Incorrect mail or password`})
            
            } else if (loginUser.verification) { 
                let checkedWord =  loginUser.password.filter(pass => bcryptjs.compareSync(password, pass))
                
                if (from === "signUpForm") { //si fue registrado por nuestro formulario
                    if (checkedWord.length>0) { //si hay coincidencias
                        const userData = { 
                            id: loginUser._id,
                            email: loginUser.email,
                            nameUser: loginUser.nameUser,
                            photoUser: loginUser.photoUser,
                            from: loginUser.from}
                        await loginUser.save()
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
                        // console.log(token)
                        res.json({
                            response: {token,userData}, 
                            success: true, 
                            from: from, 
                            message: `Welcome back ${userData.nameUser}!`})
                    } else { //si no hay coincidencias
                        res.json({
                            success: false, 
                            from: from,  
                            message: `Verify your password!`})
                    }
                } else { //si fue registrado por redes sociales
                    if (checkedWord.length>=0) { //si hay coincidencias
                        const userData = {
                            id: loginUser._id,
                            email: loginUser.email,
                            nameUser: loginUser.nameUser,
                            photoUser: loginUser.photoUser,
                            from: loginUser.from}
                        await loginUser.save()
                        const token = jwt.sign({...userData}, process.env.PASSWORD_TOKEN, {expiresIn: 30*30*24 })
                        res.json({
                            response: {token,userData}, 
                            success: true, 
                            from: from, 
                            message: `Welcome back ${userData.nameUser}!`})
                    } else { //si no hay coincidencias
                        res.json({
                            success: false, 
                            from: from,  
                            message: `Verify your mail or password!`})
                    }
                }
            } else { //si está registrado PERO el usuario NO FUE VALIDADO
                res.json({
                    success: false,
                    from: from,
                    message: `Validate your account`})
            }
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                from: from,
                message: 'ERROR'})
        }
    },
    // signIn: async (req, res) => {
    //     //console.log(req.body)
    //     const {email, password, from} = req.body
    //     try {
    //         const loginUser = await User.findOne({email}) //espera que busque el user por email
    //         if (!loginUser) { //si NO existe el usuario
    //             res.json({
    //                 success: false,
    //                 from: 'no from',
    //                 message: `Sorry.. email or password are incorrect!`})
    //         } else { //si existe el usuario
    //             let checkedWord =  loginUser.password.filter(pass => bcryptjs.compareSync(password, pass))
    //             //filtramos en el array de contraseñas hasheadas si coincide la contraseña 
    //             if (from === "signUpForm") { //si fue registrado por nuestro formulario
    //                 if (checkedWord.length>0) { //si hay coincidencias
    //                     const userData = { 
    //                         id: loginUser._id,
    //                         email: loginUser.email,
    //                         nameUser: loginUser.nameUser,
    //                         photoUser: loginUser.photoUser,
    //                         from: loginUser.from}
    //                     const token = jwt.sign({...userData}, process.env.PASSWORD_TOKEN, {expiresIn: 30*30*24 })//uso el paquete jwt. y el metodo sign de firma . creamos una firma para el token
    //                     await loginUser.save()                      
    //                     // console.log(token)
    //                     res.json({
    //                         response: {token, userData}, 
    //                         success: true, 
    //                         from: from, 
    //                         message: `Welcome back ${userData.nameUser}!!`})
    //                 } else { //si no hay coincidencias
    //                     res.json({
    //                         success: false, 
    //                         from: from,  
    //                         message: `Verify your password!`})
    //                 }
    //             } else { //si fue registrado por redes sociales
    //                 //ACLARACION: por ahora es igual al anterior
    //                 if (checkedWord.length>0) { //si hay coincidencias
    //                     const userData = {
    //                         id: loginUser._id,
    //                         email: loginUser.email,
    //                         nameUser: loginUser.nameUser,
    //                         photoUser: loginUser.photoUser,
    //                         from: loginUser.from}
    //                     const token = jwt.sign({...userData}, process.env.PASSWORD_TOKEN, {expiresIn: 30*30*24 })//uso el paquete jwt. y el metodo sign de firma . creamos una firma para el token
    //                     await loginUser.save()
    //                     res.json({
    //                         response: {token,userData}, 
    //                         success: true, 
    //                         from: from, 
    //                         message: `Welcome back ${userData.nameUser}!`})
    //                 } else { //si no hay coincidencias
    //                     res.json({
    //                         success: false, 
    //                         from: from,  
    //                         message: `Verify your mail or password!`})
    //                 }
    //             }
    //         } 
    //     } catch (error) {
    //         console.log(error)
    //         res.json({
    //             success: false,
    //             from: from,
    //             message: 'ERROR'})
    //     }
    // },

    signOut: async (req, res) => {   
        
        const email = req.body.email
        const user = await User.findOne({email})
        await user
        res.json({
            success: true,
            message: email+' Sign out!'})
    },
    
    verifyMail: async (req, res) => {
        const {string} = req.params
        const userData = await User.findOne({uniqueString: string})//espero que el usuario verifique el mail
        //console.log(user)
        if (userData) {
            userData.verification = true
            await userData.save()
            res.redirect("https://my-tinerary-agustin-amu-front.herokuapp.com/")
        }
        else {res.json({
            success: false,
            message: `email has not account yet!`})
        }
    },

verifyToken:(req, res) => {
    //console.log(req.user)
    if (!req.err) {//si no tenemos errores nos devuelve una respuesta en formato json
    res.json({//con todos los datos requeridos 
        success: true,
        response: {
            id: req.user.id,
            email: req.user.email,
            nameUser: req.user.nameUser,
            photoUser:req.user.photoUser,
            from: "token"},
        message: "Hi! Welcome back " + req.user.nameUser}) //si hay token = msj bienvenida
    } else {
        res.json({
            success:false,
            message:"Sign in please!"}) // de lo contrario mensje vuelve a ingresar
    }
}
}

module.exports = UserControllers