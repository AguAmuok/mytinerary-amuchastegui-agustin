const nodemailer = require('nodemailer')
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

const sendVerification = async (email, string) => { //string=uniqueString.. puede llevar cualquier nombre.. depende del email que ingresa el usuario y el unique string de crypto

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
    )

    myOAuth2Client.setCredentials({
        refresh_token:process.env.GOOGLE_REFRESHTOKEN
    })

    const accessToken = myOAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.USER,
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false// es para que no  lo bloquee el antivirus
        }
    })

    let mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'My Tinerary verify account',
        html: `
            <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><div class="es-wrapper-color" style="background-color:#F6F6F6"><!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f6f6f6"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"><tr style="border-collapse:collapse"><td valign="top" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table bgcolor="#0b0a0a" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#0B0A0A;width:600px"><tr class="es-visible-simple-html-only" style="border-collapse:collapse"><td class="es-struct-html" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:560px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://vpplto.stripocdn.email/content/guids/c2603882-4168-4177-afa1-9f87bceb377d/images/logo_largo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="560"></td>
</tr><tr class="es-visible-simple-html-only" style="border-collapse:collapse"><td align="center" style="padding:15px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:16px;color:#999999;font-size:16px"><font style="vertical-align:inherit"><font style="vertical-align:inherit">Hi traveler!!  </font><font style="vertical-align:inherit">Your registration was successful. </font><font style="vertical-align:inherit">Click the button to verify your account.</font></font></p></td></tr></table></td>
</tr><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:560px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr class="es-visible-simple-html-only" style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-left:10px;padding-right:10px"><span class="es-button-border" style="border-style:solid;border-color:#9AAEA6;background:#c27ba0;border-width:0px;display:inline-block;border-radius:0px;width:auto"><a href=http://localhost:4000/api/verify/${string} class="es-button" target="_blank" style="text-decoration:none;mso-style-priority:100 !important;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;border-style:solid;border-color:#c27ba0;border-width:10px 20px 10px 20px;display:inline-block;background:#c27ba0;border-radius:0px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center"><font style="vertical-align:inherit"><font style="vertical-align:inherit">¡Click here!</font></font></a></span></td>
</tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>`
    }

    await transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error)
        } else {
            console.log(`check ${email} to confirm your account`)
        }
    })
}

module.exports = sendVerification