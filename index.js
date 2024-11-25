import express from 'express'
import {PORT, mongoDBURL} from './config.js'
import mongoose from 'mongoose'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express()
app.use(express.json())


//Middleware for handling CORS POLICY
//Option 1:Allow All Origins with default CORS(*) 
//app.use(cors())
//Option 2: Allow custom Origins
app.use(cors({
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type']
}))


app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send("Welcome to MERN Project");
})

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App is connected to the Databse.')
        app.listen(PORT, ()=>{
            console.log(`APP is listening @: ${PORT}`)
        });
    })
    .catch((error)=>{
        console.log(error)
    })

