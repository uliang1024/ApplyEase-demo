export const processChatGPTRequest = async (userMessage) => {
  const res = await fetch("/getChatGPT", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  const data = await res.json();
  return data;
};

export const setUserMassenge = async (userMessage) => {
  try {
    await fetch("/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });
  } catch (error) {
    console.error("Error sending user message to the server:", error);
  }
};
