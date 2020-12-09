console.log('nav-other.js is here')




  const nav = document.getElementById('main-nav')
  console.log(nav)
  const navLi = nav.getElementsByTagName('li')
  console.log(navLi)
  var arr = [...navLi];
  console.log(arr)
  
  let arrCat = []
  let newArr = []
  
  for(var i=0; i<=arr.length; i++) {
    //console.log(arr[i].innerHTML)
    // arr[i].addEventListener('click', function () {
    //   newArr.push(this.innerHTML);
    // })
    }
  
      
     console.log(newArr)
     let targetCategory
     console.log(targetCategory)
  
    arr.forEach(li => {
      li.addEventListener('click', (e) => {
         targetCategory = e.target.innerHTML
        arrCat.push(targetCategory)
        console.log(targetCategory)
          // return targetCategory
          //callCategory(targetCategory)
          localStorage.setItem("categoryInsStorage", JSON.stringify(e.target.innerHTML))
  
        window.location.assign("/products")
  
      }
  
        
   
      )
    }, false);
  
    console.log(arrCat)
    console.log(  console.log(JSON.parse(localStorage.getItem("categoryInsStorage"))))
/////////////////////////////////

    


  function categoryMobileClicked () {
    const nav2 = document.getElementById('main-nav2')
  let navLi2 = ''
  console.log(navLi2)
  var arr2 = [...navLi2];
  console.log(arr2)

  if ( nav2 != null) {
    navLi2 = nav2.getElementsByTagName('li')
  } else {
    navLi2 = document.getElementsByTagName('li')
  }

  
  arr2.forEach(li => {
    li.addEventListener('click', (e) => {
       targetCategory2 = e.target.innerHTML
      arrCat.push(targetCategory2)
      console.log(targetCategory2)
        // return targetCategory
        //callCategory(targetCategory)

    
        localStorage.setItem("categoryInsStorage", JSON.stringify(e.target.innerHTML))

      window.location.assign("/products")

    }

 
    )
  }, false);

}
categoryMobileClicked() 


const nav2 = document.getElementById('main-nav2')
  const mainCat = document.getElementsByClassName('main-cat')
  console.log(mainCat)
  let arrMainCat = [...mainCat];
  console.log(arrMainCat)

  
  let arrCat2 = []
  let newArr2 = []
  
  for(var i=0; i<=arr.length; i++) {
    //console.log(arr[i].innerHTML)
    // arr[i].addEventListener('click', function () {
    //   newArr.push(this.innerHTML);
    // })
    }
  
      
     console.log(newArr2)
     let targetCategory2
     console.log(targetCategory2)
  
    arrMainCat.forEach(li => {
      li.addEventListener('click', (e) => {
         targetCategory2 = e.target.innerHTML
        arrCat.push(targetCategory2)
        console.log(targetCategory2)
          // return targetCategory
          //callCategory(targetCategory)


          let list = 'x'

          if (targetCategory2 == "Clothes" ) {
              const arr = ["Clothes", "Blouses", "Shorts", "Skirts", "Dresses", "Swimming Suits"]
               list = `
              ${arr.map(el =>
                      `
                      <li class="uppercase"><a href="#" >${el}</a></li>
                      `
              ).join('')}
              `
              // showSizeFilter(products, clickedItem)
              // getProductsBySize (products, clickedItem)
     
          } else if (targetCategory2 == "Accessories" ) {
              const arr = ["Jewelry", "Rings", "Necklace", "Earings", "Bracelets", "Collection Classic"]
      
               list = `
              ${arr.map(el =>
                      `
                      <li class="uppercase"><a href="#" >${el}</a></li>
                      `
              ).join('')}
              `
              //hideSizeFilter()
         
          } else if (targetCategory2 == "All Products") {
          
              const arr = ["Clothes", "Accessories", "SPA", "Home and Garden"]
      
              list = `
             ${arr.map(el =>
                     `
                     <li class="uppercase"><a href="#" >${el}</a></li>
                     `
             ).join('')}
             `
             //hideSizeFilter()
       
          } else if (targetCategory2 == "SPA") {
              const arr = ["Soaps", "Body Care", "Gifts"]
      
              list = `
             ${arr.map(el =>
                     `
                     <li class="uppercase"><a href="#" >${el}</a></li>
                     `
             ).join('')}
             `
            // hideSizeFilter()
          } else if (targetCategory2 == "Home and Garden") {
              const arr = ["Accessories", "Bedding", "Posters", "Candles", "Books"]
      
              list = `
             ${arr.map(el =>
                     `
                     <li class="uppercase"><a href="#" >${el}</a></li>
                     `
             ).join('')}
             `
            // hideSizeFilter()
             //categoryClicked(products)
            
          }
           //categoryClicked(products)
          document.getElementById('main-nav2').innerHTML = `<ul >
          <li ><a href="#" class=" uppercase">All Products</a></li>
          <li ><a href="#" class=" uppercase">New Arrivals</a></li>
          ${list}
          </ul>`  
          categoryMobileClicked () 
          //filteredByCategory(products, clickedItem)
          // categoryClicked(products)




              //   localStorage.setItem("categoryInsStorage", JSON.stringify(e.target.innerHTML))
  
        // window.location.assign("/products")
  
      }
  
        
   
      )
    }, false);


    categoryMobileClicked() 