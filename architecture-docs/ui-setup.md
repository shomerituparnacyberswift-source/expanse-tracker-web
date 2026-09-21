

# Expense Tracker — Angular Frontend Implementation Plan

## 1. Project Overview

Build the **frontend only** for an Expense Tracker application.

### Technology Stack

* Frontend: Angular
* Backend: Node.js — **NOT IN THIS PHASE**
* Database: MongoDB — **NOT IN THIS PHASE**
* UI: Angular Material or a clean Material-inspired component system
* Charts: Use a suitable Angular-compatible chart library
* Data: Mock/local data only

> **CRITICAL:** This phase is frontend-only. Do not create, modify, configure, or connect to Node.js, Express, MongoDB, APIs, database models, authentication backends, or backend services.

---

# 2. Product Goal

Create a clean, modern, responsive personal finance dashboard where users can:

* View their expense summary
* View recent transactions
* Browse expenses
* Search/filter expenses
* Add an expense
* Edit an expense
* Delete an expense from the UI
* Manage categories
* View monthly expense summaries
* View charts
* Configure basic frontend settings

All data operations must use mock/local data.

---

# 3. Required Screens

The frontend should contain the following main sections:

```text
Expense Tracker
│
├── Dashboard
│
├── Expenses
│   ├── Expense List
│   ├── Add Expense
│   └── Edit Expense
│
├── Categories
│
├── Monthly Summary / Reports
│
└── Settings
```

---

# 4. Application Layout

Use a responsive application shell.

## Desktop

```text
┌───────────────────────────────────────────────────────────────┐
│ Logo / App Name                         Notification  Profile │
├───────────────┬───────────────────────────────────────────────┤
│ Dashboard     │                                               │
│ Expenses      │               Main Content                    │
│ Categories    │                                               │
│ Reports       │                                               │
│ Settings      │                                               │
│               │                                               │
└───────────────┴───────────────────────────────────────────────┘
```

## Mobile

* Sidebar should become a drawer.
* Top navigation should remain usable.
* Tables should become responsive.
* Cards should stack vertically.
* Forms should use a single-column layout.

---

# 5. Visual Design Direction

Use a **clean modern finance dashboard** design.

## Design principles

* Professional
* Minimal
* Easy to scan
* Good whitespace
* Consistent spacing
* Rounded cards
* Subtle borders/shadows
* Clear typography
* Accessible contrast
* No unnecessary animations

## Suggested color system

```text
Primary:        #2563EB
Primary Dark:   #1D4ED8
Success:        #16A34A
Danger:         #DC2626
Warning:        #D97706
Background:     #F8FAFC
Surface:        #FFFFFF
Text Primary:   #0F172A
Text Secondary: #64748B
Border:         #E2E8F0
```

Do not hard-code colors repeatedly inside individual components. Create a consistent theme/design-token approach.

---

# 6. Project Setup

Before implementation:

1. Inspect the existing Angular project.
2. Determine the Angular version.
3. Preserve the existing project structure where reasonable.
4. Install only required frontend dependencies.
5. Configure Angular Material if needed.
6. Configure the chart library.
7. Verify the project builds successfully.

If an Angular project does not exist, create the frontend Angular project.

Do not create any backend project.

---

# 7. Recommended Folder Architecture

Use a scalable Angular structure similar to:

```text
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   └── constants/
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── pipes/
│   │   └── directives/
│   │
│   ├── layout/
│   │   ├── app-shell/
│   │   ├── sidebar/
│   │   └── topbar/
│   │
│   ├── features/
│   │   ├── dashboard/
│   │   ├── expenses/
│   │   ├── categories/
│   │   ├── reports/
│   │   └── settings/
│   │
│   ├── app.routes.ts
│   └── app.config.ts
│
├── assets/
│   └── ...
│
└── styles.scss
```

Adapt this structure to the actual Angular version/project conventions.

---

# 8. TypeScript Models

Create strongly typed interfaces/models.

## Expense

```typescript
export interface Expense {
  id: string;
  title: string;
  amount: number;
  categoryId: string;
  date: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}
```

