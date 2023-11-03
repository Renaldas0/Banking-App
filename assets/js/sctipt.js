'use strict'

const now = new Date();

const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = now.getFullYear();
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const formattedDateTime = `As of... ${hours}:${minutes} (${day}/${month}/${year})`;


const app = document.querySelector('.app');
const welcomeMsg = document.querySelector('.heading');
const loginInputUser = document.querySelector('.login_input_user');
const loginInputPin = document.querySelector('.login_input_pin');
const loginBtn = document.querySelector('.login_btn');

const balanceDate = document.querySelector('.balance_date');
const balanceAmount = document.querySelector('.balance_amount');

const transactionContainer = document.querySelector('.transaction_container');
const transactionType = document.querySelector('.transaction_type');
const transactionDate = document.querySelector('.transaction_date');
const transactionAmount = document.querySelector('.transaction_amount');

const summaryAmountIn = document.querySelector('.summary_amount_in');
const summaryAmountOut = document.querySelector('.summary_amount_out');
const summaryAmountInterest = document.querySelector('.summary_amount_interest');

const formInputTo = document.querySelector('.form_input_to');
const formInputAmount = document.querySelector('.form_input_amount');
const formBtnTransfer = document.querySelector('.form_btn_transfer');

const formInputLoanAmount = document.querySelector('.form_input_loan_amount');
const formBtnLoan = document.querySelector('.form_btn_loan');

const formCloseUser = document.querySelector('.form_close_user');
const formClosePin = document.querySelector('.form_close_pin');
const formBtnClose = document.querySelector('.form_btn_close');
const sortBtn = document.querySelector('.sort');

const account1 = {
    name: 'Renaldas Bendikas',
    currency: '€',
    pin: 1111,
    interestRate: 1.2,
    transactions: [1000, -260, 2560, -400, 100, 250, -50, -45, 2400],
    transactionDates: (8)['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};
const account2 = {
    name: 'Dwayne Johnson',
    currency: '$',
    pin: 2222,
    interestRate: 1.8,
    transactions: [1000, -260, 2560, -400, -50, -45, 2400],
    transactionDates: (8)['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};
const account3 = {
    name: 'Aurelia Wes',
    currency: '€',
    pin: 3333,
    interestRate: .8,
    transactions: [-260, 250, -400, 100, 250, -50, -345, 800],
    transactionDates: (8)['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};
const account4 = {
    name: 'Denis James Stewart',
    currency: '$',
    pin: 4444,
    interestRate: 1.7,
    transactions: [2000, -460, 560, -100, 370, 150, -150, -425, 2400],
    transactionDates: (8)['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};

const accounts = [account1, account2, account3, account4];

const createUsernames = function (accs) {
    accs.forEach(acc => acc.username = acc.name
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join(''));
};

createUsernames(accounts);

const displayTransactions = function (transactions, sort = false) {
    transactionContainer.innerHTML = '';

    const tra = sort ? transactions.slice().sort((a, b) => a - b) : transactions;

    tra.forEach(function (tra, i) {
        const type = tra > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="transaction">
                <p class="transaction_type transaction_type_${type}">${i + 1} ${type}</p>
                <p class="transaction_date">22/12/2023</p>
                <p class="transaction_amount">${currentAccount.currency} ${tra}</p>
        </div>`;

        transactionContainer.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function (account) {
    account.balance = account.transactions.reduce((acc, curr) => acc + curr, 0);
    balanceAmount.textContent = `${currentAccount.currency} ${account.balance}`;
};

const calcDisplaySummary = function (acc) {
    const incomes = acc.transactions
        .filter(curr => curr > 0)
        .reduce((acc, curr) => acc + curr, 0);
    summaryAmountIn.textContent = `${currentAccount.currency} ${incomes}`;

    const expenses = acc.transactions
        .filter(curr => curr < 0)
        .reduce((acc, curr) => acc + curr, 0);
    summaryAmountOut.textContent = `${currentAccount.currency} ${Math.abs(expenses)}`;

    const interest = acc.transactions
        .filter(tra => tra > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            return int >= 1;
        })
        .reduce((acc, curr) => acc + curr, 0);
    summaryAmountInterest.textContent = `${currentAccount.currency} ${interest}`;
}

const updateUI = function (acc) {
    // Display transactions
    displayTransactions(acc.transactions);

    // Display Balance
    calcDisplayBalance(acc);

    // Display Summary
    calcDisplaySummary(acc);
}

// Event Handlers
let currentAccount;

const authenticateUser = function (event) {
    event.preventDefault();

    // Find the account with the entered username
    currentAccount = accounts.find(acc => acc.username === loginInputUser.value);

    if (currentAccount?.pin === Number(loginInputPin.value)) {
        // Display UI and welcome message
        welcomeMsg.textContent = `Welcome back, ${currentAccount.name.split(' ')[0]}!`;
        balanceDate.textContent = formattedDateTime;
        app.style.opacity = '100';

        // Clear input fields
        loginInputUser.value = loginInputPin.value = '';
        loginInputPin.blur();

        updateUI(currentAccount);
    } else {
        alert('Incorrect details, account not found. Please try again')
    }
}
loginBtn.addEventListener('click', authenticateUser);

const transferMoney = function (event) {
    event.preventDefault();

    const amountToTransfer = Number(formInputAmount.value);
    const receiverAcc = accounts
        .find(acc => acc.username === formInputTo.value);

    if (amountToTransfer > 0 &&
        receiverAcc &&
        amountToTransfer <= currentAccount.balance &&
        receiverAcc?.username !== currentAccount.username) {

        // Performing the Transfer
        currentAccount.transactions.push(-amountToTransfer);
        receiverAcc.transactions.push(amountToTransfer);

        updateUI(currentAccount);
    };
    formInputTo.value = formInputAmount.value = '';
    formInputAmount.blur();
};
formBtnTransfer.addEventListener('click', transferMoney);

const requestLoan = function (event) {
    event.preventDefault();

    const loanAmount = Number(formInputLoanAmount.value);
    if (loanAmount > 0 && loanAmount <= currentAccount.balance * 10) {
        currentAccount.transactions.push(loanAmount);
        alert('Loan Request approved and money has been transferred successfully.');
        updateUI(currentAccount);
    } else if (loanAmount > currentAccount.balance * 10) {
        alert('You need at least 10% of the requested amount in your account.')
    }
    formInputLoanAmount.value = '';
    formInputLoanAmount.blur();
}

formBtnLoan.addEventListener('click', requestLoan);

const closeAcc = function (event) {
    event.preventDefault();

    if (currentAccount.username === formCloseUser.value && currentAccount.pin === Number(formClosePin.value)) {

        const index = accounts.findIndex(acc => acc.username === currentAccount.username);

        // Delete the account from accounts array
        accounts.splice(index, 1);
        app.style.opacity = '0';
        // landingPage.style.opacity = '100';
        welcomeMsg.textContent = 'Login to start banking';
    };
    formCloseUser.value = formClosePin.value = '';
    formClosePin.blur();
};

formBtnClose.addEventListener('click', closeAcc);

let sorted = false;

sortBtn.addEventListener('click', function (event) {
    event.preventDefault();
    displayTransactions(currentAccount.transactions, !sorted);
    sorted = !sorted;
});