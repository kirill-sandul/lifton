import { Component, inject } from '@angular/core';
import { ClientPreviewComponent } from '@shared/components/client-preview/client-preview';
import { TrainerService } from '@core/services/roles/trainer/trainer.service';
import { ButtonComponent } from '@shared/components/button/button';
import { LucideArrowUpRight } from '@lucide/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients-list-widget',
  imports: [ClientPreviewComponent, ButtonComponent, LucideArrowUpRight, RouterLink],
  templateUrl: './clients-list-widget.html',
  styleUrl: './clients-list-widget.scss',
})
export class ClientsListWidgetComponent {
  trainerService = inject(TrainerService);
  clientsList = this.trainerService.clients().slice(0, 3);
}
