import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export class UserNameValidators {
  //   static forbiddenUsernames: any;
  //   static forbiddenNames: ValidatorFn;
  static forbiddenNames(control: AbstractControl): ValidationErrors | null {
    const forbiddenUsernames = ['chrish', 'anna'];
    if (forbiddenUsernames.indexOf(control.value) == -1) {
      return null;
    }
    return { forbiddenNames: true };
  }

  static shouldBeUnique(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const forbiddenEmail = ['soumya.6478@gmail.com', 'dipu.851@gmail.com'];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (forbiddenEmail.includes(control.value)) {
          resolve({ shouldBeUnique: true });
        } else resolve(null);
      }, 2000);
    });
  }
}
