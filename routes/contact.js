const { send } = require('@sendgrid/mail')
const express = require('express')
const router = new express.Router()
const path = require('path')
const sendMail = require('../public/js/contact')
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY


//Data parsing
router.use(express.urlencoded({ extended: false }))
router.use(express.json())


router.post('/email', (req, res) => {
    console.log('Data: ', req.body)
    //validate right format should be here
    const {email, name, message} = req.body
    sendMail(email, name, message, function(err, data) {
        if (err) {
            console.log(err)
            //res.status(500).json({message: err.message || 'Internal Error'})
        } else {
            res.render('products', {
                message: 'Message has been sent!',
                stripePublicKey: stripePublicKey
            })
        }
    })
})


module.exports = router