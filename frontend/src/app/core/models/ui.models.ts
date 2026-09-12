export type InputType = 'text' | 'email' | 'password' | 'textarea' | 'number';

export interface SelectInputOption {
  label: string;
  value: string;
}

export interface AutocompleteInputListItem {
  name: string;
  previewProp?: string;
  props?: any;
}

export type AutocompleteInputList = AutocompleteInputListItem[];
