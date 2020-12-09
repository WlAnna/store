const express = require('express')
const router = express.Router()
const fs = require('fs')
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
let clientIdKey = process.env.PAYPAL_CLIENT_KEY

router.get('/products', (req, res) => {
    fs.readFile('products.json', (e, data) => {
        if (e) {
            res.status(500).end()
        } else {
            res.render('products.ejs', {
                stripePublicKey: stripePublicKey,
                items: JSON.parse(data),
                myScript: ''
               
            }) 
        }
    })
  })

  //Zobaczyc czy ten kod dziala trzeba wyslac dane do js search
//   router.get('/store', (req, res) => {
//     fs.readFile('products.json', (e, data) => {
//         if (e) {
//             res.status(500).end()
//         } else {
//             res.render('products.ejs', {
//                 stripePublicKey: stripePublicKey,
//                 items: JSON.parse(data),
//                 myScript: ''
                
//             }) 
//         }
//     })
//   })

 router.get('/products/:id', (req, res) => {
    fs.readFile('products.json', (e, data) => {
      if (e) {
          res.status(500).end()
      } else {
  
        const dataJSON = JSON.parse(data)
        const dataJSONArr = dataJSON.products
        //console.log(dataJSONArr)
       // console.log(req.params.id)
  
  
        let itemSingle = ""
        //let relatedProducts = []
        let relatedProducts = ''
        for ( let i =0; i < dataJSONArr.length; i++) {
          //console.log(dataJSONArr[i].productID)
        
          if ( dataJSONArr[i].productID === req.params.id ) {
           // console.log(dataJSONArr[i].relatedProducts)
          itemSingle = dataJSONArr[i]
          //relatedProducts.push(dataJSONArr[i].relatedProducts)
            relatedProducts = dataJSONArr[i].relatedProducts
          }
        }
        console.log(relatedProducts)

        let relatedProductsArr = []
    
        relatedProducts.map((id) => {
            return dataJSONArr.map((item) => {
                if (item.productID == id.productID) {
                    relatedProductsArr.push(item)
                }
            })
        })
        console.log(relatedProductsArr)

          res.render('product.ejs', {
                stripePublicKey: stripePublicKey,
                item: itemSingle,
                allItems: dataJSONArr,
                relatedProducts: relatedProductsArr
              // stripePublicKey: stripePublicKey,
              // items: JSON.parse(data)
              
          }) 
      }
    })
  })
  
router.get('/store', (req, res) => {
    fs.readFile('products.json', (e, data) => {
        if (e) {
            res.status(500).end()
        } else {
            res.render('index.ejs', {
                stripePublicKey: stripePublicKey,
                items: JSON.parse(data),
                clientIdKey
                
            }) 
        }
    })
})

router.get('/cart', (req, res) => {
  fs.readFile('products.json', (e, data) => {
      if (e) {
          res.status(500).end()
      } else {
          res.render('cart.ejs', {
              stripePublicKey: stripePublicKey,
              items: JSON.parse(data),
              clientIdKey
              
          }) 
      }
  })
})

router.post('/shippingForm', (req, res) => {

    console.log(req.body)
    
            res.render('cart.ejs', {
                stripePublicKey: stripePublicKey,
                clientIdKey
                
            }) 
   
  })


module.exports = router