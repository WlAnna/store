console.log('This is filters-size.js front end')



function  showSizeFilter(products, clickedItem) {
    list = 
            `
            <div class ="category">
            <input type="checkbox" class="checks" name="checkbox" id="S"  value="S">
            <label for="S">S</label>
            </div>
            <div class ="category">
            <input type="checkbox" class="checks" name="checkbox" id="M"  value="M">
            <label for="M">M</label>
            </div>
            <div class ="category">
            <input type="checkbox" class="checks" name="checkbox" id="L"  value="L">
            <label for="L">L</label>
            </div>
            `
    catSize.innerHTML = list
   getProductsBySize (products, clickedItem)
}

function hideSizeFilter () {
    catSize.innerHTML = ''
}


function getProductsBySize (products, clickedItem) {
    console.log(clickedItem)

    //All products in clothes category
    let arr =[]

    products.map(product => {
        if(product.productCategory0 == clickedItem || product.productCategory1 == clickedItem || product.productCategory2 == clickedItem ) {
            arr.push(product)
        }
    })
    console.log(arr)

    //All checkboxes checked
    const checkboxes = catSize.querySelectorAll('input[type="checkbox"]')
    console.log(checkboxes)

    checkboxes.forEach(checkbox => checkbox.addEventListener('click', (e) =>{

        //Add class cross when checkbox is checked and remove .cross when checkbox is unchecked
        const clikedItem = e.target
        if (e.target.checked) {
            clikedItem.className += " cross"
            console.log(clikedItem)
          
        } else {
            //console.log('not checked')
            let tdclass = clikedItem.className.split( " ")
            let ind = tdclass.indexOf("cross")
            tdclass.splice(ind, 1).join(" ")
            clikedItem.className = tdclass
            console.log(clikedItem)
            displayProductsonScreen(arr)
           // clikedItem.className = "cross"
        }
        
    //Fetch all elements with .cross class - create node list
    let checkboxesClasses = document.querySelectorAll(".cross")
    console.log(checkboxesClasses.length)
    let checkboxesChecked = checkboxesClasses.length == 0 ? false : true
    console.log(checkboxesChecked)

    // Change node list to array
    checkboxesClasses = Array.from(checkboxesClasses)
    console.log(checkboxesClasses)
  
    //All clicked sizes
    let inputArr = checkboxesClasses.map((input) => {
        return input.value
    })
    console.log(inputArr)
    filterFn(inputArr, arr, checkboxesChecked)
    }))
}

const filterFn = (arrBy, arrPro, checkboxesChecked) => {
    let prod = []
   // console.log(arrBy, arrPro)

    arrBy.map((word) => {
        return arrPro.map((product) => {
            if( word == "S" && product.size[0].S != "null" ) {
            prod.push(product)
        } else if( word == "M" && product.size[1].M != "null" ) {
        prod.push(product)
        } else if( word == "L" && product.size[2].L != "null" ) {
        prod.push(product)
    } 
    })        
})  
   
   let removedDup =  removeDuplicates(prod)
    if (prod.length == 0 && checkboxesChecked == true) {
        displayProducts.innerHTML = `<p>No Products</p>`
    } else if ( checkboxesChecked == false) {
        
    } else {
        displayProductsonScreen(removedDup)
    }
}


