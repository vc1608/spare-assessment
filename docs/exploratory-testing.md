# Exploratory Testing & Security Notes

**Target:** Product Hunt Web App and GraphQL API

**Scope:** UI behaviour, search, navigation and redirects, authentication flows, GraphQL queries, error handling, and invalid input handling

---

## 1. Overview

I tested both the Product Hunt website and its GraphQL API. The main focus was on common user flows, navigation, search, authentication behavior, invalid inputs, GraphQL errors, and basic API request handling.

---

## 2. Functional and UI Issues

### [BUG-01] Upvote Button Remains Active After Closing Login Prompt

**Severity:** Low
**Area:** Upvote / Authentication

**What I found:**

When clicking the Upvote button while logged out, a login prompt is displayed as expected. However, if the login prompt is closed without logging in, the Upvote button remains in the upvoted state, even though the upvote was not actually submitted.

The UI only returns to the correct state after refreshing the page.

**Suggestion:**

Revert the Upvote button to its previous state when the login prompt is dismissed without authentication. The upvote state should only be updated after the user successfully logs in and the upvote request is completed.

---

### [BUG-02] More Options Button In Comment Section Does Not Respond

**Severity:** Medium
**Area:** Comments

**What I found:**

In the comment section, clicking the More Options (three dots) button does not display any menu or available actions.

**Suggestion:**

Ensure that clicking the More Options button opens the relevant action menu, such as edit, delete, report, or other applicable options based on the user's permissions.

---

### [BUG-03] Topic/Category Links Under Product Description Do Not Respond

**Severity:** High

**Area:** Product Details / Navigation

**What I found:**

Under the product description, clicking on a topic/category link does not trigger any action or navigate to the corresponding topic/category page.

**Suggestion:**

Ensure that clicking the topic/category link navigates the user to the relevant topic or category page.

---

## 3. API Observations

### [API-01] Detailed Errors Expose Schema Information

**Severity:** Low
**Endpoint:** `POST /v2/api/graphql`

**What I found:**

Queries containing invalid fields return detailed GraphQL errors, including schema and type information.

**Suggestion:**

Review the level of detail exposed in production errors. Less detailed errors could make it harder for external users to map the schema.

---

## 4. Security Findings

### [SEC-01] GraphQL Introspection Is Enabled

**Severity:** Medium

**What I found:**

The public GraphQL endpoint allows introspection queries such as `__schema` and `__type`.

This makes it easy to discover the available queries, types, and relationships in the API.

**Suggestion:**

If introspection isn't required by public clients, consider restricting it in production. Another option is to use persisted or allowlisted queries.
