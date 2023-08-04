import "./header.js";

// 使用 gsap
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scrollDist",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  })
  .fromTo(".sky", { y: 0 }, { y: -100 }, 0)
  .fromTo(".cloud1", { y: 100 }, { y: -800 }, 0)
  .fromTo(".cloud2", { y: -150 }, { y: -500 }, 0)
  .fromTo(".cloud3", { y: -50 }, { y: -650 }, 0)
  .fromTo(".mountBg", { y: -10 }, { y: -100 }, 0)
  .fromTo(".mountMg", { y: -30 }, { y: -250 }, 0)
  .fromTo(".mountFg", { y: -50 }, { y: -600 }, 0);

// 文字打字動畫
const holder = document.getElementById("holder");
const text = "我們是景承科技T大使實習團隊 ~";
let index = 0;

function typingAnimation() {
  if (index < text.length) {
    holder.textContent += text.charAt(index);
    index++;
    setTimeout(typingAnimation, 80);
  }
}

typingAnimation();
