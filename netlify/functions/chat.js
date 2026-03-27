let conversation = [];

export async function handler(event) {
  const { message } = JSON.parse(event.body);

  conversation.push({ role: "user", content: message });

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: conversation
    })
  });

  const data = await response.json();
  const reply = data.output[0].content[0].text;

  conversation.push({ role: "assistant", content: reply });

  return {
    statusCode: 200,
    body: JSON.stringify({ reply })
  };
}