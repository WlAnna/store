console.log('index.js is here')
// const products = {
//     "products" :[
//         {
//             "productID" : "1",
//             "productName" : "Green Tea Soap",
//             "productPrice" : "6",
//             "productPriceFormated" : "$ 6.00",
//             "productCategory" : "Face",
//             "inStock" : true,
//             "productImage" : "images/image_1.jpg",
//             "relatedProducts": [
//                 {"productID": "2"},
//                 {"productID": "3"}
//             ]
//         },
//         {
//             "productID" : "2",
//             "productName" : "Rose Soap",
//             "productPrice" : "5",
//             "productPriceFormated" : "$ 5.00",
//             "productCategory" : "Body",
//             "inStock" : true,
//             "productImage" : "images/image_2.jpg",
//             "relatedProducts": [
//                 {"productID": "1"},
//                 {"productID": "3"}
//             ]
//         },
//         {
//             "productID" : "3",
//             "productName" : "Black Sea Salt Soap",
//             "productPrice" : "",
//             "productPriceFormated" : "$ 8.00",
//             "productCategory" : "Body",
//             "inStock" : true,
//             "productImage" : "images/image_3.jpg",
//             "relatedProducts": [
//                 {"productID": "2"},
//                 {"productID": "1"}
//             ]
//         },
//         {
//             "productID" : "4",
//             "productName" : "Cinnamon Soap",
//             "productPrice" : "",
//             "productPriceFormated" : "$ 7.00",
//             "productCategory" : "Body",
//             "inStock" : true,
//             "productImage" : "images/image_4.jpg",
//             "relatedProducts": [
//                 {"productID": "2"},
//                 {"productID": "1"}
//             ]
//         },
//         {
//             "productID" : "5",
//             "productName" : "Camomile Soap",
//             "productPrice" : "",
//             "productPriceFormated" : "$ 3.00",
//             "productCategory" : "Body",
//             "inStock" : true,
//             "productImage" : "images/image_5.jpg",
//             "relatedProducts": [
//                 {"productID": "2"},
//                 {"productID": "1"}
//             ]
//         },
//         {
//             "productID" : "6",
//             "productName" : "Lavender Soap",
//             "productPrice" : "",
//             "productPriceFormated" : "$ 4.00",
//             "productCategory" : "Body",
//             "inStock" : true,
//             "productImage" : "images/image_6.jpg",
//             "relatedProducts": [
//                 {"productID": "2"},
//                 {"productID": "1"}
//             ]
//         }
//     ]
// }


// //JSON validator: https://jsonlint.com/
// fetch('/products').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         } else {

// const allProducts = data.products.products
// console.log(data.products.products)


// const displayProducts = document.querySelector('#products')
// const searchProduct = document.querySelector('#search-product')

// const allProducts = products.products
// let productsArr = Object.entries(products.products)

// console.log(productsArr)


// searchProduct.addEventListener('keyup', (e) => {
//     const searchString = e.target.value.toLowerCase();
//     console.log(searchString)


//     const filteredProducts = allProducts.filter(product => { 
//         return product.productName.toLowerCase().includes(searchString) 
     
//     })
//     console.log(filteredProducts)
//  displayProductsonScreen(filteredProducts)
//     })


// const displayProductsonScreen = (products) => {
//     let productList = `
// ${products.map(product =>
//         `
//         <div class="shop-item">
//             <p><a target="_blank" href="${product.productImage}"><img class="shop-item-image" height="272" width="200" src="${product.productImage}"></a><p>
//             <div class="shop-item-details">
//                 <span class="shop-item-title">${product.productName}</span>
//                 <span class="shop-item-price"> ${product.productPriceFormated}</span>
//                 <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
//             </div>
//         </div>
//         `
//  ).join('')}
// `
// //console.log(products.products)
// displayProducts.innerHTML = productList
// }
// displayProductsonScreen(allProducts)

//Cart

//remove from cart

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    console.log(addToCartButtons)
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    document.querySelector('#confirm-order').addEventListener('click', itemsInCart) 

  
    
    
}

function quantityChanged(e) {
    let input = e.target
    //check if input is not deleted so then NaN 
    if(isNaN(input.value) || input.value <= 0 ) {
        input.value = 1
    }
    updateCartTotal()
}

//STRIPE
var stripe = Stripe("pk_test_51Hn20XJMjGJqqPIhHMCmwEW2hgs8qr3zKSrOonDt9hzrJGaD4DS1ZAeIIwjjMKHBzzJZyjDbHzBnONJN3QUNbVSZ00jTeoyTHG", {
  locale: 'auto'//it will affect card form if zip postal code is required
});

//document.querySelector("#submit").disabled = true;



