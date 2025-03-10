import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ChatGroq } from "@langchain/groq";
import multer from "multer";

dotenv.config();

const upload = multer({dest: 'uploads/'});
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize the ChatGroq model
const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0,
  model: "mistral-saba-24b", // Replace with a valid model name if needed
});

app.post("/upload", upload.single('file'), async (req, res, next) => {
  console.log(req.file.originalname);
})

// Define a POST endpoint for interacting with the AI
app.post("/chat", async (req, res) => {
  try {
    // Get the user's message from the request body
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call the ChatGroq model with the user's message
    const response = await llm.invoke([{ role: "user", content: userMessage }]);

    // Send the response back to the client
    res.json({ reply: response.content });
  } catch (error) {
    console.error("Error interacting with ChatGroq:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

