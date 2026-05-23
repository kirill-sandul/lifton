import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register-page',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPageComponent {}
