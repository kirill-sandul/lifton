import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TodoListItem {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  taskId: string;

  @IsNotEmpty()
  content: string;
}

export class TodoListItemUpdate {
  @IsBoolean()
  completed: boolean;
}
