const dotenv=require('dotenv');
const app=require('./app')
const mongoose=require('mongoose')
dotenv.config({path:"./config.env"});

const DB=process.env.DATABASE.replace('<DATABASE_PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB)
    .then( ()=>
        console.log('Database Connected Successfully')
    )
    .catch(err=>
        console.log("error",err))
const port=process.env.PORT||3000;

app.listen(port,()=>
{
    console.log(`App is running on Port ${port}`)
})