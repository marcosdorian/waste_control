// when the user logs out, they go to the main page
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert("Error while logging out");
    })
}