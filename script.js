'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Adeeb Aljerf',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
    '2024-03-13T09:42:57.532Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
  // currency: 'EUR',
};

const account2 = {
  owner: 'Hanan aljerf',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'ar-SY',
};

const accounts = [account1, account2];
// const btnCreate = document.querySelector('.create-btn');

// const createNewAccount = function (e) {
//   e.preventDefault();

//   const fullName = document.querySelector('.create-name').value;
//   const initialDeposit = +document.querySelector('.create-deposit').value;
//   const pin = +document.querySelector('.create-pin').value;

//   const newAccount = {
//     owner: fullName,
//     movements: [initialDeposit],
//     interestRate: 1.2,
//     pin: pin,
//     movementsDates: [new Date().toISOString()],
//     currency: 'EUR',
//     locale: navigator.language,
//   };

//   newAccount.username = fullName
//     .toLowerCase()
//     .split(' ')
//     .map(name => name[0])
//     .join('');
//   accounts.push(newAccount);

//   // Auto login
//   currentAccount = newAccount;

//   // Show UI and message
//   labelWelcome.textContent = `Welcome back, ${
//     currentAccount.owner.split(' ')[0]
//   }`;
//   containerApp.style.opacity = 100;

//   // Current date and time
//   const now = new Date();
//   const options = {
//     hour: 'numeric',
//     minute: 'numeric',
//     month: 'long',
//     year: 'numeric',
//     weekday: 'long',
//   };
//   labelDate.textContent = new Intl.DateTimeFormat(
//     currentAccount.locale,
//     options
//   ).format(now);

//   // Clear form fields
//   document.querySelector('.create-name').value = '';
//   document.querySelector('.create-deposit').value = '';
//   document.querySelector('.create-pin').value = '';

//   // Update UI
//   updateUI(currentAccount);

//   // Start timer
//   if (timer) clearInterval(timer);
//   timer = starterLogOutTimer();
// };

// btnCreate.addEventListener('click', createNewAccount);
/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//?-----------------------------------------------------------
const modal = document.querySelector('.modal');
const createAccountLink = document.querySelector('.create-account-link');
const closeModal = document.querySelector('.close-modal');
const createAccountForm = document.querySelector('.create-account-form');

//? open pop up window when creating an account
createAccountLink.addEventListener('click', function () {
  modal.classList.remove('hidden');
});
//? close pop up window when creating an account
closeModal.addEventListener('click', function () {
  modal.classList.add('hidden');
});

//? creating new account
createAccountForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const fullName = document.querySelector('.create-name').value;
  const initialDeposit = +document.querySelector('.create-deposit').value;
  const pin = +document.querySelector('.create-pin').value;

  const newAccount = {
    owner: fullName,
    movements: [initialDeposit],
    interestRate: 1.2,
    pin: pin,
    movementsDates: [new Date().toISOString()],
    currency: 'USD',
    locale: 'en-US',
    // locale: navigator.language,
  };

  newAccount.username = fullName;
  // .toLowerCase()
  // .split(' ')
  // .map(name => name[0])
  // .join('');

  accounts.push(newAccount);
  console.log(accounts);
  // Auto login
  currentAccount = newAccount;
  updateUI(currentAccount);

  // Show success and hide modal
  modal.classList.add('hidden');
  containerApp.style.opacity = 100;
  labelWelcome.textContent = `Welcome ${fullName.split(' ')[0]}`;

  // Reset timer
  if (timer) clearInterval(timer);
  timer = starterLogOutTimer();
});

/////////////////////////////////////////////////
// Functions

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

console.log(new Date().toISOString());

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'today';
  if (daysPassed === 1) return 'yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    // const date=new Date(acc.movementsDates[i]);
    // const year = date.getFullYear();
    // const month= `${date.getMonth()+1}`.padStart(2,0);
    // const day  = date.getDate();
    // const displayDate=`${day}/${month}/${year}`;
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattmov = formatCur(mov, acc.locale, acc.currency);

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattmov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCur(
    Math.abs(out),
    acc.locale,
    acc.currency
  )}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCur(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const starterLogOutTimer = function () {
  // Set time

  let time = 120;

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time

    labelTimer.textContent = `${min}:${sec}`;

    // When time is 0

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;

      labelWelcome.textContent = `Log in to get started`;
    }
    // Decrese 1s
    time--;
  };

  // Call the timer every second

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
//!--------------------------------------------------------
// Event handlers
let currentAccount, timer;

//! fake always log in
// currentAccount=account1

// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//! timer

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (!currentAccount) alert('Wrong username or password');

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // date

    const now = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      option
    ).format(now);

    // const now=new Date();
    // const year= now.getFullYear();
    // const month=now.getMonth();
    // const day= now.getDate();
    // const hour=now.getHours();
    // const min=now.getMinutes();
    // labelDate.textContent=`${day}/${month}/${year},${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Reset Timer
    if (timer) clearInterval(timer);
    timer = starterLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = starterLogOutTimer();
  } else alert('Wrong username or amount');
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount <= 0) alert('Loan amount must be positive');
  if (!currentAccount.movements.some(mov => mov >= amount * 0.1))
    alert(
      'You need at least one deposit of 10% or more of the requested loan amount'
    );

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add loan Date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset Timer
      clearInterval(timer);
      timer = starterLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//?-----------------------practic----------------------

// console.log(Math.trunc(Math.random()*6)+1);

// const randomInt=function(min,max){
// console.log(Math.trunc(Math.random()*(max-min))+min);
// }
// console.log(+(3.842).toFixed(2));

// const m=new Date(2034,1,4,1,40,2);
// console.log(m);
// console.log(m.getFullYear());
// console.log(Date.now());

// console.log(Date(1710165555662));

// console.log(new Date());

//? timer
// const ing=['olive','tometto']

// const pizza= setTimeout((a,b)=>console.log(`this your pizza it has ${a}, ${b}`)
// ,3000
// ,...ing
// );

// if(ing.includes('olive')){
//   clearTimeout(pizza);
// }
// setInterval(function(){const now= new Date()
// console.log(now);
// },1000);
