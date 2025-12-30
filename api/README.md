# Postman API Test Collections

This repository contains Postman collections for comprehensive API testing including functional, negative, and authorization test cases.

## Test Scope

8 API collections with 49 test cases covering:
- Authentication (Login, Signup, Signout)
- User management (CRUD operations)
- Game score management
- Messaging system
- Favorites management
- Profile management
- Admin operations
- Public Pokemon search API

Test categories: Positive, Negative, Edge cases, Security/Authorization

## Environment Variables

Environment variables are committed with empty values. Sensitive data (tokens, credentials) must be set at runtime.

Required variables:
- `BASE_URL`: Backend server address (default: http://localhost:3000)
- `TOKEN_U001` through `TOKEN_U005`: User authentication tokens
- `USER_ID_U001` through `USER_ID_U005`: User identifiers
- Email, password, and test data credentials
- Game/Message IDs (auto-populated during test execution)

See `environments/dev.postman_environment.json` for complete variable definitions.

## Running Tests

### Using npm scripts (recommended)
```bash
# Individual collections
npm run api:test:auth          # Auth API
npm run api:test:user          # User API
npm run api:test:favourites    # Favourites API
npm run api:test:game          # Game API
npm run api:test:talktalk      # TalkTalk API
npm run api:test:admin         # Admin API
npm run api:test:profile       # Profile API
npm run api:test:public        # Public API (Search)

# All collections
npm run api:test:all
```

### Postman UI
1. Import environment: `environments/dev.postman_environment.json`
2. Import collections from `postman/` directory
3. Populate environment variables at runtime
4. Click Send to run individual tests

### Newman CLI (direct)
```bash
npx newman run "api/postman/Auth API.postman_collection.json" \
  -e "api/postman/environments/dev.postman_environment.json"
```

## Available Collections

- **Auth API.postman_collection.json**: User authentication & signup
- **User API.postman_collection.json**: User CRUD & password management
- **Favourites API.postman_collection.json**: Pokemon favorites management
- **Game API.postman_collection.json**: Game score operations
- **TalkTalk API.postman_collection.json**: Messaging system
- **Profile API.postman_collection.json**: User profile management
- **Admin API.postman_collection.json**: Admin role assignment
- **Public API (Search).postman_collection.json**: Pokemon search

## Test Design Rationale

**Status Code Validation**: All tests verify HTTP status codes as the primary contract signal.

**Response Body Validation**: Applied selectively only when business logic impacts results:
- Authorization/permission checks require verification
- Error messages must be validated for security
- Subsequent API dependencies require response data capture

Unnecessary response validation is avoided to reduce maintenance burden and test fragility.

## Security

Do not commit real credentials or tokens to this repository. All sensitive values must be configured locally or through secure CI/CD secret management.

## Collections Overview

| Collection | Tests | Focus |
|-----------|-------|-------|
| Auth API | 7 | Login, signup, token validation |
| User API | 11 | User CRUD, permissions, password |
| Game API | 8 | Score save, update, delete |
| Profile API | 3 | Profile CRUD operations |
| Favourites API | 6 | Favorites management |
| TalkTalk API | 6 | Messaging, edit window, XSS |
| Admin API | 3 | Role management, permissions |
| Public API | 5 | Pokemon search (no auth required) |

