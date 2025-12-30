# GitHub Secrets Configuration

This document explains how to configure GitHub Secrets for the API testing CI/CD pipeline.

## Setup Instructions

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Add each secret with the exact name and value shown below

## Required Secrets

### Authentication Tokens

| Secret Name | Example Value | Description |
|------------|---------------|-------------|
| `TOKEN_U001` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | JWT token for User 001 |
| `TOKEN_U002` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | JWT token for User 002 |
| `TOKEN_U003` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | JWT token for User 003 (regular user) |
| `TOKEN_U004` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | JWT token for User 004 (admin) |
| `TOKEN_U005` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | JWT token for User 005 |

### User IDs

| Secret Name | Example Value | Description |
|------------|---------------|-------------|
| `USER_ID_U001` | `6906c52492a658a3df9fd06e` | MongoDB ObjectID for User 001 |
| `USER_ID_U002` | `` | MongoDB ObjectID for User 002 |
| `USER_ID_U003` | `690952b7af0f23206bad2252` | MongoDB ObjectID for User 003 |
| `USER_ID_SET_TARGET` | `6906c52492a658a3df9fd06e` | Target user ID for admin role assignment |

### Passwords

| Secret Name | Example Value | Description |
|------------|---------------|-------------|
| `PASSWORD_U001` | `password123` | Password for User 001 |
| `PASSWORD_U002` | `password456` | Password for User 002 |
| `PASSWORD_U003` | `password789` | Password for User 003 |
| `PASSWORD_TEST_SHORT` | `abc` | Short password for validation testing |
| `PASSWORD_AUTH001` | `password123` | Password for AUTH test case 001 |
| `PASSWORD_AUTH002_INVALID` | `wrongpassword` | Invalid password for AUTH test case 002 |
| `PASSWORD_AUTH004` | `password789` | Password for AUTH test case 004 |
| `PASSWORD_AUTH_SIGNUP001` | `newpass123` | Password for signup test case 001 |
| `PASSWORD_AUTH_SIGNUP002` | `newpass456` | Password for signup test case 002 |
| `PASSWORD_AUTH_SIGNUP003_SHORT` | `ab` | Short password for signup validation |

### Email Addresses

| Secret Name | Example Value | Description |
|------------|---------------|-------------|
| `EMAIL_U001` | `misty@example.com` | Email for User 001 |
| `EMAIL_U002` | `user2@example.com` | Email for User 002 |
| `EMAIL_U003` | `garam@example.com` | Email for User 003 |
| `EMAIL_TEST_DUPLICATE` | `misty@example.com` | Duplicate email for testing |
| `EMAIL_TEST_NOTFOUND` | `notfound@example.com` | Non-existent email for testing |
| `EMAIL_TEST_SHORT` | `a@b` | Short email for validation testing |

## How to Get Token Values

### Option 1: From Postman (if you have test data locally)

1. Run a signup or login test in Postman
2. The response will contain the JWT token
3. Copy the full token value

### Option 2: From Server Logs

1. Start the backend server locally
2. Create test users via API
3. Capture the tokens from response headers

### Option 3: Manual JWT Creation (Node.js)

```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  {
    _id: "USER_ID_HERE",
    name: "User Name",
    email: "user@example.com",
    role: "user"
  },
  "your-secret-key",
  { expiresIn: "7d" }
);

console.log(token);
```

## Testing Secrets Locally

Before deploying secrets, test them locally:

```bash
# Create test environment with secrets
cat > api/postman/environments/test.postman_environment.json << EOF
{
  "id": "test-env",
  "name": "Test",
  "values": [
    {
      "key": "BASE_URL",
      "value": "http://localhost:3000"
    },
    {
      "key": "TOKEN_U001",
      "value": "YOUR_TOKEN_HERE"
    }
  ]
}
EOF

# Run tests
npm run api:test:auth -- -e api/postman/environments/test.postman_environment.json
```

## Security Notes

- **Never commit secrets** to the repository
- Secrets are **encrypted** by GitHub
- Secrets are **masked** in workflow logs
- Only use secrets that are **absolutely necessary**
- Rotate tokens periodically for security
- Use **environment-specific secrets** if possible (dev, staging, prod)

## Troubleshooting

### Secrets not appearing in workflow

1. Check that secret names **match exactly** (case-sensitive)
2. Verify secrets are set in the correct repository, not organization level
3. Try re-running the workflow after adding new secrets

### API tests failing with 401 errors

1. Verify token values are current and not expired
2. Ensure tokens are for the correct user accounts
3. Check that user accounts exist in the database

### API tests failing with 404 errors on user endpoints

1. Verify `USER_ID_*` values match actual users in database
2. Check that user IDs are valid MongoDB ObjectIDs
3. Ensure users exist before running tests

## Environment Variables Not Used as Secrets

Some variables are left empty in CI environment and will be populated during test execution:

- `GAME_ID_*` - Auto-populated by test responses
- `MESSAGE_ID_*` - Auto-populated by test responses
- `FAV-DEL-001` - Auto-populated by test responses
- `SENDER_U001`, `SENDER_GUEST` - Can be left empty

