console.log('index.js is here')

//JSON validator: https://jsonlint.com/
// fetch('/products').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         } else {
// }
// })
// })


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
        button.addEventListener('click',  hideOrderSummary)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
        input.addEventListener('change',  hideOrderSummary)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    document.querySelector('#confirm-order').addEventListener('click', itemsInCart) 
    // document.querySelector('#btn-shipping').addEventListener('click', confirmShipping) 
}




