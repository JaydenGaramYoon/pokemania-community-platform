# Pokemania - MERN Stack Community Web Platform

A comprehensive Pokemon game platform with full QA testing coverage using Postman collections.

## Overview

Pokemania is a full-stack web application that enables users to:
- Sign up and authenticate with JWT tokens
- Play Pokemon games and track scores
- Manage favorite Pokemon
- Send and receive messages
- View personal profiles
- Search Pokemon via integrated PokeAPI

**Key Feature**: 49 comprehensive Postman test cases covering Auth, User, Game, Profile, Favorites, Messaging, Admin, and Public APIs.

## Tech Stack

**Frontend**
- React 18 with Vite
- CSS Modules
- Responsive UI components

**Backend**
- Express.js
- MongoDB
- JWT Authentication
- Error handling middleware

**Testing**
- Postman Collections (8 APIs)
- Newman CLI support
- 51 test cases (Positive, Negative, Authorization, Edge cases)

## Project Structure

```
BBProject/
├── client/                    # React frontend
│   ├── src/components/        # Reusable components
│   ├── public/                # Static assets
│   └── package.json
│
├── server/                    # Express backend
│   ├── controllers/           # Business logic
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API endpoints
│   └── config/                # Configuration
│
├── api/postman/              # QA Test Collections
│   ├── *.postman_collection.json  # 8 API collections
│   └── environments/          # Test environment variables
│
└── package.json              # Root dependencies
```

## Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Install frontend dependencies
cd client
npm install
cd ..
```

## Running the Application

**Full Stack Development**
```bash
npm run dev
```
Runs Vite frontend (port 5173) and Express backend (port 3000) concurrently.

**Backend Only**
```bash
npm run server
# or
node server.js
```
Starts Express server on port 3000.

**Frontend Only**
```bash
cd client
npm run dev
```

## API Testing with Postman

### Quick Start
1. Import environment: `api/postman/environments/dev.postman_environment.json`
2. Import collections from `api/postman/` directory
3. Populate variables at runtime (tokens, credentials)
4. Run tests via Postman UI or Newman CLI

### Newman CLI
```bash
newman run "api/postman/Auth API.postman_collection.json" \
  -e "api/postman/environments/dev.postman_environment.json"
```

For detailed testing guide, see [api/README.md](api/README.md)

## API Testing Strategy

### Test Scope
- **Auth API**: Login, signup, JWT validation, token-based access
- **User API**: CRUD operations, user permissions, password management
- **Game API**: Score save/retrieve, update, delete operations
- **Profile API**: User profile management
- **Favorites API**: Pokemon favorites management with conflict handling
- **TalkTalk API**: Messaging system with edit/delete windows and XSS prevention
- **Admin API**: Role management and admin-only operations
- **Public API**: Pokemon search without authentication

### Test Case Types
- **Positive Cases**: Valid requests with expected successful responses
- **Negative Cases**: Invalid inputs, missing data, validation failures (400 errors)
- **Authorization Cases**: Missing/invalid tokens, insufficient permissions (401/403 errors)
- **Edge Cases**: Boundary conditions (e.g., message edit window expiration, duplicate entries)

### Validation Strategy
- **Status Code**: All tests verify HTTP status codes as the primary contract signal
- **Response Body**: Validated selectively when meaningful:
  - Authorization checks (token presence, role verification)
  - Error messages (ensuring correct error communication)
  - API dependencies (capturing data for subsequent test operations)
- **Minimal Assertions**: Unnecessary response validation avoided to reduce test fragility and maintenance burden

This approach follows real-world QA practices where tests focus on meaningful validations rather than comprehensive field-by-field comparisons.

## Environment Variable Management

### Policy
- **Variables are committed with empty values** in `api/postman/environments/dev.postman_environment.json`
- **Sensitive data (tokens, credentials) are set at runtime only**
- Never commit real tokens, passwords, or authentication values

### Variable Categories
- `BASE_URL`: Backend server address
- `TOKEN_U001-U005`: JWT authentication tokens (populated after login)
- `USER_ID_U001-U005`: User identifiers (populated after signup)
- Email/Password: Test credentials for authentication scenarios
- `GAME_ID_*`, `MESSAGE_ID_*`: Dynamic IDs captured from API responses

### Security
All sensitive values must be configured locally before testing or managed through secure CI/CD secret management systems. This approach ensures credentials never leak through version control.



## Test Design

**Test Categories**
- **Positive**: Valid requests and successful responses
- **Negative**: Invalid inputs and error handling
- **Security**: Authorization and authentication checks
- **Edge Cases**: Boundary conditions and special scenarios

**Validation Strategy**
- Status code verification (all tests)
- Response body validation (authorization, errors, and dependencies only)
- Minimal unnecessary assertions to reduce maintenance burden

See [api/README.md](api/README.md) for complete testing documentation.

## Environment Variables

### Required for Backend
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
NODE_ENV=development
```

### Required for Testing
Environment variables are configured in `api/postman/environments/dev.postman_environment.json`

**Security**: Sensitive values (tokens, credentials) are not committed. Set at runtime.

## Running API Tests

### Postman UI
1. Import environment: `api/postman/environments/dev.postman_environment.json`
2. Import collection files from `api/postman/` directory
3. Set environment to "Dev"
4. Click "Send" to run individual tests

### Newman CLI (Recommended for CI/CD)
Run all tests for a specific API:
```bash
cd api/postman
newman run "Auth API.postman_collection.json" \
  -e "environments/dev.postman_environment.json"
```

Run all collections with a report:
```bash
newman run "*.postman_collection.json" \
  -e "environments/dev.postman_environment.json" \
  --reporters cli,json \
  --reporter-json-export results.json
```

### Test Results
Test results are generated at runtime via Newman and are not stored in the repository. Each run produces fresh results based on current API state. This allows tests to remain version-controlled definitions while results remain environment-specific.

## Why Postman for API Testing

- **Fast API Validation**: Instant feedback on endpoint contracts and response structures
- **CI/CD Integration**: Newman CLI enables seamless automation in build pipelines
- **Maintainability**: Human-readable JSON format and UI-based test creation reduces friction
- **Environment Management**: Built-in variable system supports multi-environment testing without code changes



## Key Features

- User authentication with JWT tokens
- Game score tracking and history
- Favorites management system
- Real-time messaging with edit/delete windows
- User profile management
- Admin role management
- Pokemon search integration
- Input validation and XSS prevention
- Comprehensive error handling

## Security

- JWT tokens for authentication
- Password hashing
- Input validation on all endpoints
- CORS configuration
- XSS prevention in message system
- No credentials committed to repository

## Testing Coverage

49 test cases covering:
- Happy path scenarios
- Error handling (400, 401, 403, 404)
- Authorization checks
- Data validation
- Edge cases
- Security vulnerabilities (XSS)

## Future Enhancements

- WebSocket integration for real-time messaging
- Advanced Pokemon filtering options
- User leaderboard system
- Game replay functionality
- Mobile app version

## License

This project is part of COMP229 coursework and has been extended as a personal project for portfolio development. Includes comprehensive API testing practices and full-stack application architecture.

## Contact

- **Email**: garam.yoon.tech@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/garam-yoon/

For questions or issues, please reach out via the contact information above.
