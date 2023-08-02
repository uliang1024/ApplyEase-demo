const captchaAlert = document.querySelector("#captcha-alert");

$(".slider-for").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".slider-nav",
  centerMode: true,
});

$(".slider-nav").slick({
  centerMode: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: ".slider-for",
  dots: true,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".slider-for",
        dots: true,
        focusOnSelect: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".slider-for",
        dots: true,
        focusOnSelect: true,
      },
    },
  ],
});

$("a[data-slide]").click(function (e) {
  e.preventDefault();
  var slideno = $(this).data("slide");
  $(".slider-nav").slick("slickGoTo", slideno - 1);
});

// ----------------

const tabs = document.querySelectorAll(".tabs .tab");
const cardShow = document.querySelector("#card-show");
const sliderFor = document.querySelector(".slider-for");
const sliderNav = document.querySelector(".slider-nav");
let cardsDate = "";
let requestURL =
  "https://raw.githubusercontent.com/uliang1024/ApplyEase/main/data/json/cards.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function () {
  cardsDate = request.response;
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    const selectedLabel = tab.innerText.trim();

    const selectedCards = cardsDate[selectedLabel]; // 获取选定标签的卡片数组

    // 移除旧的轮播内容
    $(".slider-for").slick("slickRemove", null, null, true);
    $(".slider-nav").slick("slickRemove", null, null, true);

    selectedCards.forEach((card, index) => {
      createCard(card, index);
    });
    window.scrollTo(0, scrollPosition);
  });
});

// 创建单个卡片的函数
function createCard(card, index) {
  const slideForContent = `
    <div class="slick-slide">
      <div class="ratio ratio-16x9">
        <img
          src="${card.src}"
          class="img-fluid rounded mx-auto d-block h-100"
          alt="${card.alt}"
        />
      </div>
      <h5 class="text-center pt-3">${card.alt}</h5>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault${index}"
        />
        <label
          class="form-check-label"
          for="flexRadioDefault${index}"
        >選擇此卡</label>
      </div>
    </div>
  `;

  const slideNavContent = `
    <div class="card" style="width: 18rem">
      <div class="ratio ratio-16x9">
        <img
          src="${card.src}"
          class="img-fluid rounded mx-auto d-block h-100"
          alt=""
        />
      </div>
    </div>
  `;

  // 使用 slickAdd 方法添加新的内容
  $(".slider-for").slick("slickAdd", slideForContent);
  $(".slider-nav").slick("slickAdd", slideNavContent);
}

// --------------

// 获取需要点击的链接和需要显示/隐藏的元素
let cardBrand1 = document.querySelector("#card-brand1");
let cardBrand2 = document.querySelector("#card-brand2");
let visa = document.querySelectorAll(".VISA");
let element1 = document.getElementById("carouselExampleIndicators");
let element2 = document.getElementById("carouselExampleIndicators2");
let element11 = document.getElementById("carouselExampleIndicators11");
let element22 = document.getElementById("carouselExampleIndicators22");
let cardType = document.getElementById("cardType");

// // 選取所有單選按鈕元素
// const radioButtons = document.querySelectorAll('input[type="radio"]');

// // 單選按鈕點擊事件處理函式
// function handleRadioButtonClick(event) {
//   // 取消其他單選按鈕的選取狀態
//   radioButtons.forEach((button) => {
//     if (button !== event.target) {
//       button.checked = false;
//     }
//     // 显示 cardType
//     cardType.style.display = "block";
//   });
// }

// // 綁定單選按鈕的點擊事件監聽器
// radioButtons.forEach((button) => {
//   button.addEventListener("click", handleRadioButtonClick);
// });

// --------------------

const IDNumber = document.querySelector("#ID-number");

IDNumber.addEventListener("input", function () {
  let value = IDNumber.value;

  // 验证第一个字符是否为英文字母
  let firstChar = value.charAt(0);
  if (!/[a-zA-Z]/.test(firstChar)) {
    IDNumber.value = "";
    return;
  }

  // 将第一个字符转换为大写
  IDNumber.value = firstChar.toUpperCase() + value.slice(1);

  // 验证后面九个字符是否为数字
  let numericPart = value.slice(1);
  if (numericPart.length > 9 || !/^\d+$/.test(numericPart)) {
    let validNumericPart = numericPart.replace(/\D/g, ""); // 删除非数字字符
    IDNumber.value = firstChar.toUpperCase() + validNumericPart;
    return;
  }
});

const IDAlert = document.querySelector("#ID-alert");