## Payment Method

```typescript
export type PaymentMethod =
  | 'cash'
  | 'upi'
  | 'card'
  | 'bank_transfer'
  | 'other';
```

## Category

```typescript
export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  isActive: boolean;
}
```

## Monthly Summary

Create an appropriate interface for:

* Total income
* Total expenses
* Savings
* Category totals
* Daily/monthly chart data

Use strong typing throughout the application.

Avoid unnecessary `any`.

---

# 9. Routing

Create routes for:

```text
/dashboard
/expenses
/expenses/new
/expenses/:id/edit
/categories
/reports
/settings
```

The default route should redirect to:

```text
/dashboard
```

Add a fallback route for unknown paths.

Use lazy loading for feature areas if appropriate for the Angular version.

---

# 10. Navigation

Sidebar navigation:

```text
Dashboard
Expenses
Categories
Reports
Settings
```

Each item should:

* Have an appropriate icon
* Show active state
* Navigate correctly
* Work on desktop and mobile

Topbar should contain:

* Page title/breadcrumb where appropriate
* Notification icon
* User/profile area
* Mobile menu button

---

# 11. Dashboard

Create a professional finance dashboard.

## Summary cards

Display:

```text
Total Balance
This Month
Total Expenses
Savings
```

Example:

```text
Total Balance
₹45,250

This Month
₹18,450

Savings
₹26,800
```

These are mock values and must not be treated as real financial data.

---

# 12. Dashboard Charts

Add at least two charts.

## Expense Trend

Display expense totals over time.

Example:

```text
Mon  Tue  Wed  Thu  Fri  Sat  Sun
₹400 ₹700 ₹250 ₹900 ₹500 ₹800 ₹350
```

Use a line or bar chart.

## Category Breakdown

Display spending by category.

Example categories:

```text
Food
Transport
Shopping
Bills
Entertainment
Health
Other
```

Use a doughnut/pie chart.

Charts must:

* Be responsive
* Have readable labels
* Have tooltips
* Use the application color system
* Display a useful empty state if there is no data

---

# 13. Recent Transactions

Dashboard should show recent expenses.

Example:

```text
Recent Transactions

Food          Lunch             ₹450       Today
Transport     Uber              ₹320       Today
Shopping      Amazon            ₹2,500     Yesterday
Bills         Electricity       ₹1,200     2 days ago
```

Provide:

```text
View All
```

which navigates to the Expenses page.

---

# 14. Expenses Page

Create the main expense listing screen.

Header:

```text
Expenses                         + Add Expense
```

Filters:

```text
Search expenses...
Category ▼
Date ▼
Payment Method ▼
```

Expense table:

```text
Date
Description
Category
Payment Method
Amount
Actions
```

Example:

```text
18 Sep    Lunch       Food        UPI      ₹450
17 Sep    Uber        Transport   UPI      ₹320
16 Sep    Amazon      Shopping    Card     ₹2,500
```

---

# 15. Expense Table Requirements

The table should support:

* Sorting
* Pagination
* Search
* Category filtering
* Payment method filtering
* Date filtering
* Edit action
* Delete action

For mobile:

* Avoid horizontal overflow where possible.
* Use a responsive card/list representation if necessary.

Amounts must use proper currency formatting.

For the initial UI, use Indian Rupee formatting:

```text
₹450
₹2,500
₹18,450
```

Use Angular's currency formatting utilities where appropriate.

---

# 16. Add Expense Screen

Create:

```text
Add Expense
```

Form fields:

### Amount

Required.

Validation:

* Required
* Must be greater than 0
* Reasonable numeric validation

### Expense Title

Required.

### Category

Required.

Dropdown populated from mock category data.

### Date

Required.

Default to the current frontend date when appropriate.

### Payment Method

Options:

```text
Cash
UPI
Card
Bank Transfer
Other
```

### Notes

Optional multiline field.

Buttons:

```text
Cancel
Save Expense
```

---

# 17. Expense Form Validation

Display user-friendly validation messages.

Examples:

```text
Amount is required.
Amount must be greater than 0.
Expense title is required.
Please select a category.
Date is required.
```

