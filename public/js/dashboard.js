window.addEventListener('DOMContentLoaded', event => {
    const app = firebase.app()
    console.log(app)
});

$("#go-to-edit-profile-btn").on('click', event => {
    $("#other-details").hide()
    $("#edit-profile").show()
})

var selectedFile



$("#upolad-details").on('click', event => {
    $("#other-details").show()
    $("#edit-profile").hide()
})

// Displaying And Editing User Profile

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $("#avatar").attr("src", user.photoURL? user.photoURL : "https://picsum.photos/256")
    } else {}
});

//Upload Image

$("#file").on('change', event => {

    $("#file").hide()
    $("#change-image-btn").show()

    selectedFile = event.target.files[0]
})

function uploadAVatar() {
    // Adding product details to firestore
    const storage = firebase.storage()

    const storageRef = storage.ref(`avatars/${selectedFile.name}`)

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

        let currUser = firebase.auth().currentUser
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);

            currUser.updateProfile({
                photoURL: downloadURL
            }).then(function () {
                console.log(`Profile picture updated successfully`)
            }).catch(function (error) {
                console.log(`Profile picture update failed`)
            });

        });
    });


}

function uploadDetails(event) {
    let currentUser = firebase.auth().currUser

    let newName = $('#new-name').val()

    currUser.updateProfile({
        displayName: newName
    }).then(function () {
        console.log(`Display name updated successfully`)
    }).catch(function (error) {
        console.log(`Display name update failed`)
    });

}