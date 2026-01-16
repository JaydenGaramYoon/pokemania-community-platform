# API Automation & Quality Analysis | PokeMania

## Important Links 🔗

- **System & DB Design:** [GitHub Repository](https://github.com/JaydenGaramYoon/pokemania-community-platform)
- **QA Testing Branch:** [qa-testing branch](https://github.com/JaydenGaramYoon/pokemania-community-platform/tree/qa-testing)
- **API Testing Guide:** [API README](./api/README.md)
- **GitHub Secrets Setup:** [SECRETS Guide](./.github/SECRETS.md)
- **PokéAPI Documentation:** [PokéAPI Docs](https://pokeapi.co/docs/v2)

---

## API Automation Overview

This project includes a dedicated **API automation suite** implemented with **Postman and Newman**, designed to validate backend functionality independently from the UI.

The automation covers **49 API test cases across 8 Postman collections**, targeting real-world QA scenarios such as functional validation, negative testing, authorization control, and edge case handling.

### Coverage Highlights
- JWT-based authentication and token lifecycle handling
- Role-based authorization (user vs admin)
- Core business logic validation (games, profiles, favourites, messaging)
- Negative scenarios and boundary conditions
- CLI-based automated execution using Newman
- CI-ready structure with secure environment variable management

> Note: All environment variables are committed with empty values.  
> Tokens and sensitive data are generated and injected only at runtime.

---

## Project Structure

This repository is organised to clearly separate application code from QA automation artifacts.

```
.
├── client/            # Frontend application
├── server/            # Backend application
├── api/               # API automation and QA artifacts
│   ├── postman/       # Postman collections and environments
│   └── README.md      # Detailed API testing documentation
└── README.md          # Project overview and quality analysis
```

### API Automation Directory (/api)

The /api directory contains all resources related to API automated testing and quality validation.
It is intentionally separated from the application source code to clearly distinguish test definitions from implementation logic.

This directory serves as the primary entry point for reviewing the QA scope of this project.

---

## API Test & Quality Analysis Report (v1.0)

In addition to automated execution, this project includes a **formal API test and quality analysis report** that evaluates the effectiveness and reliability of the test suite beyond simple pass or fail results.

The analysis focuses on identifying defect patterns, assessing test depth, and evaluating overall release readiness based on observed test outcomes.



### Sample API Test Cases

The following table presents a curated subset of representative API test cases from the full test suite.  

<img width="1373" height="747" alt="image" src="https://github.com/user-attachments/assets/3769b3df-9192-422e-bc8a-22c491d6d71a" />

These cases were selected to demonstrate coverage across **negative scenarios, edge conditions, authorization control, and core business rules**.

The samples reflect how test cases were designed at both unit and integration levels, with clear traceability to requirements and explicit validation of expected system behaviour.



### Test Metrics Summary

**Last Updated:** 2026-01-16T07:29:09.332Z

| API | Tests | Passed/Total | Pass Rate | Status |
|-----|-------|-------------|-----------|--------|
| ADMIN | 3 | 1/3 | 33.3% | ❌ FAIL |
| AUTH | 7 | 5/7 | 71.4% | ❌ FAIL |
| FAVOURITES | 6 | 4/6 | 66.7% | ❌ FAIL |
| GAME | 8 | 6/8 | 75.0% | ❌ FAIL |
| PROFILE | 3 | 2/3 | 66.7% | ❌ FAIL |
| PUBLIC | 5 | 5/5 | 100.0% | ✅ PASS |
| TALKTALK | 6 | 6/6 | 100.0% | ✅ PASS |
| USER | 11 | 8/11 | 72.7% | ❌ FAIL |

**Overall Result:** 37/49 tests passed **(75.5% pass rate)**

These results indicate the majority of core functionality is working correctly, with failures concentrated in ADMIN operations, token validation, and profile management areas. The two fully passing collections (PUBLIC and TALKTALK) demonstrate robust search and messaging capabilities.

---

### Defect Workflow and Severity Overview

<p align="center">
  <img width="648" height="530" alt="Defect Workflow and Severity Distribution"
       src="https://github.com/user-attachments/assets/407fd813-d45f-4ef7-9529-17226668f2b8" />
</p>
<p align="center">
  <em>Figure 2. Defect workflow status and severity distribution</em>
</p>

High-severity defects were primarily related to authentication failures, token validation, and backend synchronization issues that directly impacted session stability and core functionality.

---

### Quality Insights

- **Current Status**: 75.5% of test cases are passing (37/49). Public search and messaging APIs are fully functional, while admin operations and user profile management require additional remediation.
- **Defect Categories**: Identified 12 failures primarily concentrated in authorization validation (ADMIN: 2 failures, AUTH: 2 failures) and data retrieval layers.
- **Impact Assessment**: Failures in ADMIN and AUTH APIs are blocking higher-priority issues, while FAVOURITES, GAME, and PROFILE failures have medium priority.
- **Remediation Progress**: Authorization middleware has been enhanced with improved ObjectId comparison and role-based access controls currently under verification.

---

### Next Steps and Improvement Areas

- **Immediate Priority**: Resolve authorization failures in ADMIN and AUTH APIs through enhanced token validation.
- **Testing Enhancements**: Expand test coverage for multi-user session scenarios and edge cases in profile updates.
- **CI/CD Integration**: Implement automated regression testing to validate fixes before merging to production.
- **Defect Prevention**: Establish code review guidelines focused on authorization logic and ObjectId handling in MongoDB queries.

---

### Conclusion

The QA phase has validated core API functionality with a **75.5% test pass rate** across 49 comprehensive test cases.

**Key Findings:**
- **2 collections (PUBLIC, TALKTALK)** achieved 100% pass rates, indicating production-ready search and messaging features
- **6 collections** remain under remediation, primarily due to authorization middleware improvements and token validation enhancements
- **Defect categorization** shows 12 failures across ADMIN, AUTH, FAVOURITES, GAME, PROFILE, and USER APIs

The application is currently in **active QA remediation** status. All identified defects have been logged and prioritized for the next development sprint. Continued monitoring of authorization flows and token lifecycle management is critical for release readiness.

---

## Tools and Technologies

- **API Testing**: Postman, Newman
- **Automation Execution**: CLI-based Newman runs
- **Defect Tracking**: Jira
- **Test Management**: Google Sheets, RTM

---

## Author

**Garam Yoon**  
Junior QA Engineer  

📩 Email: garam.yoon.tech@gmail.com  
🔗 LinkedIn: https://www.linkedin.com/in/garam-yoon/

---

This project was developed as part of academic coursework and extended as a personal QA portfolio, with a strong emphasis on practical API automation, defect analysis, and quality-focused decision making.
