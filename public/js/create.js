// Uploading an Image

var selectedFile

$('#product-image-input').on('change', function (event) {
    $("#upload-btn").show()
    $('#product-image-input').hide()

    selectedFile = event.target.files[0]
})


function uploadImage(event) {
    // Adding product details to firestore
    const storage = firebase.storage()

    const storageRef = storage.ref(`products/${selectedFile.name}`)

    const uploadTask = storageRef.put(selectedFile)

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        console.error(error);

    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);

            $('#product-image').attr('src', downloadURL)
            $('#product-image-name').val(downloadURL)
            $("#upload-btn").hide()

        });
    });


}

function addProduct(event) {
    const name = $('#product-name').val()
    const user =  firebase.auth().currentUser !== null ? firebase.auth().currentUser.uid : "No User"
    const category = $('#product-category').val()
    const image = $('#product-image-name').val()
    const description = $('#product-description').val()
    const quantity = $('#product-quantity').val()
    const cost = $('#product-cost').val()

    const product = {
        name,
        user,
        category,
        image,
        description,
        quantity,
        cost
    }


    const db = firebase.firestore()

    db.collection("products").add(product)
        .then(docRef => {
            alert("Product Uploaded succefully")
            console.log(docRef.id)
        })
        .catch(err => {
            console.log(err)
        })
}