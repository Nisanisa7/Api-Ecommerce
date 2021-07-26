require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const route = require('./src/routes/index')
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

  app.use('/v1', route)
// static route for image
  app.use('/file', express.static('./uploads'))

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
 