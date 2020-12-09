console.log('This is search.js')

//Fetched product used for search filter on products page and category filters filters.cat and filters-size
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    function loadDoc(url, clb) {
        var xhttp;
        if (window.XMLHttpRequest) {
          // code for modern browsers
          xhttp = new XMLHttpRequest();
        } else {
          // code for IE6, IE5
          xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
             // console.log(this.responseText)
            //document.getElementById("demo").innerHTML = this.responseText;
        
        const rawData = JSON.parse(this.responseText)

        let data = ''
        if (url == "products.json") {
            data = rawData.products.products
        } else if (url == "nav.json"){
            data = rawData.products.nav
        }
  
        //console.log(rawData.products.products)
        console.log(rawData.products.nav)
        clb(data)
       // categoryClicked(data)
    }
};
xhttp.open("GET", url, true)
xhttp.send();
}

//displayProductsonScreen(data)
//loadDoc("products.json", displayProductsonScreen)

loadDoc("products.json", searchItem)
//loadDoc("products.json", showCategories)
loadDoc("products.json", categoryClicked)

}


function searchItem(products) {
    const data = products
    const searchProduct = document.querySelector('#search-product')
    displayProductsonScreen(data)
    allProductsCategoryClicked(data)

    // Search products
        searchProduct.addEventListener('keyup', (e) => {
            const searchString = e.target.value.toLowerCase();
           // console.log(searchString)
         
            const filteredProducts = data.filter(product => { 
                return product.productName.toLowerCase().includes(searchString)            
            })
           // console.log(filteredProducts)
        displayProductsonScreen(filteredProducts)
      
            })
}


//Display products
const displayProducts = document.querySelector('#products')
const displayProductsonScreen = (products) => {
    let productList = `
${products.map(item =>
        `
        <div class="shop-item shop-item-main" data-item-id="${item.productID}">
        <div>
            <p><a target="_blank" href="/products/${item.productID}"><img class="shop-item-image shop-item-image-main" height="370" width="260" src="${item.productImage}"></a><p>
        </div>
        <div>
            <span class="shop-item-title">${item.productName}</span>
            <div class="shop-item-details">
                <span class="shop-item-price">${item.productPriceFormated}</span>
                <label for="quantity"></label>
                <input type="number" id="quantity" name="quantity" class="shop-item-quantity" value="1"> 
                <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
            </div>
        </div>

    </div>
        `
    ).join('')}
`
//console.log(products.products)
displayProducts.innerHTML = productList

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    console.log(addToCartButtons)
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }   
}


