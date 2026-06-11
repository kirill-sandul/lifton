import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '@core/models/user.models';
import { tap } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  http = inject(HttpClient);
  router = inject(Router);

  beforeSearch = true;

  private _searchResultList = signal<UserProfile[]>([]);
  readonly searchResultList = this._searchResultList.asReadonly();

  invitedList: UserProfile[] = [];

  constructor() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.beforeSearch = true;
        this._searchResultList.set([]);
      }
    });
  }

  searchUsers(searchQuery: string) {
    return this.http
      .get<UserProfile[]>('search', {
        params: {
          searchQuery,
        },
      })
      .pipe(
        tap((res) => {
          this._searchResultList.set(res);
          this.beforeSearch = searchQuery.trim() === '';
        }),
      );
  }
}
