import express from 'express';
import dotenv from 'dotenv'
import contactRoute from './Routes/contactRoute.js'
import userRoute from './Routes/userRoute.js'
import connectDb from './Database/connectDB.js';
const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/contacts", contactRoute)
app.use("/api/user", userRoute)


connectDb()
    .then((res) => {
        console.log("successfully connected to db")
    }).catch((err) => {
        console.log(err)
    })

app.listen(PORT, (() => {
    console.log(`app is listening on port ${PORT}`)
}))