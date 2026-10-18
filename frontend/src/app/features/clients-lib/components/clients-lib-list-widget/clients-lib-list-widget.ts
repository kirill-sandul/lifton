import { Component, computed, inject, model, output, signal } from '@angular/core';
import { TrainerFacade } from '@core/facades/roles/trainer/trainer.facade';
import { ClientPreviewComponent } from '@shared/components/client-preview/client-preview';
import { LucideDynamicIcon } from '@lucide/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'clients-lib-list-widget',
  imports: [ClientPreviewComponent, LucideDynamicIcon, FormsModule],
  templateUrl: './clients-lib-list-widget.html',
  styleUrl: './clients-lib-list-widget.scss',
})
export class ClientsLibListWidget {
  trainerFacade = inject(TrainerFacade);

  clientSelectId = output<string>();

  clientsList = computed(() => this.trainerFacade.clients());
  filteredClientsList = computed(() =>
    this.clientsList().filter((client) => {
      const normalizedUsername = client.user.username.toLowerCase();
      const normalizedFullname = client.user.fullName.toLowerCase();

      if (
        normalizedUsername.includes(this.searchBarValue().toLowerCase()) ||
        normalizedFullname.includes(this.searchBarValue().toLowerCase())
      )
        return true;

      return false;
    }),
  );

  selectedClientId = signal<string | null>(null);

  searchBarValue = model<string>('');

  onClientSelect(id: string) {
    this.selectedClientId.set(id);
    this.clientSelectId.emit(id);
  }

  onTypingSearch() {}
}
