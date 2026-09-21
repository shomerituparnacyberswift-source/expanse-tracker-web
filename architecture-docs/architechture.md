# Expanse Tracker — Frontend Architecture

> Location: `expanse-tracker-web/architecture-docs/architecture.md`
> Companion plan: `ui-setup.md` (phased implementation plan)

---

## 1. Project Overview

### Purpose

A clean, modern, responsive **personal expense tracking dashboard**. The current workstream is **frontend-only** (Angular). No backend (Node.js/Express/MongoDB) is created, modified, or connected in this phase.

### Technology Stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Frontend framework | Angular 19 (standalone, no NgModules) | `bootstrapApplication` in `src/main.ts` |
| UI component system | Angular Material 19 (M3 theming) | Blue primary / Orange tertiary |
| Icons | Material Icons font | Loaded in `index.html` |
| Animations | `@angular/animations` | Enabled via `provideAnimations()` |
| Charts | Not yet installed | Planned for Phase 3 (`dashboard`) / Phase 7 (`reports`) |
| Data | Mock/local in-memory + localStorage | Planned in Phase 2 |
| Language | Strict TypeScript | See `tsconfig.json` |

### Installed Dependencies (Phase 1)

Runtime:

- `@angular/animations`, `@angular/cdk`, `@angular/common`, `@angular/compiler`, `@angular/core`, `@angular/forms`, `@angular/material`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/router`, `rxjs`, `tslib`, `zone.js`

Dev/build:

- `@angular-devkit/build-angular`, `@angular/cli`, `@angular/compiler-cli`, `typescript`, Jasmine/Karma test toolchain

---

## 2. Current Implementation Status

| Phase | Status |
| --- | --- |
| Phase 1 — Project Foundation | **DONE** |
| Phase 2 — Models and Mock Data | Pending |
| Phase 3 — Dashboard | Pending |
| Phase 4 — Expense List | Pending |
| Phase 5 — Add/Edit Expense | Pending |
| Phase 6 — Categories | Pending |
| Phase 7 — Reports / Monthly Summary | Pending |
| Phase 8 — Settings | Pending |
| Phase 9 — Polish and QA | Pending |

Feature pages currently render **placeholder screens** and are progressively replaced as each phase is implemented.

---

## 3. Folder Architecture

```
expanse-tracker-web/
├── angular.json                 # Build/serve/test config (bundler, budgets, styles)
├── package.json
├── tsconfig.json                # Strict TypeScript
├── tsconfig.app.json
├── tsconfig.spec.json
├── public/
│   └── favicon.ico
└── src/
    ├── index.html               # Root shell, fonts (Roboto + Material Icons)
    ├── main.ts                  # bootstrapApplication(AppComponent, appConfig)
    ├── styles.scss              # Material M3 theme + global design tokens
    └── app/
        ├── app.component.*      # Root component (renders <router-outlet>)
        ├── app.config.ts        # Root providers (router, animations)
        ├── app.routes.ts        # Root route table
        ├── layout/
        │   ├── app-shell/       # Responsive shell: sidebar + topbar + content
        │   ├── sidebar/         # Vertical navigation
        │   └── topbar/          # Page title, menu, notifications, profile
        └── features/            # Lazy-loaded feature areas
            ├── dashboard/       # Phase 3
            ├── expenses/
            │   ├── expense-list/ # Phase 4
            │   └── expense-form/ # Phase 5 (add + edit)
            ├── categories/      # Phase 6
            ├── reports/         # Phase 7
            └── settings/        # Phase 8
```

Planned additions (Phase 2+), per the plan's target structure:

```
app/
├── core/            models/ · services/ · constants/
├── shared/          components/ · pipes/ · directives/
```

---

## 4. Application Startup Flow

```
index.html
   └─ <app-root>
        └─ AppComponent            (src/app/app.component.ts)
             └─ <router-outlet/>   (renders first matched route)
                  └─ AppShellComponent   (layout route: path '')
                       ├─ <app-sidebar/>      (nav; drawer on mobile)
                       ├─ <app-topbar/>       (sticky header)
                       └─ <router-outlet/>    (renders active feature page)
