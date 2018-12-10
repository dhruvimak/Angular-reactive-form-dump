import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export class CutsomValidators{

    static emailDomainValidation(domainName: string): ValidatorFn | null {
        return (control: AbstractControl): { [key: string]: any } | null => {
           const email = control.value;
           const domain = email.substring(email.lastIndexOf('@') + 1);
           if (email == '' || domain.toLowerCase() === domainName.toLowerCase()) {
              return null;
           } else {
              return { 'emailDomain': true };
           }
        };
     }

     static matchPassword(pswdGroup: FormGroup): { [key: string]: any } | null {
        const password = pswdGroup.get('password');
        const confirmPassword = pswdGroup.get('confirmPassword');
        if (password.value === confirmPassword.value || confirmPassword.pristine) {
            return null;
        } else {
            return { 'passwordValidation': true };
        }  
    }
}