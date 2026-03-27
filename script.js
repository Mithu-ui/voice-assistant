const chat = document.getElementById("chat");
const messageInput = document.getElementById("messageInput");
const status = document.getElementById("status");
const voiceBtn = document.getElementById("voiceBtn");

let isListening = false;
let isSending = false;

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "bubble " + sender;
  
  if (sender === "bot" && text.includes("Error")) {
    div.className += " error";
  }
  
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function setStatus(message, type = "info") {
  status.innerText = message;
  status.className = "status " + type;
  if (message) {
    setTimeout(() => {
      if (status.innerText === message) {
        status.innerText = "";
        status.className = "status";
      }
    }, 4000);
  }
}

async function sendMessage(message = null) {
  const text = message || messageInput.value.trim();
  
  if (!text) {
    setStatus("Please enter a message", "warning");
    return;
  }
  
  if (isSending) {
    setStatus("Already sending a message...", "warning");
    return;
  }

  messageInput.value = "";
  addMessage(text, "user");
  isSending = true;
  messageInput.disabled = true;

  const typing = document.createElement("div");
  typing.className = "bubble bot typing";
  typing.innerText = "⏳ Thinking...";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    
    if (!data.reply) {
      throw new Error("No response from AI");
    }

    typing.remove();
    addMessage(data.reply, "bot");
    setStatus("✓ Response received", "success");
    
    speak(data.reply);
  } catch (error) {
    console.error("Error:", error);
    typing.remove();
    
    let errorMsg = "Error: ";
    if (error.message.includes("API key not configured")) {
      errorMsg += "API key not configured on server";
    } else if (error.message.includes("API request failed")) {
      errorMsg += "OpenAI API error - check if API key is valid";
    } else if (error.message.includes("Failed to fetch")) {
      errorMsg += "Network error - check connection";
    } else {
      errorMsg += error.message;
    }
    
    addMessage(errorMsg, "bot");
    setStatus("✗ " + error.message, "error");
  } finally {
    isSending = false;
    messageInput.disabled = false;
    messageInput.focus();
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
  if (!recognition) {
    setStatus("Voice input not supported in this browser", "error");
    return;
  }

  recognition.lang = "en-US";
  isListening = true;
  voiceBtn.classList.add("active");
  setStatus("🎤 Listening...");

  recognition.onresult = async (event) => {
    const text = event.results[event.results.length - 1][0].transcript;
    messageInput.value = text;
    setStatus("Recognized: " + text, "success");
    sendMessage(text);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setStatus("Microphone error: " + event.error, "error");
  };

  recognition.onend = () => {
    isListening = false;
    voiceBtn.classList.remove("active");
  };

  try {
    recognition.start();
  } catch (error) {
    setStatus("Could not start microphone", "error");
  }
}

function speak(text) {
  if (!('speechSynthesis' in window)) {
    console.log("Text-to-speech not supported");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.95;
  speech.pitch = 1.2;
  
  speech.onerror = (event) => {
    console.error("Speech synthesis error:", event.error);
  };
  
  window.speechSynthesis.speak(speech);
}

// Focus on input when page loads
window.addEventListener("load", () => {
  messageInput.focus();
});