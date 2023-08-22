export function checkID(idStr) {
  // 依照字母的編號排列，存入陣列備用。
  let letters = new Array(
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "X",
    "Y",
    "W",
    "Z",
    "I",
    "O"
  );
  // 儲存各個乘數
  let multiply = new Array(1, 9, 8, 7, 6, 5, 4, 3, 2, 1);
  let nums = new Array(2);
  let firstChar;
  let firstNum;
  let lastNum;
  let total = 0;
  let regExpID = /^[a-z](1|2)\d{8}$/i;
  if (idStr.search(regExpID) == -1) {
    alert("請仔細填寫身份證號碼，範例：A154375166");
    return false;
  } else {
    firstChar = idStr.charAt(0).toUpperCase();
    lastNum = idStr.charAt(9);
  }
  for (let i = 0; i < 26; i++) {
    if (firstChar == letters[i]) {
      firstNum = i + 10;
      nums[0] = Math.floor(firstNum / 10);
      nums[1] = firstNum - nums[0] * 10;
      break;
    }
  }
  for (let i = 0; i < multiply.length; i++) {
    if (i < 2) {
      total += nums[i] * multiply[i];
    } else {
      total += parseInt(idStr.charAt(i - 1)) * multiply[i];
    }
  }
  if (10 - (total % 10) != lastNum) {
    alert("身份證號碼寫錯了！");
    return false;
  }
  return true;
}

export function validCardNumber(numb) {
  const regex = /^[0-9]{13,19}$/;
  if (!regex.test(numb)) {
    alert("請輸入有效的信用卡卡號！範例：4532185076667110");
    return false;
  }
  const isValid = luhnck(numb);
  if (!isValid) {
    alert("信用卡卡號驗證失敗！");
  }
  return luhnck(numb);
}

function luhnck(val) {
  let validsum = 0;
  let k = 1;
  for (let l = val.length - 1; l >= 0; l--) {
    let calck = 0;
    calck = Number(val.charAt(l)) * k;
    if (calck > 9) {
      validsum = validsum + 1;
      calck = calck - 10;
    }
    validsum = validsum + calck;
    k = k === 1 ? 2 : 1;
  }
  return validsum % 10 === 0;
}

export function validCardMonthYear(month, year) {
  if (
    month === "" ||
    year === "" ||
    month === "請選擇月" ||
    year === "請選擇年"
  ) {
    alert("請選擇信用卡有效月年");
    return false;
  }
  return true;
}

export function validBankSelect(bankSelect) {
  if (bankSelect === "" || bankSelect === "請選擇") {
    alert("請選擇他行銀行別");
    return false;
  }
  return true;
}

export function isValidTaiwanMobileNumber(phoneNumber) {
  const regex = /^09\d{8}$/;
  const isValid = regex.test(phoneNumber);;
  if (!isValid) {
    alert("手機號碼錯誤！");
  }
  return regex.test(phoneNumber);
}