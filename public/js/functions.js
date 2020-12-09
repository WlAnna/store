console.log('functions.js is here')

//Display total in header from local storage after page refresh
let arrStored = JSON.parse(localStorage.getItem("allEntries"))
totalFromStorage (arrStored) 

//Add product object to local storage after click on 'add to cart'
//Display total from local storage
function addToCartClicked(e) {
    console.log('clicked')
    const button = e.target
    const shopItem = button.parentElement.parentElement.parentElement
    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    console.log(title)
    const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    const quantity = shopItem.getElementsByClassName('shop-item-quantity')[0].value
    console.log(quantity)
    const id = shopItem.dataset.itemId //access data-
    console.log(id)

    console.log(imageSrc)
    let entryObj = {
      id,
      title,
      price,
      imageSrc,
      quantity
    }
    console.log(entryObj)
addItemtoLocalStorage(entryObj)

let arrStored = JSON.parse(localStorage.getItem("allEntries"))
totalFromStorage (arrStored) 
}

//When using local storage this code will allow to update data using newValue on every open page
//display total from newValue
window.addEventListener('storage', function (e) {
  console.log('clicked!')

  if (e.key === 'allEntries') {
    cartStorage = JSON.parse(e.newValue)
    console.log('cart stor', cartStorage)

    if (cartStorage != null) {
      totalFromStorage (cartStorage)
    }
    console.log(localStorage.getItem("allEntries"))
  }

})