function purchaseClicked(e) {

    itemsInCart()

    fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(purchase3)
      })
        .then(function(result) {
          return result.json();
        })
        .then(function(data) {
          var elements = stripe.elements();
      
          var style = {
            base: {
              color: "#32325d",
              fontFamily: 'Arial, sans-serif',
              fontSmoothing: "antialiased",
              fontSize: "16px",
              "::placeholder": {
                color: "#32325d"
              }
            },
            invalid: {
              fontFamily: 'Arial, sans-serif',
              color: "#fa755a",
              iconColor: "#fa755a"
            }
          };
      
          var card = elements.create("card", { style: style });
          // Stripe injects an iframe into the DOM
          card.mount("#card-element");
      
          card.on("change", function (event) {
            // Disable the Pay button if there are no card details in the Element
            document.querySelector("button").disabled = event.empty;
            document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
          });
      
          var form = document.getElementById("payment-form");
          form.addEventListener("submit", function(event) {
            event.preventDefault();
            // Complete payment when the submit button is clicked
            payWithCard(stripe, card, data.clientSecret);
          });
        });
      
      // Calls stripe.confirmCardPayment
      // If the card requires authentication Stripe shows a pop-up modal to
      // prompt the user to enter authentication details without leaving your page.
      var payWithCard = function(stripe, card, clientSecret) {
        loading(true);
        stripe
          .confirmCardPayment(clientSecret, {
            receipt_email: document.getElementById('email').value,
            payment_method: {
              card: card
            }
          })
          .then(function(result) {
            if (result.error) {
              // Show error to your customer
              showError(result.error.message);
            } else {
              // The payment succeeded!
              orderComplete(result.paymentIntent.id);
            }
          });
      };
      

// Shows a success message when the payment is complete
var orderComplete = function(paymentIntentId) {
    loading(false);
    document
      .querySelector(".result-message a")
      .setAttribute(
        "href",
        "https://dashboard.stripe.com/test/payments/" + paymentIntentId
      );
    document.querySelector(".result-message").classList.remove("hidden");
    document.querySelector("button").disabled = true;
  };
  
  // Show the customer the error from Stripe if their card fails to charge
  var showError = function(errorMsgText) {
    loading(false);
    var errorMsg = document.querySelector("#card-error");
    errorMsg.textContent = errorMsgText;
    setTimeout(function() {
      errorMsg.textContent = "";
    }, 4000);
  };
  
  // Show a spinner on payment submission
  var loading = function(isLoading) {
    if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector("button").disabled = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
    } else {
      document.querySelector("button").disabled = false;
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
    }
  };
}

function removeFromLocalStorage (itemId) {
  let id = itemId
  var allEntries = JSON.parse(localStorage.getItem("allEntries"));
  console.log(allEntries)

  for ( i =0; i < allEntries.length; i++) {
    console.log(allEntries[i].id) 
    if ( allEntries[i].id == id ) {
      allEntries.splice(i, 1)
    }
  }

  localStorage.setItem("allEntries", JSON.stringify(allEntries));
}

