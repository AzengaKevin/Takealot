
$(document).ready(function(){
    $('body').delegate('.category', 'click', event => {
        alert("This is a category")
        window.location.redirect("products.html")
        console.log(event)
    })
})

