require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const productRouter = require('./src/routes/products')
const categoryRouter = require('./src/routes/category')
const userRouter = require('./src/routes/user')
const orderRouter = require('./src/routes/orders')
const port = process.env.PORT
const morgan = require('morgan')
const setCors = require('./src/middleware/cors')
const cors = require('cors')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))

//my middleware
const myMiddleware = (req, res, next) => {
    console.log('my middleware di jalankan ');
    next()
  }
  
  app.use(myMiddleware)
  app.use(cors())
//   app.use(setCors)

  app.use('/products', productRouter)
  app.use('/category', categoryRouter)
  app.use('/user', userRouter)
  app.use('/orders', orderRouter)

  app.use('*', (req, res)=>{
      res.status(404).json({
          message: 'url not found'
      })
  })
  app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).send(err)
  })

  app.listen(port, ()=>{
      console.log(`server is running on port ${port}`);
  })
