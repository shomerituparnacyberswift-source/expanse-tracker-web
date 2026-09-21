import { Routes } from '@angular/router';

import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

export const expensesRoutes: Routes = [
  { path: '', component: ExpenseListComponent },
  { path: 'new', component: ExpenseFormComponent },
  { path: ':id/edit', component: ExpenseFormComponent }
];