'use strict'

const app = document.querySelector('.app');
const loginInputUser = document.querySelector('.login_input_user');
const loginInputPin = document.querySelector('.login_input_pin');
const loginBtn = document.querySelector('.login_btn');

const balanceDate = document.querySelector('.balance_date');
const balanceAmount = document.querySelector('.balance_amount');

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
const formBtnLoan = document.querySelector('.');

const formCloseUser = document.querySelector('.form_close_user');
const formClosePin = document.querySelector('.form_close_pin');
const formBtnClose = document.querySelector('.form_btn_close');

const account1 = {
    name: 'Renaldas Bendikas',
    currency: EUR,
    pin: 1111,
    transactions: [1000, -260, 2560, -400, 100, 250, -50, -45, 2400],
    transactionDates: (8)['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};
const account2 = {
    name: 'Renaldas Bendikas',
    currency: EUR,
    pin: 1111,
    transactions: [1000, -260, 2560, -400, 100, 250, -50, -45, 2400],
    transactionDates: (8)['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};
const account3 = {
    name: 'Renaldas Bendikas',
    currency: EUR,
    pin: 1111,
    transactions: [1000, -260, 2560, -400, 100, 250, -50, -45, 2400],
    transactionDates: (8)['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};
const account4 = {
    name: 'Renaldas Bendikas',
    currency: EUR,
    pin: 1111,
    transactions: [1000, -260, 2560, -400, 100, 250, -50, -45, 2400],
    transactionDates: (8)['2019-01-28T09:15:04.904Z', '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z', '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z', '2020-03-12T10:51:36.790Z'],
};

const accounts = [account1, account2, account3, account4];
