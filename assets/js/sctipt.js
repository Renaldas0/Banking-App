'use strict'


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
    transactions: [1000, -260, 2560, -400, 100, 250, -50, -45],
    transactionDates: ['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2023-11-27T17:01:17.194Z', '2023-12-02T23:36:17.929Z',
        '2023-12-05T21:31:17.178Z', '2023-12-17T07:42:02.383Z',
        '2023-12-19T14:11:59.604Z', '2023-12-20T10:51:36.790Z'],
};
const account2 = {
    name: 'Dwayne Johnson',
    currency: '$',
    pin: 2222,
    interestRate: 1.8,
    transactions: [1000, -260, 2560, -400, -50, -45, 2400],
    transactionDates: ['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z'],
};
const account3 = {
    name: 'Aurelia Wes',
    currency: '€',
    pin: 3333,
    interestRate: .8,
    transactions: [-260, 250, -400, 100, 250, -50, -345, 800],
    transactionDates: ['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};
const account4 = {
    name: 'Denis James Stewart',
    currency: '$',
    pin: 4444,
    interestRate: 1.7,
    transactions: [2000, -460, 560, -100, 370, 150, -425, 2400],
    transactionDates: ['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z'],
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

function formatTransactionDate(date) {

    function calcDaysPassed(date1, date2) {
        return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    }

    const daysPassed = calcDaysPassed(new Date(), date);
    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const displayTransactions = function (account, sort = false) {
    transactionContainer.innerHTML = '';

    const movs = sort
        ? account.transactions.slice().sort((a, b) => a - b)
        : account.transactions;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const date = new Date(account.transactionDates[i]);
        const displayDate = formatTransactionDate(date);

        const html = `
        <div class="transaction">
                <p class="transaction_type transaction_type_${type}">${i + 1} ${type}</p>
                <p class="transaction_date">${displayDate}</p>
                <p class="transaction_amount">${currentAccount.currency} ${mov.toFixed(2)}</p>
        </div>`;

        transactionContainer.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function (account) {
    account.balance = account.transactions.reduce((acc, curr) => acc + curr, 0);
    balanceAmount.textContent = `${currentAccount.currency} ${account.balance.toFixed(2)}`;
};

const calcDisplaySummary = function (acc) {
    const incomes = acc.transactions
        .filter(curr => curr > 0)
        .reduce((acc, curr) => acc + curr, 0);
    summaryAmountIn.textContent = `${currentAccount.currency} ${incomes.toFixed(2)}`;

    const expenses = acc.transactions
        .filter(curr => curr < 0)
        .reduce((acc, curr) => acc + curr, 0);
    summaryAmountOut.textContent = `${currentAccount.currency} ${Math.abs(expenses).toFixed(2)}`;

    const interest = acc.transactions
        .filter(tra => tra > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            return int >= 1;
        })
        .reduce((acc, curr) => acc + curr, 0);
    summaryAmountInterest.textContent = `${currentAccount.currency} ${interest.toFixed(2)}`;
}

const updateUI = function (acc) {
    // Display transactions
    displayTransactions(acc);

    // Display Balance
    calcDisplayBalance(acc);

    // Display Summary
    calcDisplaySummary(acc);
}

// Event Handlers
let currentAccount;

const authenticateUser = function (event) {
    event.preventDefault();

    const now = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
    }
    const formattedDateTime = new Intl.DateTimeFormat('en-GB', options).format(now);

    // Find the account with the entered username
    currentAccount = accounts.find(acc => acc.username === loginInputUser.value);

    if (currentAccount?.pin === Number(loginInputPin.value)) {
        // Display UI and welcome message
        welcomeMsg.textContent = `Welcome back, ${currentAccount.name.split(' ')[0]}!`;
        balanceDate.textContent = `As of ${formattedDateTime}`;
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

        // Add transfer date
        currentAccount.transactionDates.push(new Date().toISOString());
        receiverAcc.transactionDates.push(new Date().toISOString());
        updateUI(currentAccount);
    };
    formInputTo.value = formInputAmount.value = '';
    formInputAmount.blur();
};
formBtnTransfer.addEventListener('click', transferMoney);

const requestLoan = function (event) {
    event.preventDefault();

    const loanAmount = Math.floor(formInputLoanAmount.value);

    if (loanAmount > 0 && loanAmount <= currentAccount.balance * 10) {
        currentAccount.transactions.push(loanAmount);
        alert('Loan Request approved and money has been transferred successfully.');

        // Add loan date
        currentAccount.transactionDates.push(new Date().toISOString());

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
    displayTransactions(currentAccount, !sorted);
    sorted = !sorted;
});