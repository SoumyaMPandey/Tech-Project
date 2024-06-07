const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios'); // Import axios

const app = express(); // Create app instance

dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6040;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);

app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ error: 'Error getting the messages' });
    }
});

app.post('/messages', async (req, res) => {
    const { text } = req.body;
    try {
        const newMessage = await Message.create({ text });
        res.json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Error creating message' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});