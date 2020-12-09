console.log('This is filters-cat.js front end')

// const width  = window.innerWidth || document.documentElement.clientWidth || 
// document.body.clientWidth;
// const height = window.innerHeight|| document.documentElement.clientHeight|| 
// document.body.clientHeight;

// console.log(width, height);

function categoryClicked (products) {
    const data = products
    console.log(products)
    const catList = document.querySelector('#category')
    console.log(catList)
    const allList = catList.getElementsByTagName('li')
    console.log(allList)
    const arrAllList = Array.from(allList)
    console.log(arrAllList)


    console.log(  console.log(JSON.parse(localStorage.getItem("categoryInsStorage"))))
    const clickedItemStorage = JSON.parse(localStorage.getItem("categoryInsStorage"))
    console.log(clickedItemStorage)


    if ( clickedItemStorage != null ) {
        let clickedItem = clickedItemStorage
        localStorage.removeItem("categoryInsStorage")

  
        console.log(clickedItem)
        getProductsBySize (products, clickedItem)

        //Display category title above products images
        let categoryTitle = document.getElementById('category-title')
        console.log(categoryTitle)
        categoryTitle.innerHTML = clickedItem

        //Remove cross when choose different category
        let checkboxesClasses = document.querySelectorAll(".cross")
        console.log(checkboxesClasses)
        checkboxesClasses = Array.from(checkboxesClasses)
        console.log(checkboxesClasses)
        let inputArr = checkboxesClasses.map((input) => {
            input.checked = false
        })

        // Display categories list in sidebar and products images
       if (clickedItem.toLowerCase() == "new arrivals") {
            displayProductsonScreen(data)
            console.log("New Arrivals")
        } else {
            if(clickedItem == "Clothes" || clickedItem == "Accessories" || clickedItem == "SPA" || clickedItem == "Home and Garden" || clickedItem.toLowerCase() == "all products") {
                displayCategoryList(products, clickedItem)
            }

            
            const arrClothes = ["Clothes", "Blouses", "Shorts", "Skirts", "Dresses", "Swimming Suits"]
            arrClothes.forEach(el => {
                if (el == clickedItem) {
                    displayCategoryList(products, "Clothes")
                }
            })

            const arrJewelry = ["Jewelry", "Rings", "Necklace", "Earings", "Bracelets", "Collection Classic"]
            arrJewelry.forEach(el => {
                if (el == clickedItem) {
                    displayCategoryList(products, "Accessories")
                }
            })

            const arrSpa = ["Soaps", "Body Care", "Gifts"]
            arrSpa.forEach(el => {
                if (el == clickedItem) {
                    displayCategoryList(products, "SPA")
                }
            })
            
            const arrHomeAndGarden = ["Accessories", "Bedding", "Posters", "Candles", "Books"]
            arrHomeAndGarden.forEach(el => {
                if (el == clickedItem) {
                    displayCategoryList(products, "Home and Garden")
                }
            })
            
            filteredByCategory(products, clickedItem)  
        } 

    }

    
    arrAllList.forEach(item => item.addEventListener('click', (e) => {
        const clickedItem = e.target.textContent
        console.log(clickedItem)
        getProductsBySize (products, clickedItem)

        //Display category title above products images
        let categoryTitle = document.getElementById('category-title')
        console.log(categoryTitle)
        categoryTitle.innerHTML = clickedItem

        //Remove cross when choose different category
        let checkboxesClasses = document.querySelectorAll(".cross")
        console.log(checkboxesClasses)
        checkboxesClasses = Array.from(checkboxesClasses)
        console.log(checkboxesClasses)
        let inputArr = checkboxesClasses.map((input) => {
            input.checked = false
        })

        // Display categories list in sidebar and products images
       if (clickedItem.toLowerCase() == "new arrivals") {
            displayProductsonScreen(data)
            console.log("New Arrivals")
        } else {
            if(clickedItem == "Clothes" || clickedItem == "Accessories" || clickedItem == "SPA" || clickedItem == "Home and Garden" || clickedItem.toLowerCase() == "all products") {
                displayCategoryList(products, clickedItem)
            }

            const arrClothes = ["Clothes", "Blouses", "Shorts", "Skirts", "Dresses", "Swimming Suits"]
            arrClothes.forEach(el => {
                if (el == clickedItem) {
                    displayCategoryList(products, "Clothes")
                }
            })

            const arrJewelry = ["Jewelry", "Rings", "Necklace", "Earings", "Bracelets", "Collection Classic"]
            arrJewelry.forEach(el => {
                if (el == clickedItem) {
                    displayCategoryList(products, "Jewelry")
                }
            })

            const arrSpa = ["Soaps", "Body Care", "Gifts"]
            arrSpa.forEach(el => {
                if (el == clickedItem) {
                    displayCategoryList(products, "SPA")
                }
            })
            
            const arrHomeAndGarden = ["Accessories", "Bedding", "Posters", "Candles", "Books"]
            arrHomeAndGarden.forEach(el => {
                if (el == clickedItem) {
                    displayCategoryList(products, "Home and Garden")
                }
            })

            filteredByCategory(products, clickedItem)  
        }  
    }))
   
}


