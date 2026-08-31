# Overview

This repository contains the end-to-end quality strategy, exploratory testing analysis, and automated test suites for Product Hunt's web application and public GraphQL API. 

---

# Setup Instructions

## Prerequisites

- Bun **v1.0+**
- Git

---

## Installation

### Clone the repository

```bash
git clone https://github.com/vc1608/spare-assessment.git
cd spare-qa
```

---

# Install Bun

Bun is an all-in-one JavaScript runtime and package manager.

## Windows

Open PowerShell and run:

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Restart the terminal after installation.

Verify:

```bash
bun --version
```

## macOS / Linux

Run:

```bash
curl -fsSL https://bun.sh/install | bash
```

Restart your terminal and verify:

```bash
bun --version
```

---

## Playwright Setup

Install Playwright dependencies through Bun:

```bash
bun install
```

Install the Chromium browser and required Linux dependencies:

```bash
bunx playwright install --with-deps chromium
```

For local development, browsers can also be installed with:

```bash
bunx playwright install
```

Check the installed version:

```bash
bunx playwright --version
```

Run the sample tests:

```bash
bunx playwright test
```

Run tests with the HTML report:

```bash
bunx playwright test --reporter=html
```

Open the report:

```bash
bunx playwright show-report
```

---

# Running the Test Suites

## 1. GraphQL API Tests (Bun)

Run all API integration tests.

```bash
bun test tests/api
```

Run the API test file directly.

```bash
bun test tests/api/product-hunt-api.spec.ts
```

Run a single test matching a specific name pattern.

```bash
bun test tests/api/product-hunt-api.spec.ts -t "Introspection"
```

---

## 2. End-to-End UI Tests (Playwright)

Run all E2E tests (Headless by default)

```bash
bunx playwright test tests/e2e/product-hunt.spec.ts
```

Run in Headed mode (Visible browser window)

```bash
bunx playwright test tests/e2e/product-hunt.spec.ts --headed
```

Run in Interactive UI Mode (Step-by-step inspector & debugger)

```bash
bunx playwright test --ui
```

Run a single test file (or specific path)

```bash
bunx playwright test tests/e2e/product-hunt.spec.ts
```

Run a single specific test by name title

```bash
bunx playwright test -g "Homepage should load"
```

Run tests sequentially (Single worker / Non-parallel)

```bash
bunx playwright test tests/e2e/product-hunt.spec.ts --workers=1
```

Run tests in parallel with explicit worker count (e.g., 4 threads)

```bash
bunx playwright test tests/e2e/product-hunt.spec.ts --workers=4
```

Run on a specific browser engine (e.g., Firefox or WebKit)

```bash
bunx playwright test tests/e2e/product-hunt.spec.ts --project=chromium
```

---

# CI/CD Setup

The project uses GitHub Actions to automatically run the API and E2E test suites on every push and pull request.

The Product Hunt API token is stored securely as a GitHub Actions repository secret and is injected into the test environment at runtime.

The token is never committed to the repository.

## Product Hunt API Token Setup

### 1. Sign in to Product Hunt

1. Log in to your profile on Product Hunt.
2. Click your profile icon and select the API Dashboard.
3. Click the Add an Application (or Create Application) button.
4. Provide an app name and a redirect URI (you can use a placeholder like http://localhost if you don't have one).
5. Click Create Application.
6. Scroll down to the bottom of your new application page and click "Create Token to generate a non-expiring developer access token". Copy this token immediately.

> Never commit the API token to the repository or add it directly to any TypeScript, JSON, YAML, or configuration file.

### 2. Add the Token to GitHub Actions

Open the GitHub repository and navigate to:

```text
GitHub Repository → Settings → Secrets and variables → Actions → Repository secrets
```

1. Select "New repository secret"

2. Paste your Product Hunt API token into the Secret field.
```text
Name:
PRODUCT_HUNT_TOKEN

Secret:
<your Product Hunt API token>
```

3. Then click "Add secret"

---

# Summary of Findings

- Upvote remains active after dismissing the login prompt, even though the upvote is not submitted.
- Comment More Options (three dots) button does not open any menu.
- Topic/category links under the product description do not respond or navigate to the relevant page.
- Invalid GraphQL queries expose detailed schema and type information through error messages.
- GraphQL introspection is publicly accessible, allowing schema discovery.

---

## Architecture & Project Structure

```text
├── .github/
│   └── workflows/
│       └── tests.yml                   # CI/CD GitHub Actions workflow
├── docs/
│   ├── test-strategy.md                # Part 1: Test Strategy
│   └── exploratory-testing.md          # Part 2: Exploratory Testing & Security Assessment
├── tests/
│   ├── api/                            # Bun-native API Automation
│   │   ├── graphql-queries.ts          # GraphQL query & mutation definitions
│   │   └── product-hunt-api.spec.ts
│   ├── e2e/                            # Playwright Web Automation
│   │   ├── pages/
│   │   │   ├── base.page.ts            # Base Page Object Class
│   │   │   └── home.page.ts            # Home Page Object Model
│   │   └── product-hunt.spec.ts
│   ├── config/
│   │   └── test-data.ts                # Static fixtures & test inputs
│   ├── fixtures/
│   │   └── test.fixture.ts             # Custom Playwright fixtures
│   └── utils/
│       ├── api-client.ts               # Typed GraphQL API client
│       └── env.ts                      # Environment configuration helper
└── playwright.config.ts                # Playwright configuration
```

---

# Documentation

| File | Description |
|------|-------------|
| `docs/test-strategy.md` | High-level quality strategy |
| `docs/exploratory-testing.md` | Manual exploratory testing findings |
| `.github/workflows/tests.yml` | GitHub Actions workflow |

---

# What I'd Do With More Time

- Detailed UI element and page verification
- Pagination checks
- Search edge cases and filters
- Login and logout
- Comments, upvotes, and other user interactions in detail
- Responsive/mobile layouts
- UI and API Edge cases
- Cross-browser compatibility
- Accessibility and keyboard navigation
- Performance test
