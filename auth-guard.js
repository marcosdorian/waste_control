// it protects the system against non-logged users
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "../../index.html";
    }
})
