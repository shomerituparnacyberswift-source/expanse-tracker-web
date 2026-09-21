import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';

import { AuthService } from '../../core/services/auth.service';

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  expenses: 'Expenses',
  categories: 'Categories',
  reports: 'Reports',
  settings: 'Settings'
};

@Component({
  selector: 'app-topbar',
  imports: [AsyncPipe, MatIconButton, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, MatTooltip],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  @Output() menuClick = new EventEmitter<void>();

  pageTitle = 'Dashboard';
  readonly user$ = this.authService.user$;
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => this.updateTitle(this.router.url))
    );
    this.updateTitle(this.router.url);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  onLogout(): void {
    this.authService.logout();
    void this.router.navigate(['/']);
  }

  private updateTitle(url: string): void {
    const segments = url.split('/').filter(Boolean);
    if (segments[0] === 'expenses' && segments[1] === 'new') {
      this.pageTitle = 'Add Expense';
      return;
    }
    if (segments[0] === 'expenses' && segments[1] && segments[2] === 'edit') {
      this.pageTitle = 'Edit Expense';
      return;
    }
    this.pageTitle = segments.length > 0 ? (PAGE_TITLES[segments[0]] ?? 'Expense Tracker') : 'Dashboard';
  }
}