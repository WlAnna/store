console.log('sidebar-menu.js is here')

function openMobileMenu () {
    const openBtn = document.getElementById("openBtn")
    const closeBtn = document.getElementById("closeBtn")
    
    openBtn.addEventListener('click', () => {
        document.getElementById("mySidepanel").style.width = "400px";
    })
    
    closeBtn.addEventListener('click', () => {
        document.getElementById("mySidepanel").style.width = "0";
    })    
}

openMobileMenu ()