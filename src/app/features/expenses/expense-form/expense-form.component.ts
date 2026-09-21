import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-expense-form',
  imports: [],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseFormComponent {}