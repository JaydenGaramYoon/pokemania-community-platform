# PokeMania | Team-Based MERN Application with Extended API Automation Testing

---

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

