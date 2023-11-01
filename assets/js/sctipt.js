'use strict'

const app = document.querySelector('.app');
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

const account1 = {
    name: 'Renaldas Bendikas',
    currency: 'EUR',
    pin: 1111,
    transactions: [1000, -260, 2560, -400, 100, 250, -50, -45, 2400],
    transactionDates: (8)['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};
const account2 = {
    name: 'Dwayne Johnson',
    currency: 'USD',
    pin: 2222,
    transactions: [1000, -260, 2560, -400, -50, -45, 2400],
    transactionDates: (8)['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};
const account3 = {
    name: 'Aurelia Wes',
    currency: 'EUR',
    pin: 3333,
    transactions: [-260, 250, -400, 100, 250, -50, -345, 800],
    transactionDates: (8)['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};
const account4 = {
    name: 'Denis James Stewart',
    currency: 'AUD',
    pin: 4444,
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
console.log(accounts);

const displayTransactions = function (transactions) {
    transactionContainer.innerHTML = '';

    transactions.forEach(function (tra, i) {
        const type = tra > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="transaction">
                <p class="transaction_type transaction_type_${type}">${i + 1} ${type}</p>
                <p class="transaction_date">22/12/2023</p>
                <p class="transaction_amount">€ ${tra}</p>
        </div>`;

        transactionContainer.insertAdjacentHTML('afterbegin', html);
    });
};

displayTransactions(account1.transactions);

const calcDisplayBalance = function (transactions) {
    const balance = transactions.reduce((acc, curr) => acc + curr, 0);
    balanceAmount.textContent = `€ ${balance}`;
};
calcDisplayBalance(account1.transactions);

const calcDisplaySummary = function (transactions) {
    const incomes = transactions
        .filter(curr => curr > 0)
        .reduce((acc, curr) => acc + curr, 0);
    summaryAmountIn.textContent = `€ ${incomes}`;

    const expenses = transactions
        .filter(curr => curr < 0)
        .reduce((acc, curr) => acc + curr, 0);
    summaryAmountOut.textContent = `€ ${Math.abs(expenses)}`;

    const interest = transactions
        .filter(tra => tra > 0)
        .map(deposit => deposit * 1.2 / 100)
        .filter((int, i, arr) => {
            console.log(arr);
            return int >= 1;
        })
        .reduce((acc, curr) => acc + curr, 0);
    summaryAmountInterest.textContent = `€ ${interest}`;
}

calcDisplaySummary(account1.transactions);