```

Providers registered in `app.config.ts` (`provideZoneChangeDetection`, `provideRouter(routes)`, `provideAnimations`).

---

## 5. Routing

Defined in `src/app/app.routes.ts`.

```
/                         → redirect to /dashboard
/dashboard                → lazy: features/dashboard
/expenses                 → lazy: features/expenses (ExpenseList)
/expenses/new             → InvoiceForm (Add)
/expenses/:id/edit        → InvoiceForm (Edit)
/categories               → lazy: features/categories
/reports                  → lazy: features/reports
/settings                 → lazy: features/settings
**                        → redirect to /dashboard    (fallback)
```

Notes:

- Root path `''` mounts the `AppShellComponent`; every feature is a child so the shell (sidebar/topbar) wraps all pages.
- Feature areas are **lazy-loaded** via `loadChildren` pointing at per-feature route files (e.g. `dashboard.routes.ts`).
- Topbar derives the page title from the active URL (markup in `TopbarComponent`).

---

## 6. Layout System

### 6.1 App Shell (`layout/app-shell`)

- Two-column flex layout: fixed sidebar (`260px`) + fluid content column.
- Content column: `TopbarComponent` (sticky) over `<main class="app-shell__content">` (`max-width: 1280px`, centered, `24px` padding).
- Owns the mobile drawer state (`sidebarOpen`), toggled by the topbar menu button and closed on navigation or backdrop click.

### 6.2 Sidebar (`layout/sidebar`)

- Navigation items (icon + label):

```
Dashboard   /dashboard     dashboard
Expenses    /expenses      receipt_long
Categories  /categories    category
Reports     /reports       bar_chart
Settings    /settings      settings
```

- Active state via `routerLinkActive` (exact match only for Dashboard); `aria-current="page"` is set automatically.
- **Desktop (>= 1024px):** `<app-sidebar>` occupies a static `260px` column (`position: sticky`, full height).
- **Mobile (< 1024px):** becomes a fixed-width (`280px`) overlay drawer, translated off-canvas unless `.sidebar--open` is set; the app-shell renders a scrim behind it.

### 6.3 Topbar (`layout/topbar`)

- Left: hamburger menu button (visible only on mobile) → emits `menuClick`.
- Center/left: page title (derived from the router URL).
- Right: notifications button, avatar button.

---

## 7. Theming and Design Tokens

Material 3 theme is defined in `src/styles.scss` with `mat.define-theme`:

- Primary: `mat.$blue-palette`
- Tertiary: `mat.$orange-palette`
- Typography: Roboto (plain + brand); `@include mat.core()` once
- Per-component theme mixins wrapped in `html {}` scope keep the emitted CSS small:

```scss
html {
  @include mat.button-theme($expense-tracker-theme);
  @include mat.icon-theme($expense-tracker-theme);
  @include mat.tooltip-theme($expense-tracker-theme);
}
```

> Add additional mixins (e.g. `mat.table-theme`, `mat.dialog-theme`, `mat.snackbar-theme`, `mat.form-field-theme`) as those components are introduced, to keep the bundle lightweight.

### Design Tokens (CSS custom properties)

Defined in `:root` in `styles.scss` — **do not hard-code colors in components**; reference tokens.

```
--color-primary:          #2563EB
--color-primary-dark:     #1D4ED8
--color-primary-light:    #60A5FA
--color-success:          #16A34A
--color-danger:           #DC2626
--color-warning:          #D97706
--color-background:       #F8FAFC
--color-surface:          #FFFFFF
--color-text-primary:     #0F172A
--color-text-secondary:   #64748B
--color-border:           #E2E8F0
--radius-md / --radius-lg / --shadow-sm
```

Global utility classes: `.card`, `.page-header`, `.page-header__title`, `.placeholder-note`.

---

## 8. Data Layer Strategy (Planned)

Forward-looking design (decided in `ui-setup.md`) so the mock layer can be replaced by a real API without refactoring components:

```
Now: Angular Component → Frontend Service → Mock Data / Local Storage
Later: Angular Service → Node.js API → MongoDB
```

### Models (Phase 2 target)

```typescript
type PaymentMethod = 'cash' | 'upi' | 'card' | 'bank_transfer' | 'other';

interface Expense {
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

interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  isActive: boolean;
}
```

### Persistence (Phase 2 target)

- `localStorage` keys:

```
expense_tracker_expenses
expense_tracker_categories
expense_tracker_settings
```

- Storage logic stays inside services; safe JSON parsing, malformed-data fallbacks, and default mock data required.

### Services

`ExpenseService` (and `CategoryService`) will own: CRUD, search/filter, sorting, and summary calculations (totals, current-month totals, category totals, daily totals, average daily spend, transaction count, highest category). Computation helpers must be reusable — never duplicated across components.

---

## 9. Conventions and Constraints

### TypeScript / Code style

- Strict mode enabled (`strict`, `strictTemplates`, `isolatedModules`, `noImplicitReturns`, no `any` where avoidable).
- Components own UI + interaction only; services own data/logic.
- No backend code, no `.env`, no Mongo, no REST endpoints (Phase 1–9 scope).
- Strong model types; constants for repeated values; no dead code or stray console logs.

### Angular specifics

- Standalone components; per-component `styleUrl`, `changeDetection: ChangeDetectionStrategy.OnPush`.
- Reactive Forms (added with Phase 5) — no template-driven form logic.
- Currency: INR (`₹`) via Angular currency formatting; consistent date format `dd MMM yyyy`.
- Loading, empty, and error state patterns introduced alongside data features.

### Accessibility ground rules

- Semantic HTML, labeled inputs, keyboard navigation, visible focus states, accessible dialogs; never rely on color alone.

---

## 10. Build and Verification

### Scripts (`package.json`)

```
npm start        ng serve
npm run build    ng build          → dist/expanse-tracker-web
npm run watch    ng build --watch --configuration development
npm test         ng test           (Karma/Jasmine)
```

Production budgets in `angular.json`: initial bundle 500 kB warning / 1 MB error; component styles 4 kB warning / 8 kB error.

---

## 11. Future Backend Boundary

Out of scope for the current workstream, the eventual architecture is:

```
Angular Frontend  ──HTTP──▶  Node.js API  ──▶  MongoDB
```

The current frontend service abstraction is designed so only the service layer needs to change when this boundary is added.
