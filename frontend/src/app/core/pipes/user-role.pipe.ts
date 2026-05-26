import { Pipe, PipeTransform } from "@angular/core";
import { UserRole } from "@core/models/user.models";
import { USER_ROLE_LABELS } from "@shared/constants/ui-mapping/user-role.labels";

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {
  transform(value: UserRole | null | undefined) {
    if(!value) return '';

    return USER_ROLE_LABELS[value] ?? value;
  }
}