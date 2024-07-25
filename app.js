require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
//middle ware
const notFoundMiddleWare = require('./middleware/not-found');
const errorHandlerMiddleWAre = require('./middleware/error-handler');
const productsRoute = require('./routes/products');
// parse json 
app.use(express.json());
// app.use(express.query());
//  rootes
app.get('/',(req,res)=>{

  res.send('<h1>products api</h1> <a href="/api/v1/products">products route</a>');
})
// product route
app.use('/api/v1/products',productsRoute);

app.use(errorHandlerMiddleWAre);
app.use(notFoundMiddleWare);

const PORT = process.env.PORT || 3000

const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, ()=>console.log(`server is listening on port ${PORT}...`))
  } catch (error) {
    console.log('killed');
  }
}
start()
