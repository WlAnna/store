const express = require('express')
const router = express.Router()
const fs = require('fs')
const Order = require('../models/order')
let clientIdKey = process.env.PAYPAL_CLIENT_KEY
let clientSecretKey = process.env.PAYPAL_CLIENT_SECRET_KEY
const paypal = require('@paypal/checkout-server-sdk')
const { sendConfirmationEmail } = require('../public/js/email-sendgrid')

const payPalClient = (credentials, env) => {
    const { clientId, clientSecret} = credentials
    const { SandboxEnvironment, LiveEnvironment, PayPalHttpClient } = paypal.core
    const ppEnvironment = (env=='dev') ? new SandboxEnvironment(clientId, clientSecret) : new LiveEnvironment(clientId, clientSecret)
  
    return new PayPalHttpClient(ppEnvironment)
  }

var calculateOrderAmountPayPal = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  // console.log(items)

  //console.log(items)
  var text = fs.readFileSync('products.json','utf8')
  const dataJSON = JSON.parse(text)
  const JSONobj = dataJSON.products

      //console.log (text)
     // console.log (dataJSON)
    // console.log(JSONobj)


  let total = 0

  items.forEach(function(item) {
  const itemJson = JSONobj.find(function(it) {
    if(it.productID == item.id ) {
      total = total + (it.productPrice * item.quantity)
      let itemCheck = it.productPrice * item.quantity
      console.log(itemCheck)
      return it.productID == item.id
    }

  })
  // total = total + itemJson.productPrice*100 * item.quantity
  //total = total + itemJson.productPrice * item.quantity
  console.log(itemJson)
  })
 

  //   let total = 0
  console.log(total)
  return total

};

router.post('/create', async (req, res, next) => {
  const request = new paypal.orders.OrdersCreateRequest();
  const { items } = req.body;
  console.log(items)
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'GBP',
        value: calculateOrderAmountPayPal(items)
      }
    }]
  });

  try {

    const credentials = {
      clientId: clientIdKey,
      clientSecret: clientSecretKey
    }
    let order = await payPalClient(credentials, 'dev').execute(request);
    res.json({
      orderID: order.result.id
    })
  }catch (error) {
    res.json({
      confirmation: 'fail',
      message: error.message
    })
   
  }
})


router.post('/complete', async (req, res, next) => {
    console.log(JSON.stringify(req.body.purchase.inputs))
  
    const emailTo = req.body.purchase.inputs[0]["email"]
    const nameTo =  req.body.purchase.inputs[0]["firstname"]
    console.log(emailTo, nameTo)
    // const { purchase, paypalOrderId, customerEmail } = req.body
    // fs.writeFileSync('order.json', req.body)
  
    const order = new Order ({
      service: 'Paypal',
      orderId: req.body.paypalOrderId,
      customerEmail: req.body.customerEmail,
      purchase: JSON.stringify(req.body.purchase.items),
      shippingDetails: JSON.stringify(req.body.purchase.inputs),
      customerName: JSON.stringify(req.body.customerName),
      customerAddress: JSON.stringify(req.body.customerAddress)
  })
    console.log(order)
    console.log(order.shippingDetails[0].firstname)
 
    
    res.json(req.body)
  
    try {
      await order.save()
      sendConfirmationEmail( emailTo, nameTo )
      console.log(req.body.purchase.inputs)
      console.log(req.body.purchase.inputs.email)
     // res.redirect('books')
  } catch (e) {
      console.log(e)
  }
})
  

module.exports = router