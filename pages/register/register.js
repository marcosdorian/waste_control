// it makes the user keeps their account logged
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "pages/home/home.html";
    }
})

function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable()
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch()
    toggleRegisterButtonDisable()
}

function onChangeConfirmPassword() {
    validatePasswordsMatch()
    toggleRegisterButtonDisable()

}

function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        hideLoading();
        window.location.href = "../../pages/home/home.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email is already in use"
    }
    return error.message;
}

// this function will validate the passwords given
// it is used so you can put the password either in the confirm or in the password first.
function validatePasswordsMatch() {
    const confirmPassword = form.confirmPassword().value;
    const password = form.password().value;
    form.confirmPasswordDoenstMatchError().style.display = confirmPassword == password ? "none" : "block";

}

// this function must happen everytime something changes
// so it must be called in all functions
function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false
    }

    return true;
}

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoenstMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button'),
}