IDNumber.addEventListener("blur", function () {
  // 获取输入框的值
  var idNumber = IDNumber.value;

  // 验证身份证有效性
  var isValid = isTWIDValid(idNumber);
  // 根据验证结果执行操作
  if (isValid) {
    IDAlert.classList.remove("show");
  } else {
    IDAlert.classList.add("show");
  }
});

function isTWIDValid(idStr) {
  // 依照字母的編號排列，存入陣列備用。
  var letters = new Array(
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
  var multiply = new Array(1, 9, 8, 7, 6, 5, 4, 3, 2, 1);
  var nums = new Array(2);
  var firstChar;
  var firstNum;
  var lastNum;
  var total = 0;
  // 撰寫「正規表達式」。第一個字為英文字母，
  // 第二個字為1或2，後面跟著8個數字，不分大小寫。
  var regExpID = /^[a-z](1|2)\d{8}$/i;
  // 使用「正規表達式」檢驗格式
  if (idStr.search(regExpID) == -1) {
    // 基本格式錯誤
    return false;
  } else {
    // 取出第一個字元和最後一個數字。
    firstChar = idStr.charAt(0).toUpperCase();
    lastNum = idStr.charAt(9);
  }
  // 找出第一個字母對應的數字，並轉換成兩位數數字。
  for (var i = 0; i < 26; i++) {
    if (firstChar == letters[i]) {
      firstNum = i + 10;
      nums[0] = Math.floor(firstNum / 10);
      nums[1] = firstNum - nums[0] * 10;
      break;
    }
  }
  // 執行加總計算
  for (var i = 0; i < multiply.length; i++) {
    if (i < 2) {
      total += nums[i] * multiply[i];
    } else {
      total += parseInt(idStr.charAt(i - 1)) * multiply[i];
    }
  }
  // 和最後一個數字比對
  if (10 - (total % 10) != lastNum) {
    return false;
  }
  return true;
}

const birthday = document.querySelector("#birthday");

birthday.addEventListener("input", function () {
  let value = birthday.value;

  // 移除非数字字符
  let numericValue = value.replace(/\D/g, "");

  // 根据数字长度添加斜杠
  if (numericValue.length >= 5) {
    numericValue = numericValue.slice(0, 4) + "/" + numericValue.slice(4);
  }
  if (numericValue.length >= 8) {
    numericValue = numericValue.slice(0, 7) + "/" + numericValue.slice(7);
  }

  // 更新输入框的值
  birthday.value = numericValue;
});

birthday.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    let value = birthday.value;
    if (value.length === 6 || value.length === 9) {
      birthday.value = value.slice(0, -1);
    }
  }
});

const birthdayAlert = document.querySelector("#birthday-alert");

birthday.addEventListener("blur", function () {
  let birthdayValue = birthday.value;

  // 验证身份证有效性
  let isValid = isBirthdayValid(birthdayValue);
  // 根据验证结果执行操作
  if (isValid) {
    birthdayAlert.classList.remove("show");
  } else {
    birthdayAlert.classList.add("show");
  }
});

function isBirthdayValid(birthdayValue) {
  // 验证生日格式是否为YYYY/MM/DD
  const birthdayRegex = /^\d{4}\/\d{2}\/\d{2}$/;
  if (!birthdayRegex.test(birthdayValue)) {
    birthdayAlert.textContent = "▲ 請輸入正確日期格式";
    return false;
  }

  // 获取当前日期
  const currentDate = new Date();

  // 解析生日日期
  const birthdayDate = new Date(birthdayValue);

  const parsedDate = moment(birthdayValue, "YYYY/MM/DD", true);

  if (!parsedDate.isValid()) {
    birthdayAlert.textContent = "▲ 請輸入正確日期格式";
    return false;
  }

  // 验证生日日期是否大于等于当前日期
  if (birthdayDate >= currentDate) {
    birthdayAlert.textContent = "▲ 你是未來人？";
    return false;
  }

  // 计算年龄
  const age = currentDate.getFullYear() - birthdayDate.getFullYear();

  // 验证年龄是否小于18岁
  if (age < 18) {
    birthdayAlert.textContent = "▲ 信用卡線上申請須年滿18歲";
    return false;
  }

  // 验证生日日期是否超过一世纪
  currentDate.setFullYear(currentDate.getFullYear() - 100);
  if (birthdayDate < currentDate) {
    birthdayAlert.textContent = "▲ 你是古人嗎";
    return false;
  }

  return true;
}

// --------------------

//驗證碼
let captcha = "";

// 定义验证码字符集
const captchaChars = "0123456789";

// 获取刷新按钮和验证码图片元素
let refreshBtn = document.getElementById("refresh-btn");
let captchaImg = document.getElementById("captcha-img");

