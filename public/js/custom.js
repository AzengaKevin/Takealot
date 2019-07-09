$(document).ready(function () {
    $('body').delegate('.category', 'click', event => {
        alert("This is a category")
        window.location.redirect("products.html")
        console.log(event)
    })
})


const db = firebase.firestore()

db.collection("products")
    .orderBy("timestamp", "desc")
    .limit(6)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(doc => {
            console.log(doc.data())
            appendAdvert(doc.data())
        });
    });

function appendAdvert(advert) {
    $("#newly-added-products").append(
        `<div class="mdl-cell mdl-cell--2-col">
        <div class="card bg-dark text-white">
          <img src="${advert.image}" class="card-img" alt="" width="200" height="128">
          <div class="card-img-overlay">
            <p class="card-text">${advert.name}</p>
            <p class="card-text">KES ${advert.cost}</p>
          </div>
        </div>
      </div>`
    )
}