const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const validator = require("validator")
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")
const User = require("./models/User")
const bcrypt = require("bcrypt")
const { ref, deleteObject } = require("firebase/storage")

require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(express.static(path.resolve(__dirname, "..", "./build")))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })


app.post("/send_email", async (req, res) => {
    var email = req.body.email

    if (!validator.isEmail(email))
        res.json({ isValid: false })

    await User.findOne({ email }).then(async (data) => {

        if (data) {
            res.json({ isValid: true, isPresent: true })
        } else {

            await User.create({
                email
            }).then(async (data) => {
                var id = data._id

                const transport = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,

                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS
                    }
                })

                await transport.sendMail({
                    from: process.env.MAIL_FROM,
                    to: email,
                    subject: "Please set your password",
                    html: `<div>
    
            <div>
                <p>PomodoroClock</p>
            </div>
    
    
            <hr />
            <h2>Please set a new password for your account.</h2>
            <p>Please set a new password for your account.</p>
    
            <div>
                <button> <a href="http://localhost:3000/new_password/${id}"> Set a New Password <a/></button>
            </div>
    
            <p>
                This email was sent by PomodoroClock <a href="https://pomodoroclock.herokuapp.com/">
                    (https://localhost:3000)
                </a>
            </p>
        </div>`,
                }).then(() => {

                    res.json({ isPresent: false, emailSent: true, isValid: true, })

                }).catch(err => res.status(500).send(err.message))

            }).catch(err => res.status(500).send(err.message))
        }
    }).catch((err) => console.error(err.message))



})

app.post("/new_password/:token", async (req, res) => {
    var token = req.body.token
    var password = req.body.password


    if (validator.isStrongPassword(password) === false)
        return res.json({ isValid: false })

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.findByIdAndUpdate(token, {
            password: hashedPassword, $unset: { createdAt: 1 }
        }).then(data => {

            res.json({ isCreated: true, isValid: true, data, hashedPassword })

        }).catch(err => res.status(404).send(err.message))


    } catch {
        res.status(500).send(err.message)
    }

})

app.post("/login", async (req, res) => {
    var email = req.body.email
    var password = req.body.password

    if (validator.isEmail(email) && validator.isStrongPassword(password)) {
        await User.findOne({ email }).then(async (data) => {

            if (await bcrypt.compare(password, data.password)) {
                res.json({ isLogged: true, isValid: { email: true, password: true }, payload: data })

            } else {
                res.json({ isLogged: false, isValid: { password: false } })
            }
        }).catch(err => res.status(500).send(err.message))

    } else if (!password) {

        if (!validator.isEmail(email)) {
            res.json({ isValid: { email: false } })
        } else {
            res.json({ isValid: { email: true } })
        }

    } else if (!validator.isStrongPassword(password)) {
        res.json({ isValid: { password: false } })

    } else {
        res.json({ isValid: { password: true } })
    }

})

app.delete("/delete-user", async (req, res) => {
    var payload = req.body.payload

    await User.deleteOne({ payload }).then(data => {
        res.json({ isDeleted: data })
    }).catch(err => res.status(500).send(err.message))
})


app.put("/update-user", async (req, res) => {

    var payload = req.body.payload

    var userId = payload._id
    var username = payload.username
    var profilePicId = payload.profilePicId


    await User.findByIdAndUpdate(userId, {
        username,
        profilePicId
    }).then((data) => {

        res.json(data)

    }).catch(err => res.status(500).send(err.message))

})

app.post("/reset-password", async (req, res) => {
    var email = req.body.email

    if (validator.isEmail(email)) {

        await User.findOne({ email }).then(async data => {
            if (data) {
                res.json({ isValid: true, isPresent: true })
            } else {
                res.json({ isValid: true, isPresent: false })
            }
        }).catch(err => res.status(500).send(err.message))

    } else {
        res.json({ isValid: false, isPresent: true })
    }
})

app.post("/send-reset-email", async (req, res) => {
    var email = req.body.email

    await User.findOne({ email }).then(async data => {
        var id = data._id

        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,

            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: email,
            subject: "Please set your password",
            html: `<div>
    <div>
        <p>PomodoroClock</p>
    </div>


    <hr />
    <h2>Please set a new password for your account.</h2>
    <p>Please set a new password for your account.</p>

    <div>
        <button> <a href="http://localhost:3000/new_password/${id}"> Set a New Password <a/></button>
    </div>

    <p>
        This email was sent by PomodoroClock <a href="https://pomodoroclock.herokuapp.com/">
            (https://localhost:3000)
        </a>
    </p>
</div>`,
        }).then(() => {
            res.json({ isPresent: false, emailSent: true, isValid: true, })
        })

    }).catch(err => res.status(500).send(err.message))
})

app.post("/getPrevProPicId", async (req, res) => {
    var payload = req.body.payload

    var userId = payload._id

    await User.findById(userId).then((data) => {
        res.json(data)

    }).catch(err => res.status(500).send(err.message))
})


app.listen(PORT)