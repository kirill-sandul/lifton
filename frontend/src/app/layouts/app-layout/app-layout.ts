import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header';

@Component({
  selector: 'app-app-layout',
  imports: [HeaderComponent],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayoutComponent {
  ngOnInit(){
    document.body.classList.add('default-bg');
  }

  ngOnDestroy(){
    document.body.classList.remove('default-bg');
  }
}