Do not allow invalid form submission.

Disable the submit button while the form is invalid or submitting.

---

# 18. Edit Expense

Reuse the Add Expense form where practical.

Route:

```text
/expenses/:id/edit
```

When editing:

* Load the selected mock expense.
* Populate the form.
* Allow changes.
* Save the updated expense locally.
* Return to the expense list or show a success message.

Do not create an API call.

---

# 19. Delete Expense

Add a delete action.

Before deleting:

```text
Are you sure you want to delete this expense?
```

Use a confirmation dialog.

After deletion:

* Remove the item from local/mock state.
* Show a success notification.
* Update dashboard calculations if the app uses shared mock state.

---

# 20. Mock Expense Service

Create a frontend-only service such as:

```text
ExpenseService
```

Responsibilities:

* Return expenses
* Get expense by ID
* Add expense
* Update expense
* Delete expense
* Filter/search expenses
* Calculate basic summary data

Data can initially be stored in:

* TypeScript mock data
* In-memory state
* localStorage

Prefer a clean abstraction so the service can later be replaced by an HTTP API service.

---

# 21. IMPORTANT: Backend Preparation

Although this phase is frontend-only, structure services so they can later be replaced with:

```text
Angular Service
      ↓
Node.js API
      ↓
MongoDB
```

For now:

```text
Angular Component
      ↓
Frontend Service
      ↓
Mock Data / Local State
```

Do NOT implement the Node.js API now.

Do NOT implement MongoDB now.

Do NOT create backend DTOs/controllers/models now.

---

# 22. Categories Page

Create a category management UI.

Display:

```text
Categories                         + Add Category

Food
Transport
Shopping
Bills
Entertainment
Health
Other
```

Each category should show:

* Icon
* Name
* Color
* Number of expenses if available
* Edit
* Delete

---

# 23. Category Form

Fields:

```text
Category Name *
Color
Icon
```

Validation:

* Name required
* Name should not be empty/whitespace
* Prevent obvious duplicate category names

Use mock/local state.

---

# 24. Monthly Summary / Reports

Create a Reports page.

Suggested controls:

```text
Monthly Summary

[ September 2026 ▼ ]
```

Show:

```text
Total Expenses
Average Daily Expense
Highest Spending Category
Number of Transactions
```

Add:

* Monthly expense trend chart
* Category spending chart
* Category summary list/table

Example:

```text
Category       Amount       Percentage

Food           ₹5,250       28%
Shopping       ₹4,500       24%
Bills          ₹3,200       17%
Transport      ₹2,400       13%
Other          ₹3,100       18%
```

All values should come from mock data.

---

# 25. Settings Page

Create a basic frontend settings screen.

Sections:

## Appearance

```text
Theme
[ Light ▼ ]
```

If dark mode is implemented, make sure the entire application follows the theme consistently.

## Currency

```text
Currency
[ INR - ₹ ▼ ]
```

For this first version, INR can be the default.

## Preferences

Include sensible UI preferences such as:

```text
Show confirmation before deleting
Compact transaction view
```

Settings can be stored locally.

Do not implement account/server settings.

---

# 26. Reusable Components

Create reusable components where they provide real value.

Potential components:

```text
AppShell
Sidebar
Topbar
SummaryCard
PageHeader
EmptyState
LoadingState
ErrorState
ConfirmDialog
ExpenseForm
ExpenseTable
CategoryBadge
CategoryForm
ChartCard
```

Avoid creating tiny components that add unnecessary complexity.

---

# 27. Loading States

Even though mock data is local, implement loading-state patterns that can later support asynchronous API calls.

Examples:

```text
Skeleton cards
Skeleton table rows
Loading spinner
```

The UI should never look broken while data is being loaded.

---

# 28. Empty States

Every data-heavy page should have an appropriate empty state.

Example:

```text
No expenses found

You haven't added any expenses yet.

+ Add Expense
```

For filtered results:

```text
No matching expenses

Try changing your search or filters.
```

---

# 29. Error States

Create a reusable error-state pattern.

Example:

