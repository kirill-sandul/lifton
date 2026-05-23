import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LucideBell, LucideMail, LucideSun, LucideMoveRight } from "@lucide/angular";

@Component({
  selector: 'app-header',
  imports: [RouterLink, LucideSun, LucideBell, LucideMail, LucideMoveRight],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {}
