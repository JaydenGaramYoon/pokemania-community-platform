# API Automation & Quality Analysis | PokeMania

## 🔗 Important Links

- **Main Branch:** [GitHub Repository](https://github.com/JaydenGaramYoon/pokemania-community-platform)
- **QA Testing Branch:** [qa-testing branch](https://github.com/JaydenGaramYoon/pokemania-community-platform/tree/qa-testing)
- **API Testing Guide:** [API README](./api/README.md)
- **GitHub Secrets Setup:** [SECRETS Guide](./.github/SECRETS.md)
- **PokéAPI Documentation:** [PokéAPI Docs](https://pokeapi.co/docs/v2)

PokeMania is a full-stack MERN web application project.

The underlying system was developed collaboratively as part of a team-based project, to which I contributed during system development.  
**All QA activities and API automation were then independently designed, executed, and analysed by me as an extension of the project.**

This repository demonstrates practical QA automation using Postman and Newman, as well as structured analysis of test results to assess system quality and release readiness.

The focus of this work is not only automated execution, but also how test results are interpreted and used to reason about software quality within the context of a real, evolving system.

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

<p align="center">
  <img width="958" height="555" alt="API Test Metrics Summary"
       src="https://github.com/user-attachments/assets/55dd23b8-0c0f-4655-93e2-1cf97ae15a6a" />
</p>
<p align="center">
  <em>Figure 1. API test execution results based on 49 automated test cases</em>
</p>

These results indicate full requirement and execution coverage, with failures concentrated in specific high-risk areas rather than widespread functional gaps.

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

- **Requirement Coverage**: Full alignment between requirements and executed test cases was maintained.
- **Reliability**: Core features such as login, messaging, and data retrieval demonstrated stable behavior after fixes.
- **Performance**: Average API response time remained under 300ms, although concurrent requests exposed synchronization risks.
- **Traceability**: All defects were mapped to originating test cases and documented through a requirements traceability matrix (RTM).

---

### Lessons Learned and Improvement Areas

- Additional negative testing is required for token refresh and multi-user session scenarios.
- Isolating backend dependencies through mock API environments could reduce defect density.
- Expanding regression automation within a CI/CD pipeline is recommended to ensure consistent retesting after each fix.

---

### Conclusion

The QA phase confirmed **100% requirement and execution coverage**, identifying **13 defects** prior to release.  
With a **73.47% test pass rate** and **26.53% defect density**, the application is in a **stable pre-release (v1.0)** state, pending verification of remaining open issues.

The results provide a clear baseline for regression verification in subsequent sprint cycles and support informed release-readiness decisions.

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
