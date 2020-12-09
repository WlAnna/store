//localStorage.clear()
console.log('functions2.js is here')

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
        cartQuantityValues[i].value = quantity
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
            <button class="btn btn-danger btn-x" type="button">x</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

const cartStoragestorageItems = localStorage.getItem("allEntries")
const storageItemsParse = JSON.parse(cartStoragestorageItems)


//Add item from local storeage to cart
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
      console.log(title, price, qty)
      updateCartTotal()
    }); 
  }
}

addItemsfromStoragetoCart (storageItemsParse)

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
        const title = cartRow.getElementsByClassName('cart-item-title')[0].innerHTML
        const id =  cartRow.dataset.itemId
        const imageSrc = cartRow.getElementsByClassName('cart-item-image')[0].src
        console.log(title, id, imageSrc)

        const priceElement = cartRow.getElementsByClassName('cart-price')[0]
        const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        console.log(priceElement, quantityElement)
        const price = parseFloat(priceElement.innerText.replace('£',''))
        console.log(price)
        const quantity = quantityElement.value
        total = total + (price * quantity)

        let entryObj = {
          id,
          title,
          price,
          imageSrc,
          quantity
        }
        console.log(entryObj)
        let replace = true
        addItemtoLocalStorage(entryObj, replace)
        
    }
    total = Math.round(total * 100) / 100  //to avoid long number 9.999999999
    document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total
    //document.getElementById('cart-total').innerText = '£' + total

    let arrStored = JSON.parse(localStorage.getItem("allEntries"))
    totalFromStorage (arrStored)
}

function hideOrderSummary () {
    let orderSummaryContent = document.getElementById('order-summary')
    console.log(orderSummaryContent)
    orderSummaryContent.innerHTML = ""
    console.log('called')
}

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
          const qty = element.quantity
          console.log(localStorage.getItem("allEntries"))     
          addItemToCart(title, price, imageSrc, id, qty)
          updateCartTotal()
          console.log(title, price, qty)
      }); 
      }
      console.log(localStorage.getItem("allEntries"))
    }

})

function quantityChanged(e) {
    let input = e.target
    //check if input is not deleted so then NaN 
    if(isNaN(input.value) || input.value <= 0 ) {
        input.value = 1
    }
    updateCartTotal()
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

//CLEAR ENTIRE LOCAL STORAGE
 // window.localStorage.clear();

