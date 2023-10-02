import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv"
import route from './routes/register.route';



const app = express();
const PORT = 8000
dotenv.config()

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname))

var corsOptions = {
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use(route)

console.log(process.env.SECRECT_USERNAME)
console.log(process.env.SECRECT_PASSWORD)
async function main() {
    const uri = `mongodb+srv://${process.env.SECRECT_USERNAME}:${process.env.SECRECT_PASSWORD}@cluster0.mboen1x.mongodb.net/?retryWrites=true&w=majority`
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to MongoDB!")
    }).catch((error) => {
        console.log(error)
    })
}
main()
