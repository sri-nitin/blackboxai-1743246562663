const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoints would be added here in a real implementation
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});

// All other routes return the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`SafetyGuard app listening at http://localhost:${port}`);
});