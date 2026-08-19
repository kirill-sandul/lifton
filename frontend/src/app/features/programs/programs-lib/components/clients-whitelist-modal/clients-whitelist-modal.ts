import { Component, computed, inject, output, signal } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal';
import { LucideDynamicIcon } from '@lucide/angular';
import { TrainerService } from '@core/services/roles/trainer/trainer.service';
import { ProgramsLibFacade } from '@features/programs/programs-lib/facade/programs-lib.facade';
import { ClientChip } from '@features/programs/programs-lib/components/client-chip/client-chip';
import { ButtonComponent } from '@shared/components/button/button';
import { FormsModule } from '@angular/forms';
import { TrainingProgramWhitelist } from '@features/programs/programs-lib/models/programs-lib.models';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

interface RemoveClientConfirmDialog {
  show: boolean;
  clientId: string;
  origin: CdkOverlayOrigin;
}

@Component({
  selector: 'app-clients-whitelist-modal',
  imports: [
    ModalComponent,
    LucideDynamicIcon,
    ClientChip,
    ButtonComponent,
    FormsModule,
    ConfirmDialogComponent,
    CdkOverlayOrigin,
  ],
  templateUrl: './clients-whitelist-modal.html',
  styleUrl: './clients-whitelist-modal.scss',
})
export class ClientsWhitelistModalComponent {
  programsLibFacade = inject(ProgramsLibFacade);
  trainerService = inject(TrainerService);

  confirmDialog = signal<RemoveClientConfirmDialog | null>(null);

  searchValue = signal<string>('');

  filteredWhitelist = computed<TrainingProgramWhitelist>(() => {
    return this.programsLibFacade.selectedProgramWhitelist().filter((client) => {
      const fullName = client.user.fullName.toLowerCase();
      const username = client.user.usernameCanonical;

      return (
        fullName.includes(this.searchValue().toLowerCase()) ||
        username.includes(this.searchValue().toLowerCase())
      );
    });
  });

  onClose = output();

  openRemoveClientDialog(clientId: string, origin: CdkOverlayOrigin) {
    this.confirmDialog.set({
      show: true,
      clientId,
      origin,
    });
  }

  closeRemoveClientDialog() {
    this.confirmDialog.set(null);
  }

  assignClient(clientId: string) {
    this.programsLibFacade.assignClient(clientId);
  }

  removeClient() {
    if (!this.confirmDialog()) return;

    this.programsLibFacade.removeClient(this.confirmDialog()!.clientId);
    this.closeRemoveClientDialog();
  }
}
