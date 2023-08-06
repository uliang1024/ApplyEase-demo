import {
  checkID,
  validCardNumber,
  validCardMonthYear,
  validBankSelect,
  isValidTaiwanMobileNumber,
} from "./isValid.js";

var $progressBar = $("progress");
var $animContainer = $(".animation-container");
let value = 0;
const transitionEnd = "webkitTransitionEnd transitionend";

/**
 * 重置表單為預設狀態。
 * ========================
 */
function formReset() {
  value = 0;
  $progressBar.val(value);
  // 清空所有輸入欄位的值並移除 "hasInput" 類別
  $("form input").not("button").val("").removeClass("hasInput");
  // 重置所有表單步驟的狀態
  $(".js-form-step").removeClass("left leaving");
  // 隱藏所有表單步驟，除了第一步驟
  $(".js-form-step")
    .not('.js-form-step[data-step="1"]')
    .addClass("hidden waiting");
  // 顯示第一步驟的表單
  $('.js-form-step[data-step="1"]').removeClass("hidden");
  // 重置進度指示器
  $(".form-progress-indicator").not(".one").removeClass("active");

  // 設定動畫容器的底部填充，以符合第一步驟的高度
  $animContainer.css({
    paddingBottom: $('.js-form-step[data-step="1"]').height() + "px",
  });

  return false;
}

/**
 * 設定表單點擊處理程序，處理「下一步」和「重置」操作。
 * ===================================================
 */
function setupClickHandlers() {
  // 在「繼續」按鈕點擊時顯示下一步表單
  $('button[type="submit"]').on("click", function (event) {
    event.preventDefault();
    var $currentForm = $(this).parents(".js-form-step");
    // 在前往下一步表單之前執行表單驗證
    // const isValid = validateFormInputs($currentForm);
    const isValid = true;//測試
    if (isValid) {
      showNextForm($currentForm);
    }
  });

  return false;
}

/**
 * 顯示下一步表單。
 * @param - Node - 當前表單。
 * ==========================
 */
function showNextForm($currentForm) {
  var currentFormStep = parseInt($currentForm.attr("data-step")) || false;
  var $nextForm = $('.js-form-step[data-step="' + (currentFormStep + 1) + '"]');

  // 隱藏當前表單字段
  $currentForm.addClass("leaving");
  setTimeout(function () {
    $currentForm.addClass("hidden");
  }, 500);

  // 設定容器動畫以符合下一步表單的高度
  $animContainer.css({
    paddingBottom: $nextForm.height() + "px",
  });

  // 顯示下一步表單字段
  $nextForm
    .removeClass("hidden")
    .addClass("coming")
    .one(transitionEnd, function () {
      $nextForm.removeClass("coming waiting");
    });

  // 增加進度值（基於 4 步 0 - 100）
  value += 33;

  // 如果已達結尾，則重置表單
  if (value >= 100) {
    formReset();
  } else {
    // 將進度條設置為下一個值
    $(".form-progress")
      .find(".form-progress-indicator.active")
      .next(".form-progress-indicator")
      .addClass("active");
    $progressBar.val(value);
  }

  // 更新隱藏的進度描述（供輔助功能使用）
  $(".js-form-progress-completion").html($progressBar.val() + "% 完成");

  return false;
}

/**
 * 設定和處理輸入元素的浮動標籤。
 * ==================================
 */
function setupFloatLabels() {
  // 檢查輸入元素以決定是否保持標籤浮動
  $("form input")
    .not("button")
    .on("blur", function () {
      // 不同的輸入元素需要不同的驗證
      switch (this.tagName) {
        case "SELECT":
          if (this.value > 0) {
            this.className = "hasInput";
          } else {
            this.className = "";
          }
          break;

        case "INPUT":
          if (this.value !== "") {
            this.className = "hasInput";
          } else {
            this.className = "";
          }
          break;

        default:
          break;
      }
    });

  return false;
}

/**
 * 開始進行。
 * =============
 */
function init() {
  formReset();
  setupFloatLabels();
  setupClickHandlers();
}

init();

// -------process 1---------

const choose1Btn = document.querySelector("#choose-1-btn");
const choose2Btn = document.querySelector("#choose-2-btn");
const choose3Btn = document.querySelector("#choose-3-btn");
const closeFrom1Btn = document.querySelector("#close-from-1-Btn");
const formStep1 = document.querySelector('form[name="form-step-1"]');
const process1_1 = document.querySelector("#process-1-1");
const process1_2 = document.querySelector("#process-1-2");
const process1_3 = document.querySelector("#process-1-3");

let currentChoose = null;

// 將 process-1-X 元素添加到表單中
choose1Btn.addEventListener("click", () => {
  updateFormContent(process1_1, "choose-1");
});

choose2Btn.addEventListener("click", () => {
  updateFormContent(process1_2, "choose-2");
});

choose3Btn.addEventListener("click", () => {
  updateFormContent(process1_3, "choose-3");
});

function updateFormContent(processElement, chooseClass) {
  if (currentChoose !== chooseClass) {
    formStep1.innerHTML = processElement.outerHTML; // 直接複製整個 HTML 內容
    adjustContainerHeight();
    currentChoose = chooseClass;
  }
}

closeFrom1Btn.addEventListener("click", () => {
  formStep1.innerHTML = "";
  currentChoose = null;
  adjustContainerHeight();
});

function adjustContainerHeight() {
  $animContainer.css({
    paddingBottom: $('.js-form-step[data-step="1"]').height() + "px",
  });
}

function validateFormInputs(currentForm) {
  const submitButtonId = currentForm.find('button[type="submit"]').attr("id");
  if (submitButtonId === "nextBtnFormStep1") {
    switch (currentChoose) {
      case "choose-1":
        // A139220848;
        if (!checkID(currentForm.find("#IDNumber").val())) {
          return false;
        }
        // 5338324803977657;
        if (!validCardNumber(currentForm.find("#creditCardNumber").val())) {
          return false;
        }
        if (
          !validCardMonthYear(
            currentForm.find("#creditCardMonth").val(),
            currentForm.find("#creditCardYear").val()
          )
        ) {
          return false;
        }
        break;
      case "choose-2":
        if (!validBankSelect(currentForm.find("#bankSelect").val())) {
          return false;
        }
        // 5338324803977657;
        if (!validCardNumber(currentForm.find("#creditCardNumber").val())) {
          return false;
        }
        if (
          !isValidTaiwanMobileNumber(
            currentForm.find("#taiwanMobileNumber").val()
          )
        ) {
          return false;
        }
        break;
      case "choose-3":
        if (currentForm.find("#yourName").val() === "") {
          alert("請輸入名字");
          return false;
        }
        // A139220848;
        if (!checkID(currentForm.find("#IDNumber").val())) {
          return false;
        }
        if (
          !isValidTaiwanMobileNumber(
            currentForm.find("#taiwanMobileNumber").val()
          )
        ) {
          return false;
        }
        break;
      default:
        break;
    }
  } else if (submitButtonId === "nextBtnFormStep2") {
  } else if (submitButtonId === "nextBtnFormStep3") {
  } else if (submitButtonId === "nextBtnFormStep4") {
  }

  return true;
}

// -------process 2---------
// -------process 3---------
// -------process 4---------
