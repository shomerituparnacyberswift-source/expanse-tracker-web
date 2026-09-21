import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-expense-list',
  imports: [],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseListComponent {}