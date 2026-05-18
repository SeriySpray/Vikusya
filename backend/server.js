const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for GitHub Pages and Local Dev
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');

// Helper to read DB
const readDB = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        return [];
    }
};

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Drift NoSQL API is running. Use /api/garage to get data.');
});

// API Routes
app.get('/api/garage', (req, res) => {
    try {
        const drifters = readDB();
        res.json(drifters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Using JSON-based NoSQL database at ${dbPath}`);
});
