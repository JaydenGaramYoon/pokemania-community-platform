import config from './server/config/config.js';
import app from './server/express.js';
import mongoose from 'mongoose';
import cors from 'cors'; // ✅ added this line''

// Silence console output only in production to avoid hiding dev-time errors
if (process.env.NODE_ENV === 'production') {
  const _noop = () => {};
  console.log = console.info = console.warn = console.error = console.debug = _noop;
}

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database!");
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

// ✅ apply CORS before anything else - Simplified for Render deployment
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? 'https://pokemania-wvyd.onrender.com'
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    console.log('Server.js CORS origin check:', origin, 'NODE_ENV:', process.env.NODE_ENV);
    
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow all onrender.com origins or localhost
    if (allowedOrigins.includes(origin) || origin.includes('onrender.com') || origin.includes('localhost')) {
      return callback(null, true);
    } else {
      console.log('Server.js CORS blocked origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});

// to ensure the server starts correctly
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started on port ${PORT}`);
});


