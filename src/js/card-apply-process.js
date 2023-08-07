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
    const isValid = true; //測試
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

function changeCurrentForm() {
  const formSteps = document.querySelectorAll(".form-step");
  const formStepArray = Array.from(formSteps);

  const visibleFormSteps = formStepArray.filter(
    (element) => !element.classList.contains("hidden")
  );

  const firstFormStep = visibleFormSteps[0];
  const height = firstFormStep.offsetHeight;

  $animContainer.css({
    paddingBottom: height + "px",
  });
}

window.addEventListener("resize", changeCurrentForm);

// 創建一個 MutationObserver 實例
var formStep2 = document.getElementById("form-step-2");
var MutationObserver =
  window.MutationObserver ||
  window.webkitMutationObserver ||
  window.MozMutationObserver;

var recordHeight = 0;
var mutationObserver = new MutationObserver(function (mutations) {
  let height = window.getComputedStyle(formStep2).getPropertyValue("height");
  if (height === recordHeight) {
    return;
  }
  recordHeight = height;
  changeCurrentForm();
});

mutationObserver.observe(formStep2, {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
});

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
        const choose = document.querySelector("#choose");
        choose.style.animation = "shake 0.5s ease";
        choose.addEventListener("animationend", () => {
          // 動畫結束後移除震動效果
          choose.style.animation = "";
        });
        return false;
    }
  } else if (submitButtonId === "nextBtnFormStep2") {
  } else if (submitButtonId === "nextBtnFormStep3") {
  } else if (submitButtonId === "nextBtnFormStep4") {
  }

  return true;
}

// -------process 2---------

let imageUploadWraps = document.querySelectorAll(".image-upload-wrap");
let readURLs = document.querySelectorAll(".image-upload-wrap input");
let removeImages = document.querySelectorAll(".remove-image");
let dragTexts = document.querySelectorAll(".drag-text");
let imageUploadContents = document.querySelectorAll(".file-upload-content");
let imagePreviews = document.querySelectorAll(".file-upload-image");

