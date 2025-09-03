import app from './src/app.js';
import dotenv from 'dotenv'
import connectDB from './db/db.js';

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server started on port ${process.env.PORT}`)
    })
})
.catch(err => {
    console.log("DB error ", err)
})