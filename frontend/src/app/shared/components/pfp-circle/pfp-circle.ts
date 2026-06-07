import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'div[pfpCircle]',
  imports: [],
  template: '',
})
export class PfpCircleComponent {
  pfpUrl = input<string | null>();

  @HostBinding('class.pfp-style')
  @HostBinding('style.background-image')
  get url() {
    return `url("${this.pfpUrl() ?? '/assets/no-pfp.png'}")`;
  }
}
