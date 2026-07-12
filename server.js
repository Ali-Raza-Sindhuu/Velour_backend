import app from './index.js'
import dotenv from 'dotenv'

dotenv.config()

const Port = process.env.PORT 
app.listen(Port, () => {
    console.log(`Server is running on ${Port}`)
})