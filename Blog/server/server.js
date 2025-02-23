import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './Routes/BlogRoute.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/blogs', router);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});