const User = require('../models/user')
const bcryptjs = require('bcryptjs')
//const crypto = require('crypto')
//const nodemailer = require('nodemailer')
//const jwt = require('jsonwebtoken')

const UserControllers = {

    signUp: async (req,res) => {
        console.log('REQ BODY SIG UP USER')
        console.log(req.body)
        const { nameUser, lastNameUser, photoUser, email, country, from, password } = req.body
        //ACLARACION: password y from son ARRAYS
        //cada elemento de password se relaciona con un unico elemento de from
        //el indice de cada contraseña coincide con el indice de cada from
        //es decir:
        //la contraseña[0] es del from[0]
        //la contraseña[2] es del from[2]
        //la contraseña[indice] es del from[indice]
        try {
            const newUser = await User.findOne({email}) //buscamos por email
            if (!newUser) { //si NO existe el usuario
                const hashWord = bcryptjs.hashSync(password, 10) //hasheo la contraseña
                const myNewTUser = await new User({nameUser, lastNameUser, country, photoUser, email,
                    password: [hashWord],
                    from: [from]})
                if (from === "SignUpForm") { //si la data viene del formulario
                    //ACLARACION: ahora el if/else tienen la misma data
                    //pero van a cambiar cuando enviemos correo de verificacion
                    await myNewTUser.save()
                    res.json({
                        success: true, 
                        from: from,
                        message: `check ${email} and finish your SIGN UP!`}) 
                    } else { //si la data viene de una red social
                    await myNewTUser.save()
                    res.json({
                        success: true, 
                        from: from,
                        message: `you SIGNED UP by ${from}! now LOG IN!`})
                }
            } else { //si existe el usuario, significa que al menos tiene un registro
                //hay que chequear si coincide la forma de RE-REGISTRO con la ya REGISTRADA
                //si coincide se tiene que cumplir la siquiente condicion:
                if (newUser.from.indexOf(from) !== -1) { //coincide la forma de registro ACTUAL con alguna ya EXISTENTE en mi bd
                    //del usuario que encontró
                    //busco en la propiedad FROM
                    //el indice que coincide con el FROM del cual el usuario quiere "volver" a registrarse
                    //si ese indice EXISTE ==> el usuario ya está registrado DE ESTA FORMA y hay que mandarlo a loguearse
                    //ACLARACION: si existe indexOf(from) significa que el usuario ya se registró de esta manera (la que capturamos en la variable FROM)
                    //entonces si el indice de from es cualquier numero que no sea -1 significa que ya existe el usuario y NO DEBEMOS PERMITIRLE volver a registrarse
                    res.json({ //devolvemos la respuesta
                        success: false,
                        from: from,
                        message: `${email} has been registered, please LOG IN!`})
                //si no coincide, se tiene que cumplir esta otra:                
                } else {
                    //si es -1 significa que el usuario NO SE REGISTRO DE ESTA FORMA (nuevo registro con google)
                    //pero ya tiene AL MENOS UN registro (facebook y form)
                    const hashWord = bcryptjs.hashSync(password, 10)
                    newUser.password.push(hashWord)
                    newUser.from.push(from)
                    await newUser.save()
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
        //console.log('REQ BODY')
        //console.log(req.body)
        const {email, password, from} = req.body
        try {
            const loginUser = await User.findOne({email}) //buscamos por eemail
            if (!loginUser) { //si NO existe el usuario
                res.json({
                    success: false,
                    from: 'no from',
                    message: `${email} has no account, please SIGN UP!`})
            } else { //si existe el usuario
                let checkedWord =  loginUser.password.filter(pass => bcryptjs.compareSync(password, pass))
                console.log(checkedWord)
                //filtramos en el array de contraseñas hasheadas si coincide la contraseña 
                if (from === "signUpForm") { //si fue registrado por nuestro formulario
                    if (checkedWord.length>0) { //si hay coincidencias
                        const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
                            id: loginUser._id,
                            email: loginUser.email,
                            nameUser: loginUser.nameUser,
                            photoUser: loginUser.photoUser,
                            from: loginUser.from}
                        await loginUser.save()
                        res.json({
                            response: userData, 
                            success: true, 
                            from: from, 
                            message: `welcome back ${userData.nameUser}!`})
                    } else { //si no hay coincidencias
                        res.json({
                            success: false, 
                            from: from,  
                            message: `verify your password!`})
                    }
                } else { //si fue registrado por redes sociales
                    //ACLARACION: por ahora es igual al anterior
                    if (checkedWord.length>0) { //si hay coincidencias
                        const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
                            id: loginUser._id,
                            email: loginUser.email,
                            nameUser: loginUser.nameUser,
                            photoUser: loginUser.photoUser,
                            from: loginUser.from}
                        await loginUser.save()
                        res.json({
                            response: userData, 
                            success: true, 
                            from: from, 
                            message: `welcome back ${userData.nameUser}!`})
                    } else { //si no hay coincidencias
                        res.json({
                            success: false, 
                            from: from,  
                            message: `verify your mail or password!`})
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                from: from,
                message: 'ERROR'})
        }
    }
}

/* const sendEmail = async (email, uniqueString) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "my.ty.borraz@gmail.com",
            pass: "Hola1234"
        }
    })
    let mailOptions = {
        from: 'my.ty.borraz@gmail.com',
        to: email,
        subject: "verify MyTinerary account",
        html: `
        <div>
            <h1><a href=https://mytinerary-borraz.herokuapp.com/api/verify/${uniqueString} style="color:red">CLICK!</a> to confirm you account.</h1>
            <h2>Thanks for signing up!</h2>
            <br>
            <h3>FIND YOUR PERFECT TRIP</h3>
            <h4>designed by insiders who know and love their cities!</h4>
        </div>
        `};
    await transporter.sendMail(mailOptions, function (error, response) {
        if (error) { console.log(error) }
        else {
            console.log(`check ${email} to confirm your account`)
        }
    })
} */

module.exports = UserControllers




// const User = require('../models/User')
// const bcryptjs = require('bcryptjs')
// const sendVerification = require('./sendVerification')

// const UserControllers = {

//     singUp: async (req, res) => {
//         let { nameUser, lastNameUser, photoUser, email, password, country, from } = req.body.userData
//         // const test = req.body.test
//         try {
//             const userExists = await User.findOne({ email })
//             if (userExists) {
//                 if (userExists.from.indexOf(from) !== -1) {
//                     res.json({
//                         success: false,
//                         from: "SignUpForm",
//                         message: `user ${email} already exists, please LOG IN!`
//                     })
//                 } else {
//                     const passwordHasheada = bcryptjs.hashSync(password, 10)
//                     userExists.from.push(from)
//                     userExists.password.push(passwordHasheada)
//                     if (from === "SignUpForm") {
//                         await userExists.save()
//                         await sendEmail(email, userExists.uniqueString)
//                         res.json({
//                             success: true,
//                             from: "SignUpForm",
//                             message: `check ${email}! we send you a mail to confirm your SIGN UP!`
//                         })

//                     } else {
//                         userExists.save()
//                         res.json({
//                             success: true,
//                             from: "externalSignUp",
//                             message: `user exist! LOG IN please!`
//                         })
//                     }
//                 }
//                 } else {                    
//                     const passwordHasheada = bcryptjs.hashSync(password, 10)
//                     const newUser = await new User({
//                         nameUser,
//                         lastNameUser,
//                         photoUser,
//                         email,
//                         country,
//                         from: [from],
//                         password: [passwordHasheada],
//                         emailVerified: false,
//                     })
//                     if (from !== "SignUpForm") {
//                         await newUser.save()
//                         // await sendEmail(email, newUser.uniqueString)
//                         res.json({
//                             success: true,
//                             from: "SignUpForm",
//                             message: `check ${email} and finish your SIGN UP!`
//                         })
//                     } else {
//                         await newUser.save()
//                         res.json({
//                             success: true,
//                             from: "externalSignUp",
//                             message: `you SIGN UP by ${from}! now LOG IN!`
//                         })
//                     }
//                 }
//             } catch (error) {
//                 console.log(error)
//                 res.json({ success: false, message: "Something went wrong, try again in a few minutes", res:console.log(error) })
//             }
//         },

//         signIn: async (req, res) => {
//             const { email, password, from } = req.body.userLogin
//             try {
//                 const userExists = await User.findOne({ email })
//                 // const indexpass = userExists.from.indexOf(from)
//                 if (!userExists) {
//                     res.json({ success: false, message: `${email} has no account in MyTinerary, please SIGN UP!` })
//                 } else {
//                     if (from !== "LogInForm") {
//                         if (userExists.emailVerified) {
//                         let passwordmatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))
//                         if (passwordmatch.length > 0) {
//                             const userData = {
//                                 id: userExists._id,
//                                 nameUser: userExists.nameUser,
//                                 lastNameUser: userExists.lastNameUser,
//                                 photoUser: userExists.photoUser,
//                                 email: userExists.email,
//                                 country: userExists.country,
//                                 from: userExists.from, 
//                             }
                            
//                             await userExists.save()
//                             res.json({
//                                 success: true,
//                                 from: from,
//                                 response: { userData },
//                                 message: `welcome back ${userData.nameUser}!`,
//                             })
//                         } else {
//                             res.json({
//                                 success: false,
//                                 from: from,
//                                 message: "You have not registered with" + from + "if you want to enter with this method you must do the SingUp with" + from
//                             })
//                         }
//                     } else {
//                         let passwordmatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))
//                         if (passwordmatch.length > 0) {
//                             const userData = {
//                                 id: userExists._id,
//                                 nameUser: userExists.nameUser,
//                                 lastNameUser: userExists.lastNameUser,
//                                 photoUser: userExists.photoUser,
//                                 email: userExists.email,
//                                 country: userExists.country,
//                                 from: userExists.from,
//                             }
//                             await userExists.save()
//                             res.json({
//                                 success: true,
//                                 from: from,
//                                 response: {userData},
//                                 message: "Welcome again " + userData.nameUser + " " + userData.lastNameUser,
//                             })
//                         } else {
//                             res.json({
//                                 succes: false,
//                                 from: from,
//                                 message: `verify your ${email} or password!`
//                             })
//                         }
//                     }
//                 }
//             }
//             } catch (error) {
//                 console.log(error)
//                 res.json({ succes: false,
//                     message: "Something went wrong, try again in a few minutes" })
//             }
//         }

//         // verifyMail: async (req, res) => {
//         //     const {string} =req.params
//         //     const user = await User.findOne({uniqueString: string})
//         //     if{user}{
//         //         user,verification = true
//         //         await user.save()
//         //         res.redirect('http://localhost:3000/')
//         //     }
// }
// module.exports = UserControllers

