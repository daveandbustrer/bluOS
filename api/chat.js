export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing 'message' in request body" });
  }

  try {
    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [...(history || []), { role: "user", content: message }],
        }),
      },
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", errText);
      return res.status(502).json({ error: "Upstream API error" });
    }

    const data = await groqRes.json();
    const reply = data.choices[0].message.content;

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
