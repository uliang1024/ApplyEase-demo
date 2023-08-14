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

export const processWitAiRequest = async (userMessage) => {
  try {
    const response = await fetch("/witai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMessage: userMessage,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
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

export const got_answer = async (intentName) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/uliang1024/ApplyEase-demo/main/data/json/financialSolution.json"
    );
    const data = await response.json();
    const intentNameData = await data[intentName];
    let suggestion = "";
    for (const key in intentNameData) {
      if (intentNameData.hasOwnProperty(key)) {
        suggestion += intentNameData[key];
        if (
          key !==
          Object.keys(intentNameData)[Object.keys(intentNameData).length - 1]
        ) {
          suggestion += "\n\n";
        }
      }
    }
    return suggestion;
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return null;
  }
};