```text
Something went wrong.

Please try again.
```

For mock data, simulate errors only if necessary for testing.

Do not add fake errors to the normal user flow.

---

# 30. Notifications

Use a consistent notification system for actions such as:

```text
Expense added successfully.
Expense updated successfully.
Expense deleted successfully.
Category added successfully.
Category updated successfully.
Category deleted successfully.
```

Use Angular Material Snackbar or an equivalent UI mechanism.

---

# 31. Responsive Design

The application must work on:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Recommended breakpoints:

```text
Mobile:       < 768px
Tablet:       768px - 1024px
Desktop:      > 1024px
```

Ensure:

* No accidental horizontal scrolling
* Forms fit mobile screens
* Tables remain usable
* Sidebar becomes a drawer
* Cards stack correctly
* Charts resize correctly
* Buttons remain touch-friendly

---

# 32. Accessibility

Follow basic accessibility standards.

Requirements:

* Semantic HTML
* Proper labels for inputs
* Keyboard navigation
* Visible focus states
* Accessible buttons
* Accessible dialogs
* Sufficient color contrast
* Do not rely on color alone to communicate information
* Meaningful ARIA labels where necessary

---

# 33. Forms

Use Angular Reactive Forms.

Do not use uncontrolled form logic.

Forms should:

* Have strongly typed controls where practical
* Validate user input
* Show errors at the appropriate time
* Prevent invalid submission
* Handle submit state
* Reset correctly
* Work on mobile

---



# 35. Data Persistence

For the frontend prototype, localStorage may be used.

Suggested keys:

```text
expense_tracker_expenses
expense_tracker_categories
expense_tracker_settings
```

If localStorage is used:

* Safely parse JSON
* Handle missing data
* Handle malformed data
* Provide default mock data
* Keep storage logic inside services

---

# 36. Mock Data

Create realistic mock data.

Include at least:

* 15–25 expenses
* 6–8 categories
* Different dates
* Different payment methods
* Different amounts

Example categories:

```text
Food
Transport
Shopping
Bills
Entertainment
Health
Education
Other
```

Use dates around September 2026 so the dashboard/report screens have meaningful data.

---

# 37. Expense Calculation Logic

Create reusable calculation logic for:

```text
Total expenses
Current month expenses
Category totals
Daily totals
Average daily expense
Transaction count
Highest spending category
```

Do not duplicate calculation logic across components.

---

# 38. Currency Formatting

Default currency:

```text
INR
```

Display:

```text
₹450
₹1,250
₹18,450
₹45,250
```

Use consistent formatting throughout the application.

---

# 39. Date Formatting

Use a consistent date format.

For table/list views:

```text
18 Sep 2026
```

For forms:

Use an appropriate date picker.

Do not manually format dates in multiple components.

---

# 40. UX Requirements

Important UX behaviors:

* Clear page titles
* Clear primary actions
* Consistent button styles
* Destructive actions must be clearly marked
* Delete requires confirmation
* Forms should show validation feedback
* Successful actions should show notifications
* Empty states should guide the user
* Search/filter controls should be easy to reset

---

# 41. Performance

Keep the initial frontend lightweight.

Avoid:

* Unnecessary dependencies
* Large UI libraries when not required
* Excessive subscriptions
* Repeated calculations inside templates
* Unnecessary change detection work

Use Angular best practices appropriate to the project version.

---

# 42. Code Quality

Follow these rules:

* Strict TypeScript where possible
* Avoid `any`
* Meaningful variable names
* Small focused methods
* Reusable services
* Reusable components
* No duplicated business logic
* No magic strings where constants are appropriate
* No commented-out dead code
* No unnecessary console logs
* No hard-coded repeated UI values
* Keep components maintainable

---

# 43. Component Responsibilities

Components should focus primarily on UI and user interaction.

Services should handle:

* Data access
* Mock persistence
* Filtering
* Calculations
* Shared state where required

Do not place large amounts of business logic inside templates.

---

# 44. Backend Separation Rule

This is a strict requirement.

## DO NOT

