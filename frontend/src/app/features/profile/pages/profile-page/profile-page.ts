import { Component } from '@angular/core';
import { LucideLogOut, LucidePencil } from '@lucide/angular';

@Component({
  selector: 'app-profile-page',
  imports: [LucidePencil, LucideLogOut],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePageComponent {}
