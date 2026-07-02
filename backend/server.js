const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDatabase = require('./database/connection');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/contact', contactRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio backend is running.' });
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      if (port === 5000) {
        const fallbackPort = 5001;
        console.warn(`Port ${port} is already in use. Trying fallback port ${fallbackPort}...`);
        startServer(fallbackPort);
        return;
      }
      console.error(`Port ${port} is already in use. Set a different PORT in .env or stop the process using that port.`);
      process.exit(1);
    }

    console.error('Server error:', error);
    process.exit(1);
  });
}

async function start() {
  try {
    await connectDatabase();
    startServer(PORT);
  } catch (error) {
    console.error('Unable to start the server:', error);
    process.exit(1);
  }
}

start();
