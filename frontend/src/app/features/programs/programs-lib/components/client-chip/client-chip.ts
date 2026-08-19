import { Component, input } from '@angular/core';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-chip',
  imports: [PfpCircleComponent, RouterLink],
  templateUrl: './client-chip.html',
  styleUrl: './client-chip.scss',
})
export class ClientChip {
  pfpUrl = input<string>();
  fullName = input.required<string>();
  username = input.required<string>();
}
