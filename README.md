 # PokeMania | Team-Based MERN Application

## Project Overview

**PokeMania** is a collaborative full-stack MERN web application developed by the Bright Bridge (BB) team as part of the COMP229 – Web Application Development course.

The core application was built through team-based development, covering frontend, backend, database design, and feature implementation.  


## 👥 Team Contributions & Role Distribution

Each team member was responsible for specific functional and technical areas of the system.  
The contribution distribution below reflects the agreed scope documented in the project slides and External Design Document (EDD).

### Team Members & Responsibilities

| Name | Responsibilities |
|---|---|
| Garam Yoon | Project Manager, Front-End Developer, Back-End Developer, Database Design, Home / Favourites / Game / Profile pages, Debugging, CI/CD testing, Deployment, **API Automation & Quality Assurance** → see [qa-testing branch](https://github.com/JaydenGaramYoon/pokemania-community-platform/tree/qa-testing) for individual QA work |
| Chun Wai Chung | Front-End Developer, Back-End Developer, Database Design, Profile page implementation, Slides preparation, External Design Document (EDD) |
| Fengyuan Yang | Front-End Developer, Back-End Developer, Database Design, TalkTalk (forum/chat) feature, Jira management, Debugging |
| Tak Sum Li | Front-End & Back-End Developer, Database Design, Sign Up / Login functionality, YouTube demo video, End-to-End (E2E) testing |


## 🎯 System Features & Functionality

### Core Features

1. **Home / Pokémon Search**
   - Real-time Pokémon search using PokéAPI integration
   - Browse Pokémon by ID or name
   - View detailed stats, types, and abilities
   - Public API endpoint (no authentication required)

2. **User Authentication & Authorization**
   - Secure sign-up and login with JWT tokens
   - Password hashing with salt
   - Session management
   - Role-based access control (User, Admin)

3. **Favorites Management**
   - Add/remove favorite Pokémon
   - Add custom memos and notes to favorites
   - User-specific favorite lists
   - Edit and delete operations with authorization checks

4. **Game Module**
   - Game score tracking system
   - Save, update, and retrieve game scores
   - User score history and statistics
   - Persistent score storage

5. **TalkTalk - Community Forum**
   - Public messaging system (guest + authenticated users)
   - Multiple discussion sections (General, Guides, Fanart, etc.)
   - Message editing with time-window restriction (1 minute)
   - XSS prevention and content sanitization
   - Real-time message delivery

6. **User Profiles**
   - Customizable user profiles
   - Profile picture/banner uploads
   - Display name, title, location, summary
   - Favorite Pokémon types tracking
   - Account management and deletion

7. **Admin Dashboard**
   - User management (list, view, delete)
   - Role assignment (User ↔ Admin promotion)
   - System-level monitoring
   - Admin-only API endpoints


## 🏗️ System Architecture

### Technology Stack

**Frontend:**
- React.js with Vite
- CSS Modules for styling
- Axios for HTTP requests
- React Router for navigation

**Backend:**
- Node.js with Express.js
- RESTful API design
- JWT authentication
- CORS enabled

**Database:**
- MongoDB
- Mongoose ODM
- Collections: users, profiles, favorites, games, messages

**Deployment:**
- Render.com (Backend hosting)
- Vercel (Frontend hosting)
- GitHub Actions (Continuous Integration)


## 📊 API Endpoints Overview

### Authentication APIs
- `POST /auth/signin` - User login
- `GET /auth/signout` - User logout
- `POST /api/users` - User registration

### User APIs
- `GET /api/users` - List all users (Admin only)
- `GET /api/users/me` - Get current user
- `GET /api/users/{userId}` - Get user by ID
- `PUT /api/users/{userId}` - Update user profile
- `DELETE /api/users/{userId}` - Delete user account
- `PUT /api/users/{userId}/password` - Change password
- `PUT /api/users/{userId}/role` - Set user role (Admin only)

### Favorites APIs
- `POST /api/favourites` - Add favorite
- `GET /api/favourites` - Get user's favorites
- `PATCH /api/favourites/{userId}/{pokemonId}` - Edit favorite
- `DELETE /api/favourites/{userId}/{pokemonId}` - Remove favorite

### Game APIs
- `POST /api/game` - Save game score
- `GET /api/game/user/{userId}` - Get user's game scores
- `PUT /api/game/{gameId}` - Update score
- `DELETE /api/game/{gameId}` - Delete score

### Message APIs
- `POST /messages` - Post new message
- `PUT /messages/{messageId}` - Edit message (within 1 minute)
- `DELETE /messages/{messageId}` - Delete message
- `GET /messages` - Get all messages

### Profile APIs
- `POST /api/profile` - Create user profile
- `PUT /api/profile/users/{userId}` - Update profile
- `DELETE /api/profile/users/{userId}` - Delete profile

### Public APIs
- `GET https://pokeapi.co/api/v2/pokemon/{id}` - Search Pokémon by ID
- `GET https://pokeapi.co/api/v2/pokemon/{name}` - Search Pokémon by name


## 🔐 Security Features

- **Authentication:** JWT-based token authentication
- **Authorization:** Role-based access control (RBAC)
- **Password Security:** Bcrypt hashing with salt
- **Input Validation:** Server-side validation for all inputs
- **XSS Prevention:** Content sanitization in message system
- **CORS:** Configured for specific origin access
- **Environment Variables:** Sensitive data in .env files
- **Token Management:** Secure token storage and expiration

## �️ Database Design

PokeMania uses **MongoDB** with Mongoose ODM for flexible document-based data storage. The database consists of 5 main collections with relationships optimized for the application's core features.

### Database Collections & Schema

#### 1. **Users Collection**
Stores user account information and authentication data.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Unique user identifier | Primary key (auto-generated) |
| `name` | String | User's display name | Required, trimmed |
| `email` | String | User email address | Required, unique, must be valid email format |
| `role` | String | User role | Enum: `'user'` or `'admin'`, default: `'user'` |
| `hashed_password` | String | Encrypted password | Required, min 6 characters |
| `salt` | String | Password salt for encryption | Auto-generated per user |
| `created` | Date | Account creation timestamp | Default: current date |
| `updated` | Date | Last update timestamp | Default: current date |

**Relationships:**
- One-to-One with Profile (userId reference)
- One-to-Many with Favorites (user reference)
- One-to-Many with Game scores (user reference)

---

#### 2. **Profiles Collection**
Stores detailed user profile information.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Unique profile identifier | Primary key (auto-generated) |
| `userId` | ObjectId | Reference to User | Required, foreign key |
| `name` | String | User's profile name | Required |
| `bannerUrl` | String | Profile banner image URL | Default: empty string |
| `iconUrl` | String | Profile picture/icon URL | Default: empty string |
| `title` | String | User's title/tagline | Default: empty string |
| `location` | String | User's location | Default: empty string |
| `summary` | String | User's bio/summary | Default: empty string |
| `types` | [String] | Array of favorite Pokémon types | Array of strings |
| `details` | [String] | Additional profile details | Array of strings |
| `timestamps` | Object | Created/updated times | Auto-managed |

**Relationships:**
- Many-to-One with User (userId reference)

---

#### 3. **Favorites Collection**
Stores user's favorite Pokémon with personal notes.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Unique favorite record identifier | Primary key (auto-generated) |
| `user` | ObjectId | Reference to User | Required, foreign key |
| `pokemonId` | Number | PokéAPI Pokémon ID | Required |
| `memo` | String | User's custom note/memo | Default: empty string |

**Relationships:**
- Many-to-One with User (user reference)

---

#### 4. **Games Collection**
Stores game session scores and performance data.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Unique game record identifier | Primary key (auto-generated) |
| `user` | ObjectId | Reference to User | Required, foreign key |
| `score` | Number | Game score earned | Required |
| `playedAt` | Date | Timestamp of game session | Default: current date |

**Relationships:**
- Many-to-One with User (user reference)

---

#### 5. **Messages Collection**
Stores TalkTalk forum/chat messages.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Unique message identifier | Primary key (auto-generated) |
| `section` | String | Forum section category | e.g., "General", "Guides", "Fanart" |
| `sender` | String | Username or guest identifier | Required |
| `message` | String | Message content | Required, sanitized |
| `timestamp` | Date | Message creation time | Default: current date |

---

### Database Relationships (ER Model)

```
┌─────────────┐         One-to-One        ┌──────────────┐
│    Users    │◄─────────────────────────►│  Profiles    │
│  (_id, email)                           │ (userId)     │
└─────────────┘                           └──────────────┘
      │
      │ One-to-Many
      ├─────────────────────┬──────────────────────┬─────────────────────┐
      │                     │                      │                     │
      ▼                     ▼                      ▼                     ▼
┌──────────────┐      ┌──────────────┐    ┌──────────────┐      ┌──────────────┐
│  Favorites   │      │    Games     │    │  Messages    │      │   (Future)   │
│ (user, pkmId)       │  (user)      │    │  (section)   │      │              │
└──────────────┘      └──────────────┘    └──────────────┘      └──────────────┘
```

### Key Design Decisions

1. **Document-Based NoSQL:** MongoDB allows flexible schema for scalability and nested data structures
2. **Foreign Key References:** ObjectId references maintain relational integrity
3. **Timestamps:** Automatic tracking of created/updated times for audit trails
4. **Password Security:** Bcrypt hashing with unique salts per user
5. **Denormalization Options:** Arrays in Profile (types, details) for frequently accessed data
6. **Collection Naming:** Singular/plural conventions for consistency (Users, Favorites, Games, Messages)

### Indexing Strategy

- **Users.email:** Unique index for fast login queries
- **Favorites.user:** Index for quick favorite retrieval per user
- **Games.user:** Index for score history queries
- **Messages.timestamp:** Index for message ordering and pagination

## 📁 Project Structure

```
.
├── client/                           # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Shared App, Layout components
│   │   │   ├── Home/                # Home/Search page
│   │   │   ├── Login/               # Authentication page
│   │   │   ├── Favourites/          # Favorites management
│   │   │   ├── Game/                # Game module
│   │   │   ├── Profile/             # User profile
│   │   │   └── Talktalk/            # Forum/messaging
│   │   ├── assets/                  # Images, icons, fonts
│   │   └── MainRouter.jsx           # Route definitions
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── server/                           # Backend Node.js/Express application
│   ├── controllers/                 # Business logic
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── favourites.controller.js
│   │   ├── game.controller.js
│   │   ├── message.controller.js
│   │   ├── profile.controller.js
│   │   └── admin.controller.js
│   ├── models/                      # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── profile.model.js
│   │   ├── favourites.model.js
│   │   ├── game.model.js
│   │   └── message.model.js
│   ├── routes/                      # API route definitions
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── favourites.routes.js
│   │   ├── game.routes.js
│   │   ├── message.routes.js
│   │   ├── profile.routes.js
│   │   └── admin.routes.js
│   ├── helpers/                     # Utility functions
│   │   └── dbErrorHandler.js
│   ├── config/
│   │   └── config.js                # Database configuration
│   ├── express.js                   # Express app setup
│   ├── assets-router.js             # Static file routing
│   └── package.json
│
├── api/                             # API Testing & QA Automation
│   ├── postman/
│   │   ├── Auth API.postman_collection.json
│   │   ├── User API.postman_collection.json
│   │   ├── Favourites API.postman_collection.json
│   │   ├── Game API.postman_collection.json
│   │   ├── TalkTalk API.postman_collection.json
│   │   ├── Admin API.postman_collection.json
│   │   ├── Profile API.postman_collection.json
│   │   ├── Public API (Search).postman_collection.json
│   │   └── environments/
│   │       └── dev.postman_environment.json
│   ├── newman/                      # Newman CLI reports
│   │   ├── reports/
│   │   └── screenshots/
│   └── README.md                    # Detailed API testing documentation
│
├── .github/
│   ├── workflows/
│   │   └── api-tests.yml           # GitHub Actions CI/CD pipeline
│   └── SECRETS.md                  # GitHub Secrets configuration guide
│
├── server.js                        # Entry point for backend
├── package.json                     # Root dependencies
├── cypress.config.js               # E2E testing configuration
└── README.md                       # Project overview
```

### CI/CD Pipeline
- GitHub Actions workflow for automated API testing
- Triggers on: push to main, qa-testing, develop branches
- Test execution: Public API baseline (expandable)
- Report generation: HTML and JSON formats
- Artifact storage: 30-day retention


## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn
- Postman (optional, for manual testing)

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd pokemania-community-platform
```

**2. Install dependencies**
```bash
# Root
npm install

# Frontend
cd client && npm install && cd ..

# Backend
cd server && npm install && cd ..
```

**3. Configure environment variables**
```bash
# Backend .env
MONGODB_URI=mongodb://localhost:27017/pokemania
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=3000

# Frontend .env (if needed)
VITE_API_URL=http://localhost:3000
```

**4. Start the application**
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
cd client && npm run dev
```

**5. Access the application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`


## 📝 Environment Setup

### Development Environment
- MongoDB running locally or connected to Atlas
- Node.js development server on port 3000
- React dev server on port 5173
- Postman environment variables configured

### Production Environment
- Backend hosted on Render.com
- Frontend hosted on Vercel
- MongoDB Atlas for database
- GitHub Actions for CI/CD


## 🔗 Important Links

- **Repository:** [GitHub Repository](https://github.com/JaydenGaramYoon/pokemania-community-platform)
- **PokéAPI Documentation:** [PokéAPI Docs](https://pokeapi.co/docs/v2)


## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack MERN development
- RESTful API design and implementation
- Database design and MongoDB operations
- Authentication and authorization
- Error handling and validation
- Testing and quality assurance
- CI/CD pipeline implementation
- Team collaboration and version control
- Security best practices
- Responsive frontend design


## 📞 Support & Contribution

For issues, feature requests, or contributions:
1. Create an issue on the GitHub repository
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

---

**Last Updated:** December 2025  
**Course:** COMP229 – Web Application Development  
**Team:** Bright Bridge (BB)  
**Status:** Production Ready
