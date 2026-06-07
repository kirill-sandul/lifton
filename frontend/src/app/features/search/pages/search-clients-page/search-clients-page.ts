import { Component, computed, inject } from '@angular/core';
import { SearchBarComponent } from '@features/search/components/search-bar/search-bar';
import { ProfilePreviewComponent } from '@features/search/components/profile-preview/profile-preview';
import { SearchService } from '@features/search/services/search.service';

@Component({
  selector: 'app-search-clients-page',
  imports: [SearchBarComponent, ProfilePreviewComponent],
  templateUrl: './search-clients-page.html',
  styleUrl: './search-clients-page.scss',
})
export class SearchClientsPageComponent {
  searchService = inject(SearchService);
  searchResult = computed(() => this.searchService.searchResultList());

  onSearchQuery(query: string) {
    this.searchService.searchClients(query).subscribe();
  }
}
