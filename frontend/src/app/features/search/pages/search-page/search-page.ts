import { Component, computed, inject, signal } from '@angular/core';
import { SearchBarComponent } from '@features/search/components/search-bar/search-bar';
import { ProfilePreviewComponent } from '@features/search/components/profile-preview/profile-preview';
import { SearchService } from '@features/search/services/search.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { UserRole, UserToInvite } from '@core/models/user.models';
import { UserService } from '@core/services/user/user.service';
import { ModalComponent } from '@shared/components/modal/modal';
import { InviteService } from '@features/invite/services/invite.service';
import { SNACKBAR_MSG_REGISTRY } from '@shared/constants/ui-mapping/snackbar-msg-registry';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorRes } from '@shared/api-contract/errors';

@Component({
  selector: 'app-search-page',
  imports: [SearchBarComponent, ProfilePreviewComponent, ModalComponent],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPageComponent {
  userService = inject(UserService);

  role = this.userService.role();
  protected readonly UserRole = UserRole;

  searchService = inject(SearchService);
  searchResult = computed(() => this.searchService.searchResultList());

  inviteService = inject(InviteService);

  snackbarService = inject(SnackbarService);

  showInviteDialog = signal(false);
  userToInvite: UserToInvite | null = null;

  onSearchQuery(query: string) {
    this.searchService.searchUsers(query).subscribe();
  }

  showInvite(userToInvite: UserToInvite) {
    this.userToInvite = userToInvite;
    this.showInviteDialog.set(true);
  }

  sendInvite() {
    this.showInviteDialog.set(false);
    if (!this.userToInvite) return;

    this.inviteService.sendInvite(this.userToInvite.id).subscribe({
      next: () => {
        this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.SEND_INVITE, 'success');
      },
      error: ({ error }: HttpErrorResponse) => {
        const apiError = error as ApiErrorRes;

        if (SNACKBAR_MSG_REGISTRY[apiError.type])
          this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY[apiError.type], 'error');
        else this.snackbarService.newSnackbar(SNACKBAR_MSG_REGISTRY.SEND_INVITE_FAIL, 'error');
      },
    });
  }
}
