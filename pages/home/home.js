// when the user logs out, they go to the main page
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert("Error while logging out");
    })
}

firebase.auth().onAuthStateChanged(user => {
    if (user){
        findTransactions(user);      
    }
})

function newTransaction() {
    window.location.href = "../transaction/transaction.html"
}

// it receives the transactions by each user
function findTransactions(user) {
    showLoading();
    // it gets the data from the firestore (database from firebase)
    firebase.firestore()
    // I created the collection transactions on the site of firebase
        .collection('transactions')
        .where('user.uid', '==', user.uid)
        // order the list by date from the most recent to the oldest
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            hideLoading();
            const transactions = snapshot.docs.map(doc => doc.data());
            addTransactionsToScreen(transactions);
      })
      .catch(error => {
        hideLoading();
        console.log(error);
        alert('Error while recovering transactions!!!')
      })
}

// it shows the transactions on the screen
function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions');

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        // adding type (if it's income or expense)
        li.classList.add(transaction.type);

        const date = document.createElement('p');
        date.innerHTML = formatDate(transaction.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatMoney(transaction.money);
        li.appendChild(money);

        const type = document.createElement('p');
        type.innerHTML = transaction.transactionType;
        li.appendChild(type);

        if (transaction.description) {
            const description = document.createElement('p');
            description.innerHTML = transaction.description;
            li.appendChild(description);
        }

        orderedList.appendChild(li);
    });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
    // .toFixed to specify the quantity of digits
    // return `${money.currency} ${money.value.toFixed(2)}`
    return `${money.currency} ${money.value.toFixed(2)}`
}

