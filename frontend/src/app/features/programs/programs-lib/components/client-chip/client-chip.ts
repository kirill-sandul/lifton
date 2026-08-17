import { Component, input } from '@angular/core';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';

@Component({
  selector: 'app-client-chip',
  imports: [PfpCircleComponent],
  templateUrl: './client-chip.html',
  styleUrl: './client-chip.scss',
})
export class ClientChip {
  pfpUrl = input<string>();
  fullName = input.required<string>();
}
