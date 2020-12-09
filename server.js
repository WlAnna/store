if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()  // load all variables from .env file
}
const bodyParser = require('body-parser')
const path = require('path');
const express = require('express')
const app = express() //create server
const expressLayouts = require('express-ejs-layouts')
const fs = require('fs')
const { data } = require('jquery')
const { toASCII } = require('punycode')
require('./db/mongoose')
const router = express.Router()
const Order = require('./models/order')




//front end will use ejs to render views
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.json())
app.use(express.static('public')) //show in the browser what is in public folder

const storeRouter = require('./routes/store')
const paypalRouter = require('./routes/paypal')
const stripeRouter = require('./routes/stripe')
const contactRouter = require('./routes/contact')
app.use(storeRouter)
app.use(paypalRouter)
app.use(stripeRouter)
app.use(contactRouter)


// app.get('/public/functions.js', function (req, res, next) {
//   res.sendFile(__dirname + '/public/functions.js') 
// })



app.get('/products.json', (req, res) => {
  fs.readFile('products.json', (e, data) => {
      if (e) {
          res.status(500).end()
      } else {
          res.send({
              products: JSON.parse(data)
          }) 
      }
  })
})

app.get('/nav.json', (req, res) => {
    fs.readFile('nav.json', (e, data) => {
        if (e) {
            res.status(500).end()
        } else {
            res.send({
                products: JSON.parse(data)
            }) 
        }
    })
  })

app.get('/create', (req, res) => {
     res.json({
       confirmation: 'success'
     })
})



const port = 3000

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


