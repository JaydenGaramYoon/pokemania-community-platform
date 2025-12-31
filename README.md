# PokeMania | Team-Based MERN Application with Extended API Automation Testing

## Project Overview

**PokeMania** is a collaborative full-stack **MERN web application** developed by the **Bright Bridge (BB)** team as part of the COMP229 – Web Application Development course.

The core application was built through team-based development, covering frontend, backend, database design, and feature implementation.  
In addition to the shared development work, the project was **extended with a dedicated API automation and quality analysis initiative**, focusing on backend validation, defect discovery, and release-readiness assessment.

This extension emphasises not only automated test execution, but also **how API test results are analysed and translated into quality- and risk-informed decisions**, reflecting real-world QA practices applied on top of a collaboratively developed system.

---

## 👥 Team Contributions & Role Distribution

Each team member was responsible for specific functional and technical areas of the system.  
The contribution distribution below reflects the agreed scope documented in the project slides and External Design Document (EDD).

### Team Members & Responsibilities

| Name | Responsibilities |
|---|---|
| **Garam Yoon** | **Project Manager**, Front-End Developer, Back-End Developer, Database Design, Home / Favourites / Game / Profile pages, Debugging, CI/CD testing, Deployment, **API Automation & Quality Assurance** → *see* **`qa-testing` branch** for individual QA work |
| Chun Wai Chung | Front-End Developer, Back-End Developer, Database Design, Profile page implementation, Slides preparation, External Design Document (EDD) |
| Fengyuan Yang | Front-End Developer, Back-End Developer, Database Design, TalkTalk (forum/chat) feature, Jira management, Debugging |
| Tak Sum Li | Front-End & Back-End Developer, Database Design, Sign Up / Login functionality, YouTube demo video, End-to-End (E2E) testing |

🔗 **QA Branch (Individual Contribution):**  
https://github.com/JaydenGaramYoon/pokemania-community-platform/tree/qa-testing

This structure highlights both **collaborative development ownership** and **clearly defined individual responsibility areas**, with QA artifacts intentionally isolated to ensure traceability and accountability.

---

## API Automation Overview

The project includes a structured **API automation suite** implemented using **Postman and Newman**, designed to validate backend functionality independently from the UI.

The automation covers **49 API test cases across 8 Postman collections**, targeting realistic QA scenarios such as functional validation, authorization control, negative testing, and edge-case handling.

### Coverage Highlights
- JWT-based authentication and token lifecycle validation  
- Role-based authorization (user vs admin)  
- Core business logic validation (games, profiles, favourites, messaging)  
- Negative scenarios and boundary condition testing  
- CLI-based automated execution using Newman  
- CI-ready structure with secure environment variable handling  

> **Note:**  
> All environment variables are committed with empty values.  
> Tokens and sensitive data are generated and injected only at runtime.

---

## Project Structure

The repository is organised to clearly separate application code from QA automation artifacts.

```
.
├── client/ # Frontend application
├── server/ # Backend application
├── api/ # API automation and QA artifacts
│ ├── postman/ # Postman collections and environments
│ └── README.md # Detailed API testing documentation
└── README.md # Project overview and QA summary
```


### API Automation Directory (`/api`)

The `/api` directory serves as the **primary entry point for reviewing the QA scope** of this project.  
It intentionally separates test definitions and quality analysis from implementation logic.

---

## API Test & Quality Analysis Report (v1.0)

Beyond automated execution, this project includes a **formal API test and quality analysis report** evaluating test effectiveness, defect patterns, and release readiness.

The analysis focuses on:
- Test depth and requirement coverage  
- Defect concentration and severity  
- Risk assessment for pre-release decisions  

---

### Sample API Test Cases

<img width="1373" height="747" alt="Sample API Test Cases" src="https://github.com/user-attachments/assets/3769b3df-9192-422e-bc8a-22c491d6d71a" />

These samples demonstrate coverage across **negative scenarios, authorization control, edge cases, and core business rules**, with clear traceability to requirements.

---

### Test Metrics Summary

<p align="center">
  <img width="958" height="555" alt="API Test Metrics Summary"
       src="https://github.com/user-attachments/assets/55dd23b8-0c0f-4655-93e2-1cf97ae15a6a" />
</p>
<p align="center">
  <em>Figure 1. API test execution results based on 49 automated test cases</em>
</p>

Failures were concentrated in specific high-risk areas rather than widespread functional gaps, enabling targeted remediation.

---

### Defect Workflow and Severity Overview

<p align="center">
  <img width="648" height="530" alt="Defect Workflow and Severity Distribution"
       src="https://github.com/user-attachments/assets/407fd813-d45f-4ef7-9529-17226668f2b8" />
</p>
<p align="center">
  <em>Figure 2. Defect workflow status and severity distribution</em>
</p>

High-severity defects were primarily related to authentication handling, token validation, and backend synchronization issues affecting session stability.

---

### Quality Insights

- **Requirement Coverage:** Full alignment between requirements and executed test cases  
- **Reliability:** Core features demonstrated stable behaviour after fixes  
- **Performance:** Average API response time under 300ms, with concurrency risks identified  
- **Traceability:** All defects mapped to originating test cases via RTM  

---

### Lessons Learned & Improvement Areas

- Expand negative testing for token refresh and multi-session scenarios  
- Introduce mock API environments to isolate backend dependencies  
- Integrate regression automation into CI/CD for continuous verification  

---

## Tools & Technologies

- **API Testing:** Postman, Newman  
- **Automation Execution:** CLI-based Newman runs  
- **Defect Tracking:** Jira  
- **Test Management:** Google Sheets, RTM  

---

## Author

**Garam Yoon**  
Junior QA Engineer  

📩 Email: garam.yoon.tech@gmail.com  
🔗 LinkedIn: https://www.linkedin.com/in/garam-yoon/

---

This proje
