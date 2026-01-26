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

app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist/app")));

// ✅ Apply CORS at the top
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
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
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/api', gameRoutes);
app.use('/api', favouritesRoutes);
app.use('/api', profileRoutes);
app.use('/api', messageRoutes);
// Serve static files from the React app build directory (dist/app)
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/dist/app')));

// app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/game', gameRoutes);
// app.use('/api/favourites', favouritesRoutes);
// app.use('/api/profiles', profileRoutes);
// app.use('/api', messageRoutes);

// ✅ Error handler
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message });
    console.log(err);
  }
});

// // Handle React routing, return all requests to React app
// app.get('/.*/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/app', 'index.html'));
// });

app.use((req, res, next) => {
  const parsedUrl = url.parse(req.url).pathname;

  if (parsedUrl.startsWith('/api/')) {
    return next(); // API는 pass
  }

  res.sendFile(path.join(__dirname, '../client/dist/app', 'index.html'));
});

export default app;


// import express from 'express';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import compress from 'compression';
// import cors from 'cors';
// import helmet from 'helmet';
// import url from 'url'; // ✅ url 모듈 import

// import userRoutes from './routes/user.routes.js';
// import authRoutes from './routes/auth.routes.js';
// import gameRoutes from './routes/game.routes.js';
// import favouritesRoutes from './routes/favourites.routes.js';
// import profileRoutes from './routes/profile.routes.js';
// import messageRoutes from './routes/message.routes.js';

// import path from 'path';
// import { fileURLToPath } from 'url';

// const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const CURRENT_WORKING_DIR = process.cwd();

// app.use(express.static(path.join(CURRENT_WORKING_DIR, 'dist/app')));

// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'http://localhost:3000',
//     'https://pokemania-wvyd.onrender.com'
//   ],
//   credentials: true
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(compress());
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       connectSrc: [
//         "'self'",
//         "https://pokeapi.co",
//         "https://pokemania-wvyd.onrender.com"
//       ],
//       imgSrc: [
//         "'self'",
//         "data:",
//         "https://raw.githubusercontent.com",
//         "https://pokeapi.co",
//         "https://wallpapercave.com",
//         "https://images.seeklogo.com"
//       ],
//       scriptSrc: [
//         "'self'",
//         "https://pokemania-wvyd.onrender.com",
//         "'unsafe-inline'"
//       ],
//       styleSrc: [
//         "'self'",
//         "https://pokemania-wvyd.onrender.com",
//         "https://fonts.googleapis.com",
//         "https://fonts.cdnfonts.com",
//         "'unsafe-inline'"
//       ],
//       fontSrc: [
//         "'self'",
//         "https://fonts.gstatic.com",
//         "https://fonts.cdnfonts.com"
//       ],
//     },
//   }
// }));

// // ✅ Register API routes
// app.use('/', userRoutes);
// app.use('/', authRoutes);
// app.use('/', gameRoutes);
// app.use('/', favouritesRoutes);
// app.use('/', profileRoutes);
// app.use('/', messageRoutes);

// app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

// // ✅ Serve static files
// app.use(express.static(path.join(__dirname, '../client/public')));
// app.use(express.static(path.join(__dirname, '../client/dist/app')));

// // ✅ 라우팅 아닌 모든 요청은 React index.html로
// app.use((req, res, next) => {
//   const parsedUrl = url.parse(req.url).pathname;
//   if (parsedUrl.startsWith('/api/')) return next();
//   res.sendFile(path.join(__dirname, '../client/dist/app', 'index.html'));
// });

// // ✅ 에러 핸들러
// app.use((err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401).json({ error: err.name + ': ' + err.message });
//   } else if (err) {
//     res.status(400).json({ error: err.name + ': ' + err.message });
//     console.log(err);
//   }
// });


// export default app;
