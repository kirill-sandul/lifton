import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LucideUpload } from '@lucide/angular';

@Component({
  selector: 'app-file-input',
  imports: [ReactiveFormsModule, LucideUpload],
  templateUrl: './file-input.html',
  styleUrl: './file-input.scss'
})
export class FileInputComponent {
  id = input('')
  placeholder = input('')
  control = input<FormControl<File | null>>(new FormControl());
  style = input<'outlined' | 'filled'>('outlined')
  
  onSelected = output()

  onFileUpload(event: Event){
    const input = event.target as HTMLInputElement;

    if(!input.files?.length) return;

    const file = input.files[0];

    this.control().setValue(file);

    this.onSelected.emit();

    input.value = '';
  }
}