* Create Node.js files
* Create Express server
* Create MongoDB connection
* Create MongoDB schemas
* Create REST API endpoints
* Create backend authentication
* Install backend dependencies
* Modify backend code
* Add MongoDB configuration
* Create `.env` backend variables
* Connect Angular directly to MongoDB

## ONLY DO

```text
Angular
HTML
SCSS/CSS
TypeScript
Frontend services
Mock data
Local storage
Frontend dependencies
```

---

# 45. Suggested Implementation Phases

Implement the project incrementally.

---

## Phase 1 — Project Foundation

Tasks:

* Inspect Angular project
* Configure frontend dependencies
* Configure theme
* Configure global styles
* Create folder structure
* Configure routing
* Create app shell
* Create sidebar
* Create topbar
* Create responsive navigation

### Acceptance Criteria

* Project starts successfully
* Project builds successfully
* Sidebar works
* Topbar works
* All required routes exist
* Mobile navigation works
* No backend code exists

**STOP after Phase 1.**

Do not proceed until Phase 1 is complete.

---

## Phase 2 — Models and Mock Data

Tasks:

* Create Expense model
* Create Category model
* Create PaymentMethod type
* Create summary models
* Create mock categories
* Create mock expenses
* Create frontend services
* Implement localStorage abstraction if used

### Acceptance Criteria

* TypeScript models compile
* Mock data loads successfully
* Services work
* No API/backend code exists

**STOP after Phase 2.**

---

## Phase 3 — Dashboard

Tasks:

* Summary cards
* Expense trend chart
* Category chart
* Recent transactions
* View All action
* Loading states
* Empty states
* Responsive layout

### Acceptance Criteria

* Dashboard looks professional
* Mock data appears correctly
* Charts render
* Currency formatting works
* Mobile layout works

**STOP after Phase 3.**

---

## Phase 4 — Expense List

Tasks:

* Expense table/list
* Search
* Category filter
* Payment filter
* Date filter
* Sorting
* Pagination
* Edit button
* Delete button
* Empty state
* Responsive mobile layout

### Acceptance Criteria

* Expenses display correctly
* Filters work
* Search works
* Sorting works
* Pagination works
* Delete confirmation works

**STOP after Phase 4.**

---

## Phase 5 — Add/Edit Expense

Tasks:

* Add Expense form
* Reactive forms
* Validation
* Category dropdown
* Payment method dropdown
* Date picker
* Notes
* Save behavior
* Edit behavior
* Success notifications

### Acceptance Criteria

* Invalid forms cannot submit
* New expense appears in list
* Existing expense can be edited
* Data persists according to the chosen frontend storage approach

**STOP after Phase 5.**

---

## Phase 6 — Categories

Tasks:

* Category list
* Add category
* Edit category
* Delete category
* Color selection
* Icon selection if appropriate
* Validation
* Confirmation dialog

### Acceptance Criteria

* Category CRUD works locally
* Expense category selection reflects available categories
* UI is responsive

**STOP after Phase 6.**

---

## Phase 7 — Reports / Monthly Summary

Tasks:

* Month selector
* Summary cards
* Monthly trend chart
* Category breakdown
* Category summary table
* Calculations
* Empty state

### Acceptance Criteria

* Report values are calculated from mock expenses
* Month selection changes displayed data
* Charts update correctly

**STOP after Phase 7.**

---

## Phase 8 — Settings

Tasks:

* Currency setting
* Theme setting
* Delete confirmation preference
* Compact view preference
* Local persistence

### Acceptance Criteria

* Settings can be changed
* Settings persist locally
* UI responds appropriately

**STOP after Phase 8.**

---

## Phase 9 — Polish and QA

Tasks:

* Responsive testing
* Accessibility review
* Form validation review
* Loading-state review
* Empty-state review
* Error-state review
* Navigation review
* Chart responsiveness
* Currency/date consistency
* Remove unnecessary console logs
* Remove dead code
* Fix TypeScript/build warnings
* Run production build

### Acceptance Criteria

The frontend should:

* Build successfully
* Have no obvious runtime errors
* Have no broken routes
* Work on desktop
* Work on mobile
* Have consistent UI
* Have functional mock CRUD
* Have functional charts
* Have reusable architecture

