import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CutsomValidators } from "../shared/validators.component";

@Component({
    selector: 'app-signin-form',
    templateUrl: './signin-form.component.html',
    styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {

    signupForm: FormGroup;

    validationMessages = {
        'fullName': {
            'required': 'Full Name is required',
            'minlength': 'Minimum length is 2',
            'maxlength': 'Maximum length is 30'
        },
        'email': {
            'required': 'email is required',
            'emailDomain': 'email Domain should be school.com'
        },
        'phone': {
            'required': 'phone is required',
            'minlength': 'please enter 10 digit phone number',
            'maxlength': 'please enter 10 digit phone number'
        },
        // 'skillName': {
        //     'required': 'skillName is required'
        // },
        // 'experianceInYears': {
        //     'required': 'experianceInYears is required'
        // },
        // 'proficency': {
        //     'required': 'proficency is required'
        // },
        'password': {
            'required': 'password is required'
        },
        'confirmPassword': {
            'required': 'Confirm Password is required'
        },
        'passwordSet': {
            'passwordValidation': 'Password do not match'
        }
    };

    formErrors = {
        'fullName': '',
        'email': '',
        'phone': '',
        // 'skillName': '',
        // 'experianceInYears': '',
        // 'proficency': '',
        'password': '',
        'confirmPassword': '',
        'passwordSet': ''
    };

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.signupForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
            contact: ['email'],
            email: ['', [Validators.required, CutsomValidators.emailDomainValidation('school.com')]],
            phone: [{ value: '', disabled: true }],
            skills: this.fb.array([
                this.addNewSkillFormGroup()
            ]),
            passwordSet: this.fb.group({
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required]
            }, { validators: CutsomValidators.matchPassword })
        });

        this.signupForm.valueChanges.subscribe((data: string) => {
            this.logValidationErrors(this.signupForm);
        });

        this.signupForm.get('contact').valueChanges.subscribe((data: string) => {
            this.onContactPreferenceChange(data);
        });
    }

    onContactPreferenceChange(selectedValue: string) {
        const phoneControl = this.signupForm.get('phone');
        if (selectedValue === 'phone') {
            this.signupForm.controls.email.disable();
            this.signupForm.controls.phone.enable();
            phoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
        } else {
            phoneControl.clearValidators();
            this.signupForm.controls.email.enable();
            this.signupForm.controls.phone.disable();
        }
        phoneControl.updateValueAndValidity();
    }

    logValidationErrors(group: FormGroup = this.signupForm): void {
        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.get(key);
            this.formErrors[key] = '';

            if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
                const message = this.validationMessages[key];
                for (const errorKey in abstractControl.errors) {
                    if (errorKey) {
                        this.formErrors[key] += message[errorKey] + ' ';
                    }
                }
            }

            if (abstractControl instanceof FormGroup) {
                this.logValidationErrors(abstractControl);
            }

            // if (abstractControl instanceof FormArray) {
            //     for(const control of abstractControl.controls){
            //         if(control instanceof FormGroup){
            //             this.logValidationErrors(control);
            //         }
            //     }
            // }
        });
    }

    addNewSkillFormGroup(): FormGroup {
        return this.fb.group({
            skillName: ['', Validators.required],
            experianceInYears: ['', Validators.required],
            proficency: ['Begginer', Validators.required]
        })
    }

    onAddSkillButtonClick() {
        (<FormArray>this.signupForm.get('skills')).push(this.addNewSkillFormGroup());
    }

    removeSkillGroup(skillGroupIndex: number): void {
        (<FormArray>this.signupForm.get('skills')).removeAt(skillGroupIndex);
    }

    onLoadDataClick(): void {

    }

    onSubmit(): void {
        console.log(this.signupForm.get('email').errors);

    }
}

