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
    showNextForm($currentForm);
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
