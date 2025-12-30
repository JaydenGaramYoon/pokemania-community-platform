# PokeMania – API Automation & Quality Analysis Portfolio

PokeMania is a full-stack web application project accompanied by a comprehensive **API automation and quality analysis suite**.  
This repository demonstrates practical QA automation using **Postman and Newman**, as well as structured analysis of test results to assess system quality and release readiness.

The focus of this work is not only automated execution, but also **how test results are interpreted and used to reason about software quality**.

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

➡️ **Detailed API automation documentation:**  
[api/README.md](api/README.md)

> Note: All environment variables are committed with empty values.  
> Tokens and sensitive data are generated and injected only at runtime.

---

## API Test & Quality Analysis Report (v1.0)

In addition to automated execution, this project includes a **formal API test and quality analysis report** that evaluates the effectiveness and reliability of the test suite beyond simple pass or fail results.

The analysis focuses on identifying defect patterns, assessing test depth, and evaluating overall release readiness based on observed test outcomes.

### Test Metrics Summary

<img width="958" height="555" alt="image" src="https://github.com/user-attachments/assets/55dd23b8-0c0f-4655-93e2-1cf97ae15a6a" />
These results indicate full requirement and execution coverage, with failures concentrated in specific high-risk areas rather than widespread functional gaps.

---

### Defect Workflow and Severity Overview
<img width="648" height="530" alt="image" src="https://github.com/user-attachments/assets/407fd813-d45f-4ef7-9529-17226668f2b8" />
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
