import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '@core/models/user.models';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  http = inject(HttpClient);

  beforeSearch = true;

  private _searchResultList = signal<UserProfile[]>([]);
  readonly searchResultList = this._searchResultList.asReadonly();

  searchClients(searchQuery: string) {
    return this.http
      .get<UserProfile[]>('search/clients', {
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