function displayCategoryList (products, clickedItem) {
    let list = 'x'

    if (clickedItem == "Clothes" ) {
        const arr = ["Clothes", "Blouses", "Shorts", "Skirts", "Dresses", "Swimming Suits"]
         list = `
        ${arr.map(el =>
                `
                <li><a class="dropdown-item-cat highlight" href="#" >${el}</a></li>
                `
        ).join('')}
        `
        showSizeFilter(products, clickedItem)
        // getProductsBySize (products, clickedItem)
        
    } else if (clickedItem == "Accessories" ) {
        const arr = ["Jewelry", "Rings", "Necklace", "Earings", "Bracelets", "Collection Classic"]

         list = `
        ${arr.map(el =>
                `
                <li><a class="dropdown-item-cat highlight" href="#" >${el}</a></li>
                `
        ).join('')}
        `
        hideSizeFilter()

    } else if (clickedItem == "All Products") {
        displayProductsonScreen(products)
        const arr = ["Clothes", "Accessories", "SPA", "Home and Garden"]

        list = `
       ${arr.map(el =>
               `
               <li><a class="dropdown-item-cat highlight" href="#" >${el}</a></li>
               `
       ).join('')}
       `
       hideSizeFilter()
    } else if (clickedItem == "SPA") {
        const arr = ["Soaps", "Body Care", "Gifts"]

        list = `
       ${arr.map(el =>
               `
               <li><a class="dropdown-item-cat highlight" href="#" >${el}</a></li>
               `
       ).join('')}
       `
       hideSizeFilter()
    } else if (clickedItem == "Home and Garden") {
        const arr = ["Accessories", "Bedding", "Posters", "Candles", "Books"]

        list = `
       ${arr.map(el =>
               `
               <li><a class="dropdown-item-cat highlight" href="#" >${el}</a></li>
               `
       ).join('')}
       `
       hideSizeFilter()
       categoryClicked(products)
      
    }
     categoryClicked(products)
    document.getElementById('nav').innerHTML = `<ul class="navbar-nav-cat" id ="category">
    <li  value="All Products" class="nav-item-cat active highlight more"><a href="#" class="navbar-item-cat" >All Products</a></li>
    <li class="nav-item-cat highlight more" value="New Arrivals"><a href="#" class="navbar-item-cat">New Arrivals</a>
    ${list}
    </li>`  
    filteredByCategory(products, clickedItem)
    categoryClicked(products)
}

//Add features when clicked on All Products 
function allProductsCategoryClicked (products) {
    const data = products
    console.log(data)
  
    const allProducts = document.getElementById('allProducts')
 
    console.log(allProducts)
    allProducts.addEventListener('click', (e) => {
   
    console.log(displayProductsonScreen(data))
    displayProductsonScreen(data)
    hideSizeFilter()
    console.log('clickeds')
        const arr = ["Clothes", "Accessories", "SPA", "Home and Garden"]
    
        list = `
       ${arr.map(el =>
               `
               <li><a class="dropdown-item-cat highlight" href="#" >${el}</a></li>
               `
       ).join('')}
       `
       document.getElementById('nav').innerHTML = `<ul class="navbar-nav-cat" id ="category">
       <li  value="All Products" class="nav-item-cat active highlight more"><a href="#" class="navbar-item-cat" >All Products</a></li>
       <li class="nav-item-cat highlight more" value="New Arrivals"><a href="#" class="navbar-item-cat">New Arrivals</a>
       ${list}
       </li>`  
       
    })
    console.log(data)  
}

function filteredByCategory (products, searchItem) {
    let prod = []
 
    products.map((product) => {
        if(product.productCategory0 == searchItem || product.productCategory1 == searchItem || product.productCategory2 == searchItem ) {
            prod.push(product)         
        } else if (searchItem == "All Products") {
            prod = products
        }
    })
    displayProductsonScreen(prod)
}


//Remove duplicates
const removeDuplicates = (arr) => {
    const uniqueStockSet = new Set(arr)
    return [...uniqueStockSet]
}

const catSize = document.getElementById('size-filter')
 


