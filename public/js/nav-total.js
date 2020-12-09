console.log('nav-total.js in nav')

function totalFromStorage (arrStored) {
    let storageEntries = arrStored
    console.log(storageEntries)
    let sumTotal = 0
    if ( storageEntries != null) {
        storageEntries.forEach(entry => {
            let price = entry.price.replace('£','')
            let qty = parseInt(entry.quantity)
            let sumStorage = qty*price
            sumTotal += sumStorage
          })
          console.log(sumTotal)
          localStorage.setItem("cartTotal", JSON.stringify(sumTotal))
          const navTotalProduct = document.getElementsByClassName('header-total')[0]
          navTotalProduct.innerHTML = `£ ${sumTotal}`
    }

}

function addItemtoLocalStorage(entryObj, replace=false ) {
    console.log(replace)
    let entry = entryObj
    let allEntries = JSON.parse(localStorage.getItem("allEntries"))
  
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

        numSum = ''

        if (replace == true) {
            numSum = Math.ceil(entryObj.quantity)
        } else {
            numSum =  num + numObj
        }

        console.log(numSum)

        let numSumtoString = numSum.toString()
        console.log(typeof numSumtoString)
        console.log(numSum)
        allEntries[i].quantity = numSumtoString
        localStorage.setItem("allEntries", JSON.stringify(allEntries))
        console.log(allEntries)
          found = true
          return
      }
    }
  
    allEntries.push(entry)
    localStorage.setItem("allEntries", JSON.stringify(allEntries))
}

function removeFromLocalStorage (itemId) {
    let id = itemId
    var allEntries = JSON.parse(localStorage.getItem("allEntries"))
    console.log(allEntries)

    for ( i =0; i < allEntries.length; i++) {
        console.log(allEntries[i].id) 
        if ( allEntries[i].id == id ) {
        allEntries.splice(i, 1)
        }
    }
    localStorage.setItem("allEntries", JSON.stringify(allEntries))
}
    