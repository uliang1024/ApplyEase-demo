const goTop = document.querySelector(".goTop");

window.addEventListener("scroll", () => {
  let scrollAmount = window.scrollY;

  if (scrollAmount > 0) {
    goTop.classList.remove("hide");
  } else {
    goTop.classList.add("hide");
  }
});

goTop.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});