require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ChatGroq } = require("@langchain/groq");


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const llm = new ChatGroq({
    groqAIApi: process.env.GROQ_API_KEY,
    temperature: 0,
    model: "mixtral-8x7b-32768", // Ensure this model exists or replace with a supported one
});

// Define a POST endpoint for interacting with the AI
app.post('/chat', async (req, res) => {
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
        console.error('Error interacting with ChatGroq:', error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
