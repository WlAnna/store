const express = require('express')
const router = express.Router()
const fs = require('fs')
const Order = require('../models/order')

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(stripeSecretKey)

var calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client

  //console.log(items)
  var text = fs.readFileSync('products.json','utf8')
  const dataJSON = JSON.parse(text)
  const JSONobj = dataJSON.products

  let total = 0

  items.forEach(function(item) {
  const itemJson = JSONobj.find(function(it) {
    return it.productID == item.id
  })
  total = total + itemJson.productPrice*100 * item.quantity
  //total = total + itemJson.productPrice * item.quantity

})

  //let total = 0
  console.log(total)
  return total

};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  console.log(req.body)
  const { inputs } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "gbp"
  });

  try {
    const order = new Order ({
      service: 'Stripe',
      orderId: JSON.stringify(paymentIntent.id),
      customerEmail: '',
      purchase: JSON.stringify(req.body.items),
      shippingDetails: JSON.stringify(req.body.inputs),
      customerName: '',
      customerAddress: ''
  })
  await order.save()

  } catch (e) {
    console.log(e)
  }


  console.log(paymentIntent)
  res.send({
    clientSecret: paymentIntent.client_secret
   
  });
});


module.exports = router