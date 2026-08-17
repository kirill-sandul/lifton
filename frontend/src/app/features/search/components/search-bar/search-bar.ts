import { Component, input, output } from '@angular/core';
import { LucideSearch } from '@lucide/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [LucideSearch, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBarComponent {
  placeholder = input<string>('');

  onEndTyping = output<string>();

  searchQuery: string = '';
  endTypingTimeout: any = null;

  startTyping() {}

  endTyping() {
    if (this.endTypingTimeout) {
      clearTimeout(this.endTypingTimeout);
    }
    this.endTypingTimeout = setTimeout(() => {
      this.onEndTyping.emit(this.searchQuery);
    }, 400);
  }
}
