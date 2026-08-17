import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  isScrolled = signal(false);

  setScrolled(){
    this.isScrolled.set(true);
  }

  removeScrolled(){
    this.isScrolled.set(false);
  }
}
