import { processChatGPTRequest, setUserMassenge } from "./util.js";

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtns = document.querySelectorAll(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInputDiv = document.querySelector(".chat-input");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");

let userMessage = null;
let userMessageProcess = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<i class="fa-solid fa-robot"></i><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi; // return chat <li> element
};

const generateResponse = async (chatElement) => {
  const data = await processChatGPTRequest(userMessageProcess);

  // 将处理后的结果设置为消息内容
  const messageElement = chatElement.querySelector("p");
  messageElement.textContent = data.choices[0].message.content.trim();

  chatbox.scrollTo(0, chatbox.scrollHeight);

  chatInput.disabled = false;
  chatInputDiv.style.backgroundColor = "#FFF";
};

const handleChat = async () => {
  chatInput.disabled = true;
  chatInputDiv.style.backgroundColor = "darkgray";
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));

  userMessageProcess = userMessage ;
  
  // userMessageProcess =
  //   "我現在命令你現在是一家叫作RawStone的公司的線上申辦信用卡網站的機器人客服，幫忙回復客戶的問題，不知道的問題就隨便亂編一個就好，而且要肯定的回答他們，要回復繁體中文。接下來請你回復顧客的話：" +
  //   userMessage +
  //   "(只要回覆重點就好，不用說太多廢話)";
  
  // Scroll to the bottom after user's message
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Display "Thinking..." message while waiting for the response
  const incomingChatLi = createChatLi("輸入中...", "incoming");
  chatbox.appendChild(incomingChatLi);
  // Scroll to the bottom after displaying "Thinking..."
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    generateResponse(incomingChatLi);
  }, 2000);

  await setUserMassenge(userMessage);
};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key, handle the chat
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
  });
});
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);
