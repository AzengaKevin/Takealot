window.addEventListener('DOMContentLoaded', event => {
    const app = firebase.app()
    console.log(app)
});

const loginDialog = document.querySelector('#login-dialog')
if (!loginDialog.showModal) dialogPolyfill.registerDialog(loginDialog);

const registerDialog = document.querySelector('#register-dialog')
if (!registerDialog.showModal) dialogPolyfill.registerDialog(registerDialog);



firebase.auth().onAuthStateChanged(user => {
    if (user) {
        $('.login-cover').hide()
        loginDialog.close()

    } else {
        $('.login-cover').show()
        loginDialog.showModal()
    }
});

$('#login-btn').on('click', event => {

    const email = $('#login-email').val()
    const pwd = $('#login-pwd').val()

    // console.log(`Email: ${email} and Password: ${pwd}`)

    if (email != "" && pwd != "") {
        loginDialog.close();

        //Login User
        firebase.auth().signInWithEmailAndPassword(email, pwd)
            .catch(err => {
                $('#login-error').show().text(err.message)
                loginDialog.showModal()
                $('#login-error').slideUp(3000)
            })

    } else {
        $('#login-error').show().text("Fill in All the Fields")

        $('#login-error').fadeOut(3000)
    }
})

$('#register-btn').on('click', event => {
    let email = $('#register-email').val()
    let pwd = $('#register-pwd').val()
    console.log(`Email: ${email}, Password: ${pwd}`)

    if (email != "" && pwd != "") {
        firebase.auth().createUserWithEmailAndPassword(email, pwd)
            .catch(function (err) {

                $('#register-error').show().text(`${err.message}`)
                registerDialog.showModal()
                $('#register-error').fadeOut(3000)
            });
    } else {
        $('#register-error').show().text("Fill in All the Fields")
        $('#register-error').fadeOut(3000)
    }
})


$('#signout').on('click', event => {
    firebase.auth().signOut().then(function () {
        $('.login-cover').show()
    }).catch(function (error) {

    });
})


$('#register').on('click', event => {
    loginDialog.close()
    registerDialog.showModal()
})

$('#login').on('click', event => {
    registerDialog.close()
    loginDialog.showModal()
})

const getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

const storage = firebase.storage()

const storageRef = storage.ref()