const mongoose = require('mongoose')
const Schema = mongoose.Schema


const orderSchema = new Schema({
    service: {
        type: String
    },
    orderId: {
        type: String,
        default: ''
    },
    customerEmail: {
        type: String,
        default: ''
    },
    purchase: {
        type: String
    },
    shippingDetails: {
        type: String
    },
    customerName: {
        type: String
    },
    customerAddress: {
        type: String
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order