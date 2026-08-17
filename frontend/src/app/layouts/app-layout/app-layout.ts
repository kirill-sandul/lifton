import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header';
import { ScrollService } from '@core/services/scroll/scroll';

@Component({
  selector: 'app-app-layout',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayoutComponent {
  private scrollService = inject(ScrollService)

  ngOnInit(){
    document.body.classList.add('default-bg');
  }

  ngOnDestroy(){
    document.body.classList.remove('default-bg');
  }

  onScroll(event: Event){
    const scrollY = (event.target as HTMLElement).scrollTop;

    if(scrollY > 20) this.scrollService.setScrolled();
    else this.scrollService.removeScrolled();
  }
}
