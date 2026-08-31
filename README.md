# Overview

This repository contains the end-to-end quality strategy, exploratory testing analysis, and automated test suites for Product Hunt's web application and public GraphQL API.

---

# Setup Instructions

## Prerequisites

- Node.js **v18+** (or v20+)
- Bun **v1.0+**
- Git

---

## Installation

### Clone the repository

```bash
git clone <your-repository-url>
cd spare-qa
```

---

# Install Node.js

Node.js is required to run JavaScript/TypeScript applications and Playwright.

### Windows / macOS / Linux

Download Node.js from the official website:

https://nodejs.org/

It is recommended to install the **LTS version**.

After installation, verify:

```bash
node --version
npm --version
```

Expected output:

```text
vXX.XX.X
X.XX.X
```

> **Note:** Restart your terminal after installation if `node` or `npm` is not recognized.

---

## Install Playwright

Install Playwright Test:

```bash
npm init playwright@latest
```

During setup, you may be prompted to select:

* JavaScript or TypeScript
* Test directory
* GitHub Actions
* Install Playwright browsers

For a TypeScript project, select **TypeScript**.

## Install Playwright browsers

If browsers were not installed during setup:

```bash
npx playwright install
```

For Linux dependencies as well:

```bash
npx playwright install --with-deps
```

## Verify Playwright installation

Check the installed version:

```bash
npx playwright --version
```

Run the sample tests:

```bash
npx playwright test
```

Run tests with the HTML report:

```bash
npx playwright test --reporter=html
```

Open the report:

```bash
npx playwright show-report
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

# Running the Test Suites

## 1. GraphQL API Tests (Bun)

Runs all API integration tests.

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
npx playwright test tests/e2e/product-hunt.spec.ts
```

Run in Headed mode (Visible browser window)

```bash
npx playwright test tests/e2e/product-hunt.spec.ts --headed
```

Run in Interactive UI Mode (Step-by-step inspector & debugger)

```bash
npx playwright test --ui
```

Run a single test file (or specific path)

```bash
npx playwright test tests/e2e/product-hunt.spec.ts
```

Run a single specific test by name title

```bash
npx playwright test -g "Homepage should load"
```

Run tests sequentially (Single worker / Non-parallel)

```bash
npx playwright test tests/e2e/product-hunt.spec.ts --workers=1
```

Run tests in parallel with explicit worker count (e.g., 4 threads)

```bash
npx playwright test tests/e2e/product-hunt.spec.ts --workers=4
```

Run on a specific browser engine (e.g., Firefox or WebKit)

```bash
npx playwright test tests/e2e/product-hunt.spec.ts --project=chromium
```

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
