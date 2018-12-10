import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      // new form group
      skills: new FormGroup({
        skillName: new FormControl(),
        experianceInYears: new FormControl(),
        proficency: new FormControl()
      })
    });
  }

  onLoadDataClick(): void {
    this.signupForm.setValue({
      fullName: 'Dhruvi',
      email: 'dhruvi@gmail.com',
      skills: {
        skillName: 'Angular',
        experianceInYears: 3,
        proficency: 'Begginer'
      }
    })
  }

  onSubmit(): void {
    console.log(this.signupForm);

  }

}
