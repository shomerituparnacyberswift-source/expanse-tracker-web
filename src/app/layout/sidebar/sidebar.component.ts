import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

interface NavItem {
  label: string;
  link: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
  { label: 'Expenses', link: '/expenses', icon: 'receipt_long' },
  { label: 'Categories', link: '/categories', icon: 'category' },
  { label: 'Reports', link: '/reports', icon: 'bar_chart' },
  { label: 'Settings', link: '/settings', icon: 'settings' }
];

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input() open = false;
  @Output() navigate = new EventEmitter<void>();
  readonly navItems: NavItem[] = NAV_ITEMS;
}