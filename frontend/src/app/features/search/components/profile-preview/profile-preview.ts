import { Component, input } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button';
import { PfpCircleComponent } from '@shared/components/pfp-circle/pfp-circle';

@Component({
  selector: 'app-profile-preview',
  imports: [ButtonComponent, PfpCircleComponent],
  templateUrl: './profile-preview.html',
  styleUrl: './profile-preview.scss',
})
export class ProfilePreviewComponent {
  pfpUrl = input<string>();
  fullName = input<string>();
  email = input<string>();
  active = input<boolean>();
}
