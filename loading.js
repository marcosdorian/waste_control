function showLoading() {
    // it is creating a div and making it part of body in the html
    // only for this function
    // it is not part of the index.html, it will be created when...
    // ... the page is loading
    const div = document.createElement("div");
    div.classList.add("loading", "centralize");

    const label = document.createElement("label");
    label.innerText = "Loading...";

    div.appendChild(label);

    document.body.appendChild(div)
}

function hideLoading() {
    // there will be more than one class with this name
    // it will show a list of all of them
    const loadings = document.getElementsByClassName("loading");
    // if there are more than one, remove the first
    if (loadings.length) {
        loadings[0].remove();
    }
}