
import dotenv from 'dotenv'
import connectDb from './db/connect.js'
import app from './app.js'

dotenv.config(
    {path:'./.env'}
)

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running at port:${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("connection faild:",error)


})