function removeCartItem(e) {
    let buttonClicked = e.target
    const shopItem = buttonClicked.parentElement.parentElement
    const itemId = shopItem.dataset.itemId //access data-

    removeFromLocalStorage(itemId)

    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal() {
    const cartItemContaier = document.querySelectorAll('.cart-items')[0]
    console.log(cartItemContaier)//this is node list el O is cart items
    const cartRows = cartItemContaier.querySelectorAll('.cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        const priceElement = cartRow.getElementsByClassName('cart-price')[0]
        const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        console.log(priceElement, quantityElement)
        const price = parseFloat(priceElement.innerText.replace('£',''))
        console.log(price)
        const quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100  //to avoid long number 9.999999999
    document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total
  //  document.getElementById('cart-total').innerText = '£' + total

    
    localStorage.setItem('cartTotal', total.toString() )
    console.log(localStorage.getItem('cartTotal'))
}

// add to cart
function addToCartClicked(e) {
    const button = e.target
    const shopItem = button.parentElement.parentElement
    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    console.log(title)
    const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    const quantity = shopItem.getElementsByClassName('shop-item-quantity')[0].value
    console.log(quantity)
    const id = shopItem.dataset.itemId //access data-
    console.log(id)
    addItemToCart(title, price, imageSrc,id, quantity)
    updateCartTotal()

    let entryObj = {
      id,
      title,
      price,
      imageSrc,
      quantity
    }
    console.log(entryObj)
    //localStorage.setItem("entry", JSON.stringify(entry));
  //var allEntries = [];
addItemtoLocalStorage(entryObj)
 

// let allEntries = JSON.parse(localStorage.getItem("allEntries"));
//  console.log(allEntries)

//  if (allEntries == null ) {
//    allEntries = []
//  } 

//  for (let i=0; i < allEntries.length; i++ ) {

//   if(allEntries[i].id == entryObj.id) {
//   console.log('in array')
//  return
//   } 
//  }
//   localStorage.setItem("allEntries", JSON.stringify(allEntries));
//   console.log(allEntries)



}


//localStorage.clear()
function addItemToCart(title, price, imageSrc, id, quantity) {
    const cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.dataset.itemId = id
    let qty = quantity
    const cartItems = document.getElementsByClassName('cart-items')[0]
    const cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
    const cartQuantityValues = cartItems.getElementsByClassName('cart-quantity-input')
        for ( let i = 0; i < cartItemsNames.length; i++ ) {
            if(cartItemsNames[i].innerText == title) {
              
             let number = Math.ceil(cartQuantityValues[i].value) + 1
              cartQuantityValues[i].value = number
               // alert('Item already in cart')
                return
            }
        }
    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value=${qty}>
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)


  //   let entryObj = {
  //     id,
  //     title,
  //     price,
  //     imageSrc
  //   }
  //   console.log(entryObj)
  //   //localStorage.setItem("entry", JSON.stringify(entry));
  // //var allEntries = [];
  // addItemtoLocalStorage(entryObj)
}

function addItemtoLocalStorage(entryObj) {
  let entry = entryObj
  let allEntries = JSON.parse(localStorage.getItem("allEntries"));

  if (allEntries == null ) {
    allEntries = []
  } 

  let found = false
  for ( i =0; i < allEntries.length; i++) {
    console.log(allEntries[i].id) 
    if ( allEntries[i].id == entry.id ) {
      console.log('already in array')
      let num =  Math.ceil( allEntries[i].quantity) //+ entryObj.quantity.toString()  // ZAMIENIC na numer!!
      console.log(typeof num)
    let numObj = Math.ceil(entryObj.quantity)
    //  let numObj = 1
      console.log(typeof numObj)
      console.log(numObj)
      let numSum =  num + numObj
      let numSumtoString = numSum.toString()
      console.log(typeof numSumtoString)
      console.log(numSum)
      allEntries[i].quantity = numSumtoString
      //allEntries[i].quantity = 7
      localStorage.setItem("allEntries", JSON.stringify(allEntries))
     //allEntries.splice(i, 1, entryObj)
      console.log(allEntries)
        found = true
        return
    }
  }


  allEntries.push(entry)
  localStorage.setItem("allEntries", JSON.stringify(allEntries));
  
  console.log(found)
  console.log(allEntries)
}

console.log(localStorage.getItem("allEntries"))

const cartStoragestorageItems = localStorage.getItem("allEntries")
const storageItemsParse = JSON.parse(cartStoragestorageItems)

function addItemsfromStoragetoCart (items) {

  const cartStorage= items
  console.log(cartStorage)

  if (cartStorage != null) {

    cartStorage.forEach(element => {
      const title = element.title
      const price = element.price
      const imageSrc = element.imageSrc
      const id = element.id
      const qty = element.quantity
    
      addItemToCart(title, price, imageSrc, id, qty)
      updateCartTotal()
     
    }); 
  }
}

  addItemsfromStoragetoCart (storageItemsParse)




window.addEventListener('storage', function (e) {
  console.log('clicked!')

  if (e.key === 'allEntries') {

    cartStorage = JSON.parse(e.newValue)
    console.log('cart stor', cartStorage)
  
    
  
    if (cartStorage != null) {
  
      cartStorage.forEach(element => {
        const title = element.title
        const price = element.price
        const imageSrc = element.imageSrc
        const id = element.id
    console.log(localStorage.getItem("allEntries"))     
        addItemToCart(title, price, imageSrc, id)
        updateCartTotal()
       
      }); 
    }
    console.log(localStorage.getItem("allEntries"))
  }


 




})


// }
// })
// })


var purchase3 = {
  items: [ ]
};

console.log(purchase3.items)

function itemsInCart(e) {
  console.log('clicked!')

  if ( purchase3.items.length !== 0 ) {
    console.log('not empty')
    return
  }
            const cartItemContaier = document.getElementsByClassName('cart-items')[0]
        let cartRows = cartItemContaier.getElementsByClassName('cart-row')
        for (let i = 0; i < cartRows.length; i++) {
            let cartRow = cartRows[i]
            let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            let quantity = quantityElement.value
            let priceElement = cartRow.getElementsByClassName('cart-price')[0]
            let price = priceElement.innerText.replace('$','')*100
            let id = cartRow.dataset.itemId
            purchase3.items.push({
                id: id,
                quantity: quantity,
                price: price
            })
        }
        console.log(purchase3)
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