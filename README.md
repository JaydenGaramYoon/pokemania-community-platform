## API Automation (Postman + Newman)

This branch includes a dedicated **API automation suite** implemented with **Postman and Newman**, designed to validate backend functionality independently from the UI.

The automation covers **49 API test cases across 8 Postman collections**, focusing on real-world QA scenarios such as functional validation, negative testing, authorization control, and edge case handling.

### Coverage Highlights
- JWT-based authentication and token lifecycle handling
- Role-based authorization (user vs admin)
- Core business logic validation (games, profiles, favourites, messaging)
- Negative scenarios and boundary conditions
- CLI-based automated execution using Newman
- CI-ready structure with secure environment variable management

➡️ **Detailed API automation documentation is available here:**  
**[api/README.md](api/README.md)**

> Note: All environment variables are committed with empty values.  
> Tokens and sensitive data are generated and injected only at runtime.