function showImagePreview(file, index) {
  const allowedExtensions = /(\.jpg|\.jpeg)$/i;
  const maxSize = 30 * 1024 * 1024; // 30MB in bytes

  if (
    !file.type.match(/^image\//) ||
    !allowedExtensions.exec(file.name) ||
    file.size > maxSize
  ) {
    alert("請上傳 JPG 或 JPEG 格式且大小不超過 30MB 的檔案。");
    readURLs[index].value = ""; // Clear the input
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreviews[index].src = e.target.result;
    imageUploadContents[index].style.display = "block";
    dragTexts[index].style.display = "none";
  };

  reader.readAsDataURL(file);
}

readURLs.forEach((readURL, index) => {
  readURL.addEventListener("change", () =>
    showImagePreview(readURL.files[0], index)
  );
});

removeImages.forEach((removeImage, index) => {
  removeImage.addEventListener("click", () => {
    readURLs[index].value = "";
    imagePreviews[index].src = "";
    imageUploadContents[index].style.display = "none";
    dragTexts[index].style.display = "block";
  });
});

function handleFiles(files, index) {
  for (const file of files) {
    showImagePreview(file, index);
  }
  imageUploadWraps[index].classList.remove("upload_zone_enter");
}

function createDragenterHandler(index) {
  return function (e) {
    dragenter(imageUploadWraps[index], e);
  };
}

function createDropHandler(index) {
  return function (e) {
    drop(index, e);
  };
}

imageUploadWraps.forEach((imageUploadWrap, index) => {
  const dragenterHandler = createDragenterHandler(index);
  const dropHandler = createDropHandler(index);

  imageUploadWrap.addEventListener("dragenter", dragenterHandler, false);
  imageUploadWrap.addEventListener("dragover", dragover, false);
  imageUploadWrap.addEventListener("drop", dropHandler, false);

  imageUploadWrap.addEventListener(
    "dragleave",
    () => imageUploadWrap.classList.remove("upload_zone_enter"),
    false
  );
});

function dragenter(imageUploadWrap, e) {
  imageUploadWrap.classList.add("upload_zone_enter");
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(index, e) {
  e.stopPropagation();
  e.preventDefault();
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files, index);
}

const addUploadWrap = document.querySelector("#add-upload-wrap");
const newUploadWrap = document.querySelector("#new-upload-wrap");

addUploadWrap.addEventListener("click", (event) => {
  event.preventDefault();

  const clonedUploadWrap = newUploadWrap.cloneNode(true);
  addUploadWrap.parentNode.insertBefore(clonedUploadWrap, addUploadWrap);

  imageUploadWraps = document.querySelectorAll(".image-upload-wrap");
  readURLs = document.querySelectorAll(".image-upload-wrap input");
  removeImages = document.querySelectorAll(".remove-image");
  dragTexts = document.querySelectorAll(".drag-text");
  imageUploadContents = document.querySelectorAll(".file-upload-content");
  imagePreviews = document.querySelectorAll(".file-upload-image");
  const startIndex = imageUploadWraps.length - 4;

  for (let index = startIndex; index < imageUploadWraps.length; index++) {
    const imageUploadWrap = imageUploadWraps[index];
    const readURL = readURLs[index];
    const removeImage = removeImages[index];
    const imagePreview = imagePreviews[index];
    const imageUploadContent = imageUploadContents[index];
    const dragText = dragTexts[index];

    readURL.addEventListener("change", () =>
      showImagePreview(readURL.files[0], index)
    );

    removeImage.addEventListener("click", () => {
      readURL.value = "";
      imagePreview.src = "";
      imageUploadContent.style.display = "none";
      dragText.style.display = "block";
    });
    const dragenterHandler = createDragenterHandler(index);
    const dropHandler = createDropHandler(index);

    imageUploadWrap.addEventListener("dragenter", dragenterHandler, false);
    imageUploadWrap.addEventListener("dragover", dragover, false);
    imageUploadWrap.addEventListener("drop", dropHandler, false);

    imageUploadWrap.addEventListener(
      "dragleave",
      () => imageUploadWrap.classList.remove("upload_zone_enter"),
      false
    );
  }
});

// -------process 3---------

// Man
const startingRenderSrc = document.querySelector("#man").src;

let shirtMaskTarget = document.querySelector("#shirt-target");
let shirtColorBlock = document.querySelector("#shirt-color-block");
let colorInput = document.getElementById("input-color-shirt");
colorInput.addEventListener("change", (event) => {
  setColorLayer(event.target.value, "shirt", shirtColorBlock);
});
let optionsColor1 = document.querySelectorAll(".color-1 .preset");
optionsColor1.forEach((option) => {
  option.addEventListener("click", () => {
    setColorLayer(option.dataset.color, "shirt", shirtColorBlock);
  });
});
setShadowLayer(startingRenderSrc, shirtMaskTarget, "shirt");

let pantsMaskTarget = document.querySelector("#pants-target");
let pantsColorBlock = document.querySelector("#pants-color-block");
let colorInput2 = document.getElementById("input-color-pants");
colorInput2.addEventListener("change", (event) => {
  setColorLayer(event.target.value, "pants", pantsColorBlock);
});
let optionsColor2 = document.querySelectorAll(".color-2 .preset");
optionsColor2.forEach((option) => {
  option.addEventListener("click", () => {
    setColorLayer(option.dataset.color, "pants", pantsColorBlock);
  });
});
setShadowLayer(startingRenderSrc, pantsMaskTarget, "pants");

// Woman
const startingRenderSrcW = document.querySelector("#woman").src;

let blouseMaskTarget = document.querySelector("#blouse-target");
let blouseColorBlock = document.querySelector("#blouse-color-block");
colorInput.addEventListener("change", (event) => {
  setColorLayer(event.target.value, "blouse", blouseColorBlock);
});
optionsColor1.forEach((option) => {
  option.addEventListener("click", () => {
    setColorLayer(option.dataset.color, "blouse", blouseColorBlock);
  });
});
setShadowLayer(startingRenderSrcW, blouseMaskTarget, "blouse");

let skirtMaskTarget = document.querySelector("#skirt-target");
let skirtColorBlock = document.querySelector("#skirt-color-block");
colorInput2.addEventListener("change", (event) => {
  setColorLayer(event.target.value, "skirt", skirtColorBlock);
});
optionsColor2.forEach((option) => {
  option.addEventListener("click", () => {
    setColorLayer(option.dataset.color, "skirt", skirtColorBlock);
  });
});
setShadowLayer(startingRenderSrcW, skirtMaskTarget, "skirt");

function setColorLayer(color, objName, targetClrBlock) {
  const selectedColor = color;
  const selectedColorRGB = hexToRgb(selectedColor);
  const xr = selectedColorRGB.r;
  const xg = selectedColorRGB.g;
  const xb = selectedColorRGB.b;

  const shadowLayer = document.querySelector(`.shadows_${objName}`);
  shadowLayer.style.display = "unset";
  shadowLayer.style.filter = "drop-shadow(rgba(0, 0, 0, 1) 0px 0px 0px)";

  if (isAchromatic(xr, xg, xb)) {
    if (xr + xg + xb < 45) {
      shadowLayer.style.mixBlendMode = "hard-light";
      shadowLayer.style.filter = "drop-shadow(rgba(0, 0, 0, 0) 0px 0px 0px)";
    } else if (xr < 195 && xg < 195 && xb < 195) {
      shadowLayer.style.mixBlendMode = "color-burn";
    } else {
      shadowLayer.style.mixBlendMode = "normal";
    }
  } else {
    if (xr + xg + xb < 45) {
      shadowLayer.style.mixBlendMode = "hard-light";
    } else if (xr < 195 && xg < 195 && xb < 195) {
      shadowLayer.style.mixBlendMode = "color-burn";
    } else {
      shadowLayer.style.mixBlendMode = "multiply";
    }
  }

  targetClrBlock.style.backgroundColor = selectedColor;
}

function setShadowLayer(stRenderSrc, mskTarget, objName) {
  var img = new Image();
  img.src = stRenderSrc;
  img.crossOrigin = "";
  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const grayscale =
        data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      data[i + 3] = 255 - grayscale;
    }

    ctx.putImageData(imageData, 0, 0);
    const newImg = new Image();
    newImg.src = canvas.toDataURL();
    mskTarget.appendChild(newImg);
    newImg.classList.add(`shadows_${objName}`);
  };
}

function isAchromatic(r, g, b) {
  const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;

  // Check if the color is within a certain tolerance of grayscale
  const tolerance = 50;
  return (
    Math.abs(r - grayscale) < tolerance &&
    Math.abs(g - grayscale) < tolerance &&
    Math.abs(b - grayscale) < tolerance
  );
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

var optionsbg = document.querySelectorAll(".option");
optionsbg.forEach((ele) => {
  if (ele.dataset.color != null) {
    ele.style.background = ele.dataset.color;
  } else {
    ele.style.background =
      "linear-gradient(70deg, #3f87a6, #ebf8e1, #f69d3c, #561423)";
  }
});

function toggleMF(mf, fm) {
  let mfTog = document.querySelectorAll(`.${mf}`);
  let fmTog = document.querySelectorAll(`.${fm}`);
  mfTog.forEach((mtog) => {
    if (!mtog.classList.contains("active")) {
      fmTog.forEach((wtog) => {
        wtog.classList.remove("active");
      });
      mtog.classList.add("active");
    }
  });
}
document.querySelector(".gender .man").addEventListener("click", () => {
  toggleMF("man", "woman");
});
document.querySelector(".gender .woman").addEventListener("click", () => {
  toggleMF("woman", "man");
});
// -------process 4---------
