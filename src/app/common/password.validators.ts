import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class PasswordValidators {
  static oldShouldBeSame(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const oldPassword = ['1234'];
    // console.log(control.value);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (oldPassword.includes(control.value)) {
          resolve(null);
        } else resolve({ invalidPassword: true });
      }, 2000);
    });
  }
  // if we are not using reject we can remove it
  //    if we apply async validator in form label the control object can track all other formControl value ONLY in which async validator applied
  //   static passwordsShouldMatch(
  //     control: AbstractControl
  //   ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //     let newPassword = control.get('new');
  //     let confirmPassword = control.get('confirm');
  //     console.log(newPassword, confirmPassword);
  //     // console.log(control.value);
  //     // console.log(control.get('new')?.value);
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         if (newPassword !== confirmPassword) {
  //           resolve({ passwordsShouldMatch: true });
  //         } else resolve(null);
  //       }, 2000);
  //     });

  static passwordsShouldMatch(
    control: AbstractControl
  ): ValidationErrors | null {
    let newPassword = control.get('new');
    let confirmPassword = control.get('confirm');
    if (newPassword.pristine || confirmPassword.pristine) return null; // we can achieve the same thing in template by applying confirm.valid to *ngIf

    // console.log(newPassword === confirmPassword);
    if (newPassword.value !== confirmPassword.value) {
      return { passwordsShouldMatch: true };
    }
    return null;
  }
}
