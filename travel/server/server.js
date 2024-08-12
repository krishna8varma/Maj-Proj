const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
const bodyParser = require('body-parser');


const port = 5000;

// Enable CORS


// Parse incoming JSON data
app.use(bodyParser.json());

// Endpoint for handling POST requests
app.post('/', (req, res) => {
    const formData = req.body;
    console.log('Received data:', formData);
    // Process the form data (e.g., save to database)
    res.status(200).send('Data received successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});