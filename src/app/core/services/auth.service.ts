import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, tap, throwError } from 'rxjs';

import { STORAGE_KEYS } from '../constants/storage-keys';
import { AuthUser } from '../models/auth.models';

const DEMO_EMAIL = 'demo@expense.app';
const DEMO_PASSWORD = 'demo123';
const DEMO_USER: AuthUser = {
  name: 'Demo User',
  email: DEMO_EMAIL
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject = new BehaviorSubject<AuthUser | null>(this.readStoredUser());
  readonly user$ = this.userSubject.asObservable();

  login(email: string, password: string): Observable<AuthUser> {
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      return throwError(() => new Error('Invalid email or password. Use demo@expense.app / demo123.'));
    }
    return of(DEMO_USER).pipe(
      delay(500),
      tap((user) => this.storeUser(user))
    );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.auth);
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }

  private storeUser(user: AuthUser): void {
    localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(user));
    this.userSubject.next(user);
  }

  private readStoredUser(): AuthUser | null {
    const raw = localStorage.getItem(STORAGE_KEYS.auth);
    if (!raw) {
      return null;
    }
    try {
      const parsed = JSON.parse(raw) as Partial<AuthUser>;
      if (typeof parsed.email !== 'string' || typeof parsed.name !== 'string') {
        return null;
      }
      return { name: parsed.name, email: parsed.email };
    } catch {
      return null;
    }
  }
}