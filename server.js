const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDb = require('./config/db');
// Load env vars
dotenv.config({ path: './config/config.env' });
// Connect to database
connectDb();

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body Parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
// ENV PORT name loaded
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
// Handle unhandles promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bgBlack);
  // Close server & exit process
  server.close(() => process.exit(1));
});