**STOP after Phase 9.**

---

# 46. Execution Protocol for OpenCode

Follow this exact workflow.

For each phase:

```text
1. Read the phase requirements.
2. Inspect the existing project.
3. Implement only the current phase.
4. Run/build/test the application.
5. Fix issues related to the current phase.
6. Verify the acceptance criteria.
7. Stop.
```

Do not automatically implement the next phase.

Wait for the user to explicitly say:

```text
Proceed to Phase X
```

before continuing.

---

# 47. Important Implementation Behavior

Before changing existing files:

* Inspect the file first.
* Preserve existing functionality.
* Do not overwrite useful existing code unnecessarily.
* Follow the project's current Angular conventions when they are better than this plan.
* Avoid introducing unnecessary dependencies.

When adding dependencies:

* Explain why the dependency is required.
* Prefer well-maintained Angular-compatible libraries.
* Keep the dependency count minimal.

---

# 48. Verification Commands

Use the project's appropriate commands.

Typical commands may include:

```bash
npm install
npm start
npm run build
```

If the project has linting or tests:

```bash
npm run lint
npm test
```

Use the commands actually defined by the project's `package.json`.

Do not assume scripts exist if they do not.

---

# 49. Final Frontend Architecture

After all phases are complete, the expected architecture should conceptually look like:

```text
Angular Application
│
├── App Shell
│   ├── Sidebar
│   └── Topbar
│
├── Dashboard
│   ├── Summary Cards
│   ├── Expense Chart
│   ├── Category Chart
│   └── Recent Transactions
│
├── Expenses
│   ├── Expense List
│   ├── Expense Form
│   └── Expense Details/Edit
│
├── Categories
│   ├── Category List
│   └── Category Form
│
├── Reports
│   ├── Monthly Summary
│   ├── Trend Chart
│   └── Category Breakdown
│
├── Settings
│
├── Shared Components
│
├── Core Models
│
└── Frontend Services
    └── Mock/Local Storage
```

Future architecture:

```text
Angular Frontend
       │
       │ HTTP API
       ▼
Node.js Backend
       │
       ▼
MongoDB
```

The backend connection will be implemented in a future phase and is **out of scope for this plan**.

---

# 50. Definition of Done

The frontend phase is complete only when:

* [ ] Angular application runs successfully
* [ ] Application shell is implemented
* [ ] Responsive sidebar/topbar works
* [ ] Dashboard is implemented
* [ ] Dashboard charts work
* [ ] Recent transactions work
* [ ] Expense list works
* [ ] Expense search works
* [ ] Expense filters work
* [ ] Expense sorting works
* [ ] Expense pagination works
* [ ] Add Expense works
* [ ] Edit Expense works
* [ ] Delete Expense works
* [ ] Expense validation works
* [ ] Categories page works
* [ ] Category CRUD works
* [ ] Monthly Reports page works
* [ ] Settings page works
* [ ] Mock/local data works
* [ ] Currency formatting is consistent
* [ ] Date formatting is consistent
* [ ] Loading states exist
* [ ] Empty states exist
* [ ] Error states exist
* [ ] Notifications work
* [ ] Mobile layout works
* [ ] Accessibility basics are covered
* [ ] Production build succeeds
* [ ] No Node.js backend was created or modified
* [ ] No MongoDB connection was created
* [ ] No backend/API implementation was added

---

# 51. Final Instruction to OpenCode

**Implement this plan carefully and incrementally.**

The current task is **Angular frontend only**.

Do not implement backend functionality.

Do not connect to MongoDB.

Do not create Node.js/Express APIs.

Do not skip phases.

Do not proceed automatically to the next phase.

When instructed:

```text
Implement Phase 1
```

implement only Phase 1, verify it, and stop.

When instructed:

```text
Implement Phase 2
```

implement only Phase 2, verify it, and stop.

Continue the same way for subsequent phases.

The final result should be a production-quality Angular frontend that is architecturally ready to connect to a Node.js + MongoDB backend later.
