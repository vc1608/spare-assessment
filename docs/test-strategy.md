# Test Strategy

## Priorities & Testing Focus

Testing efforts are prioritized based on business impact and technical risk:

* **High Priority - Core UI Flows:** Homepage loading, search, product navigation, topic navigation, footer navigation, login/logout and important page elements.
* **High Priority - GraphQL API:** Authentication errors, malformed requests, valid queries, invalid HTTP methods, content types, introspection, and nested queries.
* **Medium Priority - Error & Edge Cases:** Invalid topics, invalid inputs, API errors, and unexpected user interactions.
* **Low Priority - UI Details:** Tooltips, visual consistency, responsive layouts, and less frequently used interactions.

---

## QA Ownership

* **Exploratory & Edge-Case Testing:** Performed during feature development to uncover visual bugs, delays, error messaging gaps, and edge cases. Helps uncover issues that may not be covered by planned test cases.
* **Defect Triage & Root Cause Analysis:** When bugs are found, QA conducts initial root-cause analysis before filing structured, reproducible bug reports for the team. Helps understand the cause and impact of issues, making bugs easier for developers to reproduce and fix.
* **Release Health & Sign-off:** Release readiness is governed by CI regression suites and verifying staging environment health. Helps ensure critical functionality is working correctly before a release and reduces the risk of production issues.
