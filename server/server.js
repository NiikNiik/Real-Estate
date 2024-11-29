const express = require('express');
const app = express();

const connectDB = require('./config/db');
connectDB();

require('dotenv').config();

// Middleware
app.use(express.json());

// Import routes
require('./routes/userRoutes')(app);
require('./routes/housesRoutes')(app);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
