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
    transactionService.findByUser(user)
        .then(transactions=> {
            hideLoading();
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
        const li = createTransactionListItem(transaction);

        li.appendChild(createEditButton(transaction));
        li.appendChild(createDeleteButton(transaction));

        li.appendChild(createParagraph(formatDate(transaction.date)));
        li.appendChild(createParagraph(formatMoney(transaction.money)));
        li.appendChild(createParagraph(transaction.type));

        if (transaction.description) {
            li.appendChild(createParagraph(transaction.description));
        }

        orderedList.appendChild(li);
    });
}

function createTransactionListItem(transaction) {
    const li = document.createElement('li');
    // adding type (if it's income or expense)
    li.classList.add(transaction.type);
    li.id = transaction.uid;

    return li;
}

function createEditButton(transaction) {
    // Create edit button
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-pencil"></i>';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => {
        window.location.href = "../transaction/transaction.html?uid=" + transaction.uid;
    })

    return editButton;
}

function createDeleteButton(transaction) {
    // create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        askRemoveTransaction(transaction);
    })

    return deleteButton;
}

function createParagraph(value) {
    const element = document.createElement('p');
    element.innerHTML = value;

    return element;
}

function askRemoveTransaction(transaction) {
    const shouldRemove = confirm('Would you like to DELETE this transaction?');
    if (shouldRemove) {
        removeTransaction(transaction);
    }
}

function removeTransaction(transaction) {
    showLoading();

    transactionService.remove(transaction)
        .then(() => {
            hideLoading();
            document.getElementById(transaction.uid).remove();
        })
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
    // .toFixed to specify the quantity of digits
    // return `${money.currency} ${money.value.toFixed(2)}`
    return `${money.currency} ${money.value.toFixed(2)}`
}

