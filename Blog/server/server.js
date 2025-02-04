const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const BlogRoute = require('./Routes/BlogRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/blogs', BlogRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});