window.onload = function () {
  // 随机生成新的验证码图片的 base64 编码
  generateRandomCaptcha(function (newCaptchaBase64) {
    // 更新验证码图片的 src 属性
    captchaImg.src = newCaptchaBase64;
  });
};

// 刷新按钮点击事件处理程序
refreshBtn.addEventListener("click", function () {
  // 随机生成新的验证码图片的 base64 编码
  generateRandomCaptcha(function (newCaptchaBase64) {
    // 更新验证码图片的 src 属性
    captchaImg.src = newCaptchaBase64;
  });
});

// 生成随机验证码图片的函数
function generateRandomCaptcha(callback) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  // 设置画布尺寸
  canvas.width = 100;
  canvas.height = 40;

  // 创建一个新的Image对象
  let backgroundImage = new Image();

  // 设置背景图像的源
  backgroundImage.src = "/imgs/verificationCodeBg.jpg";

  // 当背景图像加载完成后，在画布上绘制图像
  backgroundImage.onload = function () {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    captcha = "";
    // 随机生成四位数字验证码
    for (let i = 0; i < 4; i++) {
      let digit = Math.floor(Math.random() * 10);
      captcha += digit;
    }

    // 绘制验证码文本
    ctx.font = "bold 35px Arial";
    ctx.fillStyle = "#000"; // 设置文本颜色为黑色
    ctx.fillText(captcha, 10, 30);

    // 将绘制好的验证码图片转换为 base64 编码
    let newCaptchaBase64 = canvas.toDataURL("image/png");

    // 将新的验证码图片传递给回调函数
    callback(newCaptchaBase64);
  };
}

// ---------------------

// 获取表单和按钮元素
const form = document.querySelector("#myForm");
const disabledLink = document.querySelector("#disabledLink");

// 添加输入字段的事件监听器
form.addEventListener("input", function () {
  // 进行表单验证
  var isValid = validateForm();
  // 根据验证结果更新按钮状态
  if (isValid) {
    disabledLink.classList.remove("disable");
  } else {
    disabledLink.classList.add("disable");
  }
});

// 表单验证函数
function validateForm() {
  const input1 = document.getElementById("ID-number");
  const input2 = document.getElementById("birthday");
  const captchaInput = document.getElementById("captcha-input");
  const checkboxGroup = document.getElementById("checkbox_group");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checkedCheckboxes = Array.from(checkboxes)
    .slice(0, 5)
    .filter((checkbox) => checkbox.checked);

  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="flexRadioDefault"]'
  );

  if (!isTWIDValid(input1.value.trim())) {
    input1.classList.add("invalid");
  } else {
    input1.classList.remove("invalid");
  }
  if (!isBirthdayValid(input2.value.trim())) {
    input2.classList.add("invalid");
  } else {
    input2.classList.remove("invalid");
  }
  if (captchaInput.length === 0) {
    captchaInput.classList.add("invalid");
  } else {
    captchaInput.classList.remove("invalid");
  }
  if (checkedCheckboxes.length !== 5) {
    checkboxGroup.classList.add("invalid");
  } else {
    checkboxGroup.classList.remove("invalid");
  }
  let isAnyRadioChecked = false;
  for (const radio of radioButtons) {
    if (radio.checked) {
      isAnyRadioChecked = true;
      break;
    }
  }
  if (!isAnyRadioChecked) {
    cardShow.classList.add("invalid");
  } else {
    cardShow.classList.remove("invalid");
  }

  return document.querySelectorAll(".invalid").length === 0;
}

form.addEventListener("submit", function (event) {
  // 阻止表单提交
  event.preventDefault();

  // 进行表单验证
  const isValid = validateForm();

  if (isValid) {
    const captchaInput = document.getElementById("captcha-input");
    if (captcha != captchaInput.value.trim()) {
      captchaAlert.classList.add("show");
      captchaInput.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      // 添加震動動畫
      captchaInput.style.animation = "shake 0.5s ease";
      captchaInput.addEventListener("animationend", () => {
        // 動畫結束後移除震動效果
        captchaInput.style.animation = "";
      });
    } else {
        captchaAlert.classList.remove("show");
        form.submit();
    }
  } else {
    const firstInvalidElement = document.querySelector(".invalid");
    if (firstInvalidElement) {
      firstInvalidElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // 添加震動動畫
      firstInvalidElement.style.animation = "shake 0.5s ease";
      firstInvalidElement.addEventListener("animationend", () => {
        // 動畫結束後移除震動效果
        firstInvalidElement.style.animation = "";
      });
    }
  }
});

// ---
