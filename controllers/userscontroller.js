const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')



const userControllers = {

singUpUsers: async (req,res) => {
    let {nameUser, lastNameUser, photoUser, email, password, role, from} = req.body.userData
    const  test = req.body.test
    try {
        const userExists = await User.findOne({email})
        if (userExists){
            if (userExists.from.indexOf(from) !== -1) {
            res.json({
                success: false,
                from: "signup",
                message: "You have already made your SignUp in this way, please SignIn"
            })
        } else {
            const passwordHasheada = bcryptjs.hashSync(password, 10)
            userExists.from.push(from)
            userExists.password.push(passwordHasheada)
            res.json({
                succes: true,
                from: "singup",
                message: "We add" + from + "to your means to perform SingIn"
            })
        }
        } else {
            const passwordHasheada = bcryptjs.hashSync(password, 10)
            const newUser = await new User({
                nameUser,
                lastNameUser,
                photoUser,
                email,
                role,
                from: [from],
                password: [passwordHasheada],
                uniqueString: crypto.randomBytes(15).toString('hex'),
                emailVerified: false,
            })
        if (from !== "form-Signup") {
            await newUser.save()
            res.json({
                succes: true,
                from: "signup",
                message: "Congratulations, your user has been created with" + from,
            })
        } else {
            await newUser.sabe()
            res.json({
                succes: true,
                from:"siggup",
                message: "We sent you an email to validate, please check your box to complete the sigUp"
            })  
        }
    }
    } catch (error) {
        res.json({success: false, message: "Upps! Something went wrong, try again in a few minutes"})
    }
},

signInUser: async (req,res) => {
    const {nameUser,lastNameUser, photoUser, email, password, role, from } = req.body.logedUser
    try {
        const userExists = await User.findOne({ email})
        const indexpass = userExists.from.indexOf(from)
        if (!userExists) {
            res.json({success: false, message: "Your user has not been registered, perform singUp"})
        } else {
            if (from !== "form-Signup") {
                let passwordmatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))
                if (passwordmatch.length > 0) {
                    const userData = {
                        id: userExists._id,
                        nameUser: userExists.nameUser,
                        lastNameUser: userExists.lastNameUser,
                        photoUser: userExists.photoUser,
                        role: userExists.rule,
                        from: from,
                        email: userExists.email,
                    }
                    await userExists.save()
                    res.json({
                        success: true,
                        from: from,
                        response: {userData},
                        message: "Welcome again" + userData.nameUser + " " + userData.lastNameUser,
                    })
                } else {
                    res.json({
                        success: false,
                        from: from,
                        message: "You have not registered with" + from + "if you want to enter with this method you must do the SingUp with" + from
                    })
                }
            } else {
                if (passwordmatch.length > 0 ) {
                    const userData = {
                        id: userExists._id,
                        nameUser: userExists.nameUser,
                        lastNameUser: userExists.lastNameUser,
                        photoUser: userExists.photoUser,
                        role: userExists.rule,
                        from: from,
                        email: userExists.email,
                    }
                    await userExists.save()
                    res.json({
                        success: true,
                        from: from,
                        response: {token,userData},
                        message: "Welcome again" + userData.nameUser + " " + userData.lastNameUser,
                    })
                } else {
                    res.json({
                        succes: false,
                        from: from,                        
                        message: "The username or password do not match"
                    })
                }
            }
        }
    } catch (error) {
        res.json({succes: false, message: "Something went wrong, try again in a few minutes"})
    }
},
}

module.exports = userControllers