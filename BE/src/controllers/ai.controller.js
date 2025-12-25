import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    const response = await client.chat.completions.create({
      model: process.env.OPENAI_ASSISTANT_MODEL,
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: message }
      ],
      max_tokens: Number(process.env.OPENAI_ASSISTANT_MAX_TOKENS),
    });

    res.json({
      answer: response.choices[0].message.content,
    });

  } catch (err) {
    console.error("❌ OpenAI error:", err);
    res.status(500).json({ error: "AI error" });
  }
};
