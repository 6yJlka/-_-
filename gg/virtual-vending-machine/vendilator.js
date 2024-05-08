/**
 * coin constants
 */
const NICKEL = 10;
const DIME = 50;
const QUARTER = 100;

/**
 * button constants
 */
const A = 'A';
const B = 'B';
const C = 'C';
const ONE = '1';
const TWO = '2';
const THREE = '3';
const FOUR = '4';
const FIVE = '5';

/**
 * item price constants
 */
const A_ITEM = 50;
const B_ITEM = 75;
const C_ITEM = 100;

/**
 * variables
 */
let moneyInserted = 0;
let itemCode = '';

/**
 * printing windows
 */
const outputWindow_div = document.getElementById('output-window');
const moneyWindow_div = document.getElementById('money-window');
const codeWindow_div = document.getElementById('code-window');

/**
 * code buttons
 */
const a_button = document.getElementById('letter-a');
const b_button = document.getElementById('letter-b');
const c_button = document.getElementById('letter-c');
const one_button = document.getElementById('number-1');
const two_button = document.getElementById('number-2');
const three_button = document.getElementById('number-3');
const four_button = document.getElementById('number-4');
const five_button = document.getElementById('number-5');
const purchase_button = document.getElementById('purchase');
const clear_button = document.getElementById('clear');

/**
 * money buttons
 */
const nickel_button = document.getElementById('money-10');
const dime_button = document.getElementById('money-50');
const quarter_button = document.getElementById('money-100');
const return_button = document.getElementById('money-return');

/**
 * money button action listeners
 */
nickel_button.addEventListener('click', function () {
  console.log('10 рублей пополнено');
  addMoney(NICKEL);
});

dime_button.addEventListener('click', function () {
  console.log('50 рублей пополнено');
  addMoney(DIME);
});

quarter_button.addEventListener('click', function () {
  console.log('100 рублей пополнено');
  addMoney(QUARTER);
});

return_button.addEventListener('click', function () {
  console.log('Деньги возвращены');
  returnMoney();
});

/**
 * code button action listeners
 */
a_button.addEventListener('click', function () {
  console.log(A + ' нажато');
  addToItemCode(A);
});

b_button.addEventListener('click', function () {
  console.log(B + ' нажато');
  addToItemCode(B);
});

c_button.addEventListener('click', function () {
  console.log(C + ' нажато');
  addToItemCode(C);
});

one_button.addEventListener('click', function () {
  console.log(ONE + ' нажато');
  addToItemCode(ONE);
});

two_button.addEventListener('click', function () {
  console.log(TWO + ' нажато');
  addToItemCode(TWO);
});

three_button.addEventListener('click', function () {
  console.log(THREE + ' нажато');
  addToItemCode(THREE);
});

four_button.addEventListener('click', function () {
  console.log(FOUR + ' нажато');
  addToItemCode(FOUR);
});

five_button.addEventListener('click', function () {
  console.log(FIVE + ' нажато');
  addToItemCode(FIVE);
});

purchase_button.addEventListener('click', function () {
  console.log('покупка нажата');
  purchaseItem();
});

clear_button.addEventListener('click', function () {
  console.log('ввод очищен');
  itemCode = '';
  printItemCode();
});

/**
 * adds inserted money to total
 */
function addMoney(value) {
  moneyInserted = roundTo2Decimals(moneyInserted + value);
  console.log('Сумма: ' + moneyInserted);
  printMoneyInserted();
}

/**
 * returns money, prints output message
 */
function returnMoney() {
  printOutput(returnMoneyMessage());
  moneyInserted = 0;
  printMoneyInserted();
}

/**
 * prints value of inserted money to money window
 */
function printMoneyInserted() {
  moneyWindow_div.innerHTML = moneyInserted + ' руб';
}

/**
 * rounds a number to 2 decimal places
 * @param {the number to be rounded} num
 * @returns the rounded number
 */
function roundTo2Decimals(num) {
  return +(Math.round(num * 100) / 100).toFixed(2);
}

/**
 * adds character to item code if it is valid in the sequence
 * @param {the charachter to be added} char
 */
function addToItemCode(char) {
  if (itemCode.length < 2) {
    if (itemCode.length < 1 && isLetter(char)) {
      itemCode = itemCode + char;
    }
    if (itemCode.length == 1 && !isLetter(char)) {
      itemCode = itemCode + char;
    }
  }
  console.log('Введенный код э-та ' + itemCode);
  printItemCode();
  if (itemCode.length == 2) {
    printOutput(itemCode + ' выбранная цена: ' + getItemPrice() + ' руб');
  }
}
/**
 * checks if a character is a letter
 * @param {characteer to be checked} char
 * @returns true if character is a letter
 */
function isLetter(char) {
  return char.match(/[a-z]/i);
}

/**
 * purchases the current item
 */
function purchaseItem() {
  let purchaseMessage = '';
  if (itemCode.length == 2) {
    let cost = getItemPrice();
    if (moneyInserted >= cost) {
      purchaseMessage += 'Выполняется ' + itemCode + '...<br/>';
      moneyInserted = roundTo2Decimals(moneyInserted - cost);
      purchaseMessage += returnMoneyMessage() + '<br/>';
      moneyInserted = 0;
      printMoneyInserted();
    } else {
      let remainingMoney = roundTo2Decimals(cost - moneyInserted);
      purchaseMessage += 'Недостаточно средств ' + cost + ' руб, ' + 'нужно еще ' + remainingMoney + ' руб' + '<br/>';
    }
  } else {
    purchaseMessage += 'Выберите правильный элемент' + '<br/>';
  }
  printOutput(purchaseMessage);
}


/**
 * gets the price of the currently selected item
 * @returns price of selected item
 */
function getItemPrice() {
  switch (itemCode[0]) {
    case A:
      return A_ITEM;
    case B:
      return B_ITEM;
    case C:
      return C_ITEM;
    default:
      return 0.0;
  }
}

/**
 * Prints the value of inserted money to the money window
 */

/**
 * prints message to output window
 * @param {message to be printed} message
 */
function printOutput(message) {
  outputWindow_div.innerHTML = message;
}

/**
 * Prints the current item code to item code window
 */
function printItemCode() {
  codeWindow_div.innerHTML = itemCode;
}

/**
 * returns money returned message
 * @returns message
 */
function returnMoneyMessage() {
  return moneyInserted + ' рублей ваша сдача.';
}
