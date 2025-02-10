const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Create the public directory and move your HTML/JS files there
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});