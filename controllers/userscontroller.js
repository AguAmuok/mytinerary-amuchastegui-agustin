const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendVerification = require('./sendVerification')
const jwt = require('jsonwebtoken')

const UserControllers = {

    signUp: async (req,res) => {
        const { nameUser, lastNameUser, photoUser, email, country, from, password } = req.body
        try {
            const user = await User.findOne({email}) //buscamos por email
            const hashWord = bcryptjs.hashSync(password, 10) //hasheo la contraseña
            const verification = false //por defecto
            const uniqueString = crypto.randomBytes(20).toString('hex') // uso los metodos de crypto
            if (!user) { //si NO existe el usuario                
                const newUser = await new User({nameUser, lastNameUser, photoUser, email, country, verification,
                    uniqueString: uniqueString,
                    password: [hashWord],
                    from: [from]})
                if (from === "SignUpForm") { //si la data viene del formulario
                    await newUser.save()
                    await sendVerification(email, uniqueString)
                    res.json({
                        success: true, 
                        from: from,
                        message: `check ${email} and finish your SIGN UP!`}) 
                    } else { //si los datos vienen desde una red social
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
        //console.log(req.body)
        const {email, password, from} = req.body
        try {
            const loginUser = await User.findOne({email}) //buscamos por eemail
            if (!loginUser) { //si NO existe el usuario
                res.json({
                    success: false,
                    from: 'no from',
                    message: `Sorry.. email or password are incorrect!`})
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
                        const token = jwt.sign({...userData}, process.env.PASSWORD_TOKEN, {expiresIn: 30*30*24 })//uso el paquete jwt. y el metodo sign de firma . creamos una firma para el token
                        await loginUser.save()                      
                        console.log(token)
                        res.json({
                            response: {token, userData}, 
                            success: true, 
                            from: from, 
                            message: `Welcome back ${userData.nameUser}!!`})
                    } else { //si no hay coincidencias
                        res.json({
                            success: false, 
                            from: from,  
                            message: `Verify your password!`})
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
                        const token = jwt.sign({...userData}, process.env.PASSWORD_TOKEN, {expiresIn: 30*30*24 })//uso el paquete jwt. y el metodo sign de firma . creamos una firma para el token
                        await loginUser.save()
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
            }
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                from: from,
                message: 'ERROR'})
        }
    },

    signOut: async (req, res) => {
        
        const email = req.body.email
        console.log(req.body.email)
        const user = await User.findOne({email})
        await user
        res.json({
            success: true,
            message: email+' sign out!'})
    },
    
    verifyMail: async (req, res) => {
        const {string} = req.params
        const userData = await User.findOne({uniqueString: string})
        //console.log(user)
        if (userData) {
            userData.verification = true
            await userData.save()
            res.redirect("http://localhost:3000")
        }
        else {res.json({
            success: false,
            message: `email has not account yet!`})
        }
    },

verifyToken:(req, res) => {
    //console.log(req.user)
    if (!req.err) {
    res.json({
        success: true,
        response: {
            id: req.user.id,
            email: req.user.email,
            nameUser: req.user.nameUser,
            photoUser:req.user.photoUser,
            from: "token"},
        message: "Hi! Welcome back "+req.user.nameUser}) 
    } else {
        res.json({
            success:false,
            message:"sign in please!"}) 
    }
}
}

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

