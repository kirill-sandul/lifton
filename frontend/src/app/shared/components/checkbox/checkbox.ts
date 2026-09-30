import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  initiallyChecked = input(false);

  isChecked = signal(false);

  onCheck = output<boolean>();

  ngOnInit() {
    this.isChecked.set(this.initiallyChecked());
  }
}
