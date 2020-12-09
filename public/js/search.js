console.log('this is search.js front end')

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
         //console.log(this.responseText)
            //document.getElementById("demo").innerHTML = this.responseText;
        
        const rawData = JSON.parse(this.responseText)


        let data = ''
        if (url == "/products.json") {
            data = rawData.products.products
        } else if (url == "nav.json"){
            data = rawData.products.nav
        }
  
      console.log(rawData.products.products)
          console.log(rawData.products.nav)
        clb(data)
      
       // categoryClicked(data)



    }
};
xhttp.open("GET", url, true)
xhttp.send();
}

loadDoc("/products.json", searchItemList)
}


function searchItemList(products) {
    const data = products
    const searchProduct = document.querySelector('#search-product2')

        searchProduct.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        console.log(searchString)
         
            let filteredProducts = data.filter(product => { 
                return product.productName.toLowerCase().includes(searchString) 
            })

            if (searchString.length == 0) {
                filteredProducts = []
                displayProductsList(filteredProducts)
            }
            console.log(filteredProducts)
            displayProductsList(filteredProducts)
      
            })
}


    //Display products
const displayProducts = document.querySelector('#search-list')

console.log(displayProducts)
const displayProductsList = (products) => {
    let productList = `
    ${products.map(item =>
        `          
                <li class="search-menu-item">
                    <a class="search-menu-element" target="_blank" href="${item.productID}">
                        <span><img class="search-item-image"  width="30" height="37"  src="/${item.productImage}"></span>
                        <span class="search-item-title">${item.productName}</span>
                        <span class="search-item-price">${item.productPriceFormated}</span>
                    </a>
                </li>
        `
    ).join('')}
`
//console.log(products.products)
displayProducts.innerHTML = `<ul class="search-menu">${productList}
                            </ul>`
}

