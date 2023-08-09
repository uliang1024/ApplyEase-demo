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
const formSteps = document.querySelectorAll('form[name^="form-step-"]');
let MutationObserver =
  window.MutationObserver ||
  window.webkitMutationObserver ||
  window.MozMutationObserver;

let recordHeights = {};

formSteps.forEach((formStep) => {
  let mutationObserver = new MutationObserver(function (mutations) {
    let height = window.getComputedStyle(formStep).getPropertyValue("height");
    if (height === recordHeights[formStep]) {
      return;
    }
    recordHeights[formStep] = height;
    changeCurrentForm();
  });

  mutationObserver.observe(formStep, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
  });
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

const currentYear = new Date().getFullYear(); // 西元轉換為民國年
const selectYear = document.getElementById("IDCardIssueYear");
const selectMonth = document.getElementById("IDCardIssueMonth");
const selectDay = document.getElementById("IDCardIssueDay");

for (let year = 94; year <= currentYear - 1911; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year + "年";
  selectYear.appendChild(option);
}

selectYear.addEventListener("change", () => {
  const selectedYear = parseInt(selectYear.value);

  // 清空月份選項
  selectMonth.innerHTML = `<option value="${0}" selected>請選擇月</option>`;
  selectDay.innerHTML = `<option value="${0}" selected>請選擇日</option>`;

  if (selectedYear === 94) {
    const option = document.createElement("option");
    option.value = 12;
    option.textContent = "12月";
    selectMonth.appendChild(option);
  } else if (selectedYear === 0) {
    // 不給任何選項
  } else {
    for (let month = 1; month <= 12; month++) {
      const option = document.createElement("option");
      option.value = month;
      option.textContent = month + "月";
      selectMonth.appendChild(option);
    }
  }

  selectMonth.classList.remove("hidden");
});

selectMonth.addEventListener("change", () => {
  const selectedYear = parseInt(selectYear.value);
  const selectedMonth = parseInt(selectMonth.value);

  // 清空日份選項
  selectDay.innerHTML = `<option value="${0}" selected>請選擇日</option>`;

  if (selectedYear === 94 && selectedMonth === 12) {
    for (let day = 21; day <= 31; day++) {
      const option = document.createElement("option");
      option.value = day;
      option.textContent = day + "日";
      selectDay.appendChild(option);
    }
  } else if (selectedMonth === 0) {
    // 不給任何選項
  } else {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    for (let day = 1; day <= daysInMonth; day++) {
      const option = document.createElement("option");
      option.value = day;
      option.textContent = day + "日";
      selectDay.appendChild(option);
    }
  }

  selectDay.classList.remove("hidden");
});

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDaysInMonth(year, month) {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  return [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
}

const addressCountys = document.querySelectorAll(".addressCountys");
const addressLocalities = document.querySelectorAll(".addressLocalities");

addressCountys.forEach((addressCounty, index) => {
  addressCounty.addEventListener("change", async () => {
    const selectedCounty = addressCounty.value;

    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/uliang1024/ApplyEase-demo/main/data/json/options.json"
      );
      const optionsData = await response.json();

      const countyData = optionsData.countyData.find(
        (county) => county.name === selectedCounty
      );

      if (countyData) {
        addressLocalities[index].innerHTML =
          "<option selected>(市區鄉鎮)</option>";
        countyData.districts.forEach((district) => {
          const option = document.createElement("option");
          option.value = district.name;
          option.textContent = district.name;
          addressLocalities[index].appendChild(option);
        });
      } else {
        addressLocalities[index].innerHTML =
          "<option selected>(市區鄉鎮)</option>";
      }
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  });
});

const expands3 = document.querySelectorAll(".expand-3");
const contents3 = document.querySelectorAll(".content-3");
const expandIcons3 = document.querySelectorAll(".expand-icon-3");
expands3.forEach((expand3, index) => {
  expand3.addEventListener("click", () => {
    contents3[index].classList.toggle("hidden");
    expandIcons3[index].classList.toggle("rotate180");
  });
});

const sameAddress = document.querySelector("#sameAddress");
const Select = document.querySelector("#ResidentialAddressSelect");
const Input = document.querySelector("#ResidentialAddressInput");
sameAddress.addEventListener("change", (event) => {
  if (event.target.checked) {
    Select.classList.add("hidden");
    Input.classList.add("hidden");
  } else {
    Select.classList.remove("hidden");
    Input.classList.remove("hidden");
  }
});
const sameNumber = document.querySelector("#sameNumber");
const sameNumberHides = document.querySelectorAll(".sameNumber");
sameNumber.addEventListener("change", (event) => {
  if (event.target.checked) {
    sameNumberHides.forEach((sameNumberHide) => {
      sameNumberHide.classList.add("hidden");
    });
  } else {
    sameNumberHides.forEach((sameNumberHide) => {
      sameNumberHide.classList.remove("hidden");
    });
  }
});

const industrySelector = document.querySelector("#industrySelector");
const careerSelector = document.querySelector("#careerSelector");
const jobSelector = document.querySelector("#jobSelector");
industrySelector.addEventListener("change", async () => {
  const selectedIndustry = industrySelector.value;
  jobSelector.innerHTML = "<option selected>(請選擇)</option>";
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/uliang1024/ApplyEase-demo/main/data/json/options.json"
    );
    const optionsData = await response.json();

    const industryCategories = optionsData.industryCategories.find(
      (industryCategorie) => industryCategorie.name === selectedIndustry
    );

    if (industryCategories) {
      careerSelector.innerHTML = "<option selected>(請選擇)</option>";
      industryCategories.occupations.forEach((occupation) => {
        const option = document.createElement("option");
        option.value = occupation.name;
        option.textContent = occupation.name;
        careerSelector.appendChild(option);
      });
    } else {
      careerSelector.innerHTML = "<option selected>(請選擇)</option>";
    }
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
});

careerSelector.addEventListener("change", async () => {
  const selectedIndustry = industrySelector.value;
  const selectedCareer = careerSelector.value;

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/uliang1024/ApplyEase-demo/main/data/json/options.json"
    );
    const optionsData = await response.json();

    const industry = optionsData.industryCategories.find(
      (industry) => industry.name === selectedIndustry
    );
    if (industry) {
      const occupation = industry.occupations.find(
        (occupation) => occupation.name === selectedCareer
      );
      if (occupation) {
        jobSelector.innerHTML = "<option selected>(請選擇)</option>";
        occupation.positions.forEach((occupation) => {
          const option = document.createElement("option");
          option.value = occupation.name;
          option.textContent = occupation.name;
          jobSelector.appendChild(option);
        });
      } else {
        jobSelector.innerHTML = "<option selected>(請選擇)</option>";
      }
    }
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
});

const seniorityStartSelect = document.querySelector("#seniority-start-select"); // 取得 select 元素
const seniorityEndSelect = document.querySelector("#seniority-end-select");

for (let year = currentYear - 100; year <= currentYear; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year + "年";
  seniorityStartSelect.appendChild(option);
}

seniorityStartSelect.addEventListener("change", () => {
  const startYear = parseInt(seniorityStartSelect.value);
  seniorityEndSelect.innerHTML = "";

  if (startYear > 0) {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "(結束年分)";
    seniorityEndSelect.appendChild(defaultOption);

    for (let year = startYear; year <= currentYear; year++) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year + "年";
      seniorityEndSelect.appendChild(option);
    }
  }
});

// -------process 4---------
