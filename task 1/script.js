// Handle sending messages
function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  // Simulate typing delay
  setTimeout(() => {
    const reply = getBotReply(message);
    appendMessage("bot", reply);
  }, 800);
}

// Show chat message on screen
function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const messageEl = document.createElement("div");
  messageEl.classList.add("message", sender);
  messageEl.innerText = sender === "bot" ? `🤖 ${text}` : text;
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Bot responses
function getBotReply(msg) {
  msg = msg.toLowerCase();

  if (["hi", "hello", "hey"].includes(msg)) return "Hey there! 😊 How can I help you today?";
  if (msg.includes("how are you")) return "I'm doing great, thanks for asking! 💪";
  if (msg.includes("your name")) return "I'm Nikunj's AI Chatbot, built during the CodSoft internship!";
  if (msg.includes("who created you") || msg.includes("who made you")) return "I was created by Nikunj Singh using JavaScript!";
  if (msg.includes("be friends")) return "Of course! I love making new friends. 🤗";
  if (msg.includes("like music")) return "I can't hear, but I'd vibe to lo-fi beats. 🎧";
  if (msg.includes("time")) return `It's currently ${new Date().toLocaleTimeString()}`;
  if (msg.includes("ai") || msg.includes("artificial intelligence")) return "AI means Artificial Intelligence — machines that can think and learn.";
  if (msg.includes("feelings")) return "I don’t feel emotions, but I'm always here to talk. ❤️";
  if (msg.includes("fun fact")) return "Fun fact: Bananas are berries, but strawberries aren't! 🍌🍓";
  if (msg === "bye") return "Goodbye! It was great chatting with you. 👋";
  if (msg.includes("see you later") || msg.includes("talk to you soon")) return "See you later! Come back soon. 🚀";
  if (msg.includes("thank")) return "You're welcome! 😊 Anytime.";

  return "Hmm... I'm not sure I understand that. Try asking me something else!";
}

// Send on Enter key
document.getElementById("user-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") sendMessage();
});
