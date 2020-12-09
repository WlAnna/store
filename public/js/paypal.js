


var purchase3 = {
    items: [],
    inputs: []
};
  
  console.log(purchase3.items)
  
  function confirmShipping (e) {
      e.preventDefault()
    const formInputsData = document.getElementById('cart-delivery-info')

    const dataForm = formInputsData.getElementsByTagName('input')
    console.log(dataForm)
    const arr = [...dataForm]
    console.log(arr)
  
  
      shippingDetails = {}
      Array.prototype.forEach.call(arr, el => {
          console.log(el.name)
           console.log(el.value)
  
   
  
           if (el.name == 'firstname' ) {
              shippingDetails.firstname = el.value
           }
           if (el.name == 'lastname' ) {
              shippingDetails.lastname = el.value
           }
           if (el.name == 'email' ) {
              shippingDetails.email = el.value
           }
           if (el.name == 'address' ) {
              shippingDetails.address = el.value
           }
           if (el.name == 'postcode' ) {
              shippingDetails.postcode = el.value
           }
           if (el.name == 'city' ) {
              shippingDetails.city = el.value
           }
           if (el.name == 'country' ) {
              shippingDetails.country = el.value
           }
           if (el.name == 'phone' ) {
              shippingDetails.phone = el.value
           }  
    })
  
    console.log(shippingDetails)
          purchase3.inputs.push(shippingDetails)

          document.getElementById('payment-options').style.display="block"
 
  }

  

  console.log(purchase3.inputs)
  console.log(purchase3)
  
function itemsInCart(e) {
    console.log('clicked!')
    let orderSummary = document.getElementById('order-summary')
    let summaryObject = purchase3.items
   // window.location.reload()
    if ( purchase3.items.length !== 0 ) {
      console.log('not empty')
      displayCartSummary (summaryObject, orderSummary)

      return
    }
        const cartItemContaier = document.getElementsByClassName('cart-items')[0]
        let cartRows = cartItemContaier.getElementsByClassName('cart-row')
          for (let i = 0; i < cartRows.length; i++) {
              let cartRow = cartRows[i]
              let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
              let quantity = quantityElement.value
              let titleElement = cartRow.getElementsByClassName('cart-item-title')[0]
              let title = titleElement.innerText
              console.log(title.innerText)
              let priceElement = cartRow.getElementsByClassName('cart-price')[0]
              let price = priceElement.innerText.replace('£','')*100
              console.log(price)
              console.log(priceElement.innerText.replace('£',''))
              let id = cartRow.dataset.itemId
              purchase3.items.push({
                  id: id,
                  quantity: quantity,
                  price: price,
                  title
              })
          }
          console.log(purchase3)
     
          displayCartSummary (summaryObject, orderSummary)

           
}

function displayCartSummary (obj, summaryCart) {

    let summaryObject = obj
    console.log(summaryObject)
    let summaryTotal = document.getElementById('cart-total-price').innerText
    let shippingForm = document.getElementById('shipping-form')
    console.log(summaryTotal)
    let summary = `
    ${summaryObject.map(item =>
            `
            <div class="cart-summary-items cart-column">
              <span class="cart-summary-item">${item.title} -  ${item.quantity}x</span>
              <span class="cart-summary-price cart-column">${(item.price / 100) * item.quantity} £</span>
            </div>
            `
        ).join('')}
    `
    
    summaryCart.innerHTML =  `    
                              <h3 class="section-header span-xxl">YOUR ORDER</h3>      
                              <div class="cart-row">
                                  <span class="cart-summary-item cart-header cart-column">ITEM</span>
                                  <span class="cart-summary-price cart-header cart-column">PRICE</span>
                              </div>
                              ${summary}
                              <div class="cart-total">
                                  <strong class="cart-total-title">Total</strong>
                                  <span class="cart-total-price">${summaryTotal}</span>
                              </div>`


//display shipping details

shippingForm.innerHTML = `  <div class="form-wrapper-outer"><div class="section-header span-xxl">Delivery Information</div>
                            <form id="cart-delivery-info" action="/shippingForm" method="POST">
                            <div class="form-outline" >
                                <div class="form-wrapper">
                                    <div class="form__section ">
                                    <label for="fname" class="name">First Name:</label>
                                    <input type="text" id="fname" class="input__name" name="firstname">
                                </div>
                                <div class="form__section">
                                    <label for="lname" class="surname">Last Name:</label>
                                    <input type="text" id="lname" class="input__surname" name="lastname">
                                </div>
                                <div class="form__section ">
                                    <label for="email" class="email__add">Email Address:</label>
                                    <input type="email" id="email" class="input__email__add" name="email">
                                </div>
                                <div class="form__section ">
                                    <label for="faddress" class="address__to__send">Address:</label>
                                    <input type="text" id="faddress" class="input__address" name="address">
                                </div>
                                <div class="form__section">
                                    <label for="fpostcode" class="post__code">Post Code:</label>
                                    <input type="text" id="fpostcode" class="input__postcode" name="postcode">
                                </div>
                                <div class="form__section ">
                                    <label for="fcity" class="city">Town/City:</label>
                                    <input type="text" id="fcity" class="input__city" name="city">
                                </div>
                                <div class="form__section">
                                    <label for="fcountry" class="country">Country:</label>
                                    <input type="text" id="fcountry" class="input__country" name="country">
                                </div>
                                <div class="form__section">
                                    <label for="fphone" class="phone">Phone:</label>
                                    <input type="text" id="fphone" class="input__phone" name="phone">
                                </div>
                                </div>
                            </div>
                            <div class="btn-wrapper">
                            <button class="btn btn-primary " id="btn-shipping" type="submit">Choose Payment Option</button>
                            </div>
                            </form></div>`

document.querySelector('#btn-shipping').addEventListener('click', confirmShipping) 
}


(function(){
console.log('LOAD PAYPAL BUTTON!')

paypal.Buttons({
    createOrder: function(data, actions) {
        return fetch('/create', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(purchase3)
        })
        .then(function(res){
            return res.json()
        })
        .then(function(data) {
            return data.orderID
        })
    },
    onApprove: function(data, actions) {
        return actions.order.capture()
        .then(function(details){
            console.log('ORDER PROCESSED: ' + JSON.stringify(details))

            return fetch('/complete', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                purchase: purchase3,
                paypalOrderId: details.id,
                customerEmail: details.payer.email_address,
                customerName: details.payer.name,
                customerAddress: details.purchase_units[0].shipping.address,
            })
        })

        })
        .then(function(res){
            return res.json()
        })
        .then(function(data) {
            console.log('ORDER COMPLETED!')
            // return data.orderID
        })
    }
}).render('#paypal-button-container')

})()