import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import gameRoutes from './routes/game.routes.js';
import favouritesRoutes from './routes/favourites.routes.js';
import profileRoutes from './routes/profile.routes.js';
import messageRoutes from './routes/message.routes.js';
const app = express();

import path from "path";
import { fileURLToPath } from "url";
import url from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CURRENT_WORKING_DIR = process.cwd();



// ✅ Apply CORS at the top
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://pokemania-wvyd.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "http://localhost:3000",
          "https://pokeapi.co",
          "https://pokemania-wvyd.onrender.com"
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://raw.githubusercontent.com",
          "https://pokeapi.co",
          "https://wallpapercave.com",
          "https://images.seeklogo.com"
        ],
        scriptSrc: [
          "'self'",
          "https://pokemania-wvyd.onrender.com",
          "'unsafe-inline'"
        ],
        styleSrc: [
          "'self'",
          "https://pokemania-wvyd.onrender.com",
          "https://fonts.googleapis.com",
          "https://fonts.cdnfonts.com",
          "'unsafe-inline'"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://fonts.cdnfonts.com"
        ],
      },
    },
  })
);

// ✅ Register routes AFTER CORS is enabled
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);
// Backwards compatibility: accept /auth/* endpoints used by older builds
app.use('/auth', authRoutes);
// NOTE: We previously mounted auth routes at root; prefer '/api' now but keep '/auth' for older clients.
app.use('/api', gameRoutes);
app.use('/api', favouritesRoutes);
app.use('/api', profileRoutes);
app.use('/api', messageRoutes);
// Serve static files from the React app build directory (dist/app)
// Static file serving must come BEFORE SPA fallback
// Serve only the latest build artifacts
app.use(express.static(path.join(__dirname, '../dist/app')));
// Explicitly serve files under /images (dist/app/images)
app.use('/images', express.static(path.join(__dirname, '../dist/app/images')));

// Debug log: log image and signin requests
app.use((req, res, next) => {
  if (req.path.startsWith('/images') || req.path.includes('signin')) {
    console.log('[STATIC DEBUG] Request:', req.method, req.path);
  }
  next();
});



// ✅ Error handler
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message });
    console.log(err);
  }
});

// SPA fallback: send index.html for any non-API, non-static route
// This must be the LAST route handler
// SPA fallback: return dist/app/index.html for all non-/api/ requests
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, '../dist/app/index.html'));
});

export default app;



