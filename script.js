const chat = document.getElementById("chat");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "bubble " + sender;
  div.innerText = text;
  chat.appendChild(div);
  window.scrollTo(0, document.body.scrollHeight);
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = async (event) => {
    const text = event.results[0][0].transcript;

    addMessage(text, "user");

    const typing = document.createElement("div");
    typing.className = "bubble bot typing";
    typing.innerText = "Thinking...";
    chat.appendChild(typing);

    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    typing.remove();
    addMessage(data.reply, "bot");

    speak(data.reply);
  };

  recognition.start();

  // Auto-listen (continuous)
  recognition.onend = () => recognition.start();
}

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.95;
  speech.pitch = 1.2;
  window.speechSynthesis.speak(speech);
}