import { Component, inject } from '@angular/core';
import { TrainerFacade } from '@core/facades/roles/trainer/trainer.facade';
import { ClientsLibListWidget } from '@features/clients-lib/components/clients-lib-list-widget/clients-lib-list-widget';

@Component({
  selector: 'app-clients-lib-page',
  imports: [ClientsLibListWidget],
  templateUrl: './clients-lib-page.html',
  styleUrl: './clients-lib-page.scss',
})
export class ClientsLibPageComponent {
  trainerFacade = inject(TrainerFacade);

  onClientSelect(id: string) {}
}
