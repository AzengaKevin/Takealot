db.collection("products")
    .onSnapshot(querySnapshot => {
        var products = [];
        querySnapshot.forEach(function (doc) {
            products.push(doc.data())

            let product = doc.data()

            console.log(doc)

            db.collection("users").doc(product.user).get()
                .then(doc => {
                    if (doc.exists) {
                        addUserToDOM(doc.data().name, product)
                        console.log("Document data:", doc.data());
                    } else {
                        addUserToDOM("Username", product)
                        console.log("No such document!");
                    }
                })
                .catch(err => {
                    console.log(err)
                    addUserToDOM("Username", product)
                })



        });


    });

function addUserToDOM(owner, product) {
    $("#products-display").append(
        `<div class="col-md-4">
        <div class="card mb-4 shadow-sm">
            <img src="${product.image}" alt="" srcset="" width="100%" height="256">
            <div class="card-body">
                <p class="card-text"><strong>Name: </strong> ${product.name}</p>
                <p class="card-text"><strong>Seller: </strong>${owner}</p>
                <p class="card-text"><strong>Items In Stock: </strong> ${product.quantity? product.quantity : 0}</p>
                <p class="card-text"><strong>Cost: </strong> KES ${product.cost}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button"
                            class="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button"
                            class="btn btn-sm btn-outline-secondary">Edit</button>
                        <button type="button"
                            class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">
                        <div class="stars" data-stars="1">
                            <svg height="25" width="23" class="star rating"
                                data-rating="1">
                                <polygon
                                    points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                                    style="fill-rule:nonzero;" />
                            </svg>
                            <svg height="25" width="23" class="star rating"
                                data-rating="2">
                                <polygon
                                    points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                                    style="fill-rule:nonzero;" />
                            </svg>
                            <svg height="25" width="23" class="star rating"
                                data-rating="3">
                                <polygon
                                    points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                                    style="fill-rule:nonzero;" />
                            </svg>
                            <svg height="25" width="23" class="star rating"
                                data-rating="4">
                                <polygon
                                    points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                                    style="fill-rule:nonzero;" />
                            </svg>
                            <svg height="25" width="23" class="star rating"
                                data-rating="5">
                                <polygon
                                    points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                                    style="fill-rule:nonzero;" />
                            </svg>
                        </div>
                    </small>
                </div>
            </div>
        </div>
    </div>
        `
    )

}