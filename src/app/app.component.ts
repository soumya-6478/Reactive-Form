import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from './common/password.validators';
import { UserNameValidators } from './common/user.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userform: FormGroup;
  genders = ['male', 'female'];
  submitted = false;
  isValid = true;

  get username() {
    return this.userform.get('user.username');
  }
  get email() {
    return this.userform.get('user.email');
  }
  get controls() {
    return (this.userform.get('hobbies') as FormArray).controls;
  }
  get topics() {
    return this.userform.get('topics') as FormArray;
  }
  get old() {
    return this.userform.get('old');
  }
  get new() {
    return this.userform.get('new');
  }
  get confirm() {
    return this.userform.get('confirm');
  }

  ngOnInit() {
    this.userform = new FormGroup(
      {
        user: new FormGroup({
          username: new FormControl('default', [
            Validators.required,
            UserNameValidators.forbiddenNames,
          ]),
          email: new FormControl(
            '',
            [Validators.required, Validators.email],
            UserNameValidators.shouldBeUnique
          ),
          check: new FormControl(null),
        }),
        gender: new FormControl('male'),
        old: new FormControl(
          '',
          [Validators.required],
          PasswordValidators.oldShouldBeSame
        ),
        new: new FormControl('', [Validators.required]),
        confirm: new FormControl('', [Validators.required]),
        hobbies: new FormArray([]),
        topics: new FormArray([]),
      },
      {
        validators: PasswordValidators.passwordsShouldMatch,
      }
    );
    // this.userform.valueChanges.subscribe((value) => console.log(value));
    // this.userform.statusChanges.subscribe((status) => console.log(status));
    // this.userform
    //   .get('user.email')
    //   .valueChanges.subscribe((value) => console.log(value));
    // this.userform
    //   .get('user.email')
    //   .statusChanges.subscribe((status) => console.log(status));

    // this.userform.get('user.check').valueChanges.subscribe(checkedValue => {
    //   const email = this.userform.get('user.email')
    //   if(checkedValue){
    //     email.addValidators(Validators.email)
    //   }
    // })
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.userform);
    // console.log(this.userform.value);
    // let isValid = authService.login(this.userform.value)
    this.isValid = false;
    if (!this.isValid) {
      this.userform.setErrors({
        invalidLogin: true,
      });
    }
    // this.userform.reset();
  }

  onAddHobby() {
    let control = new FormControl(null, Validators.required);
    (<FormArray>this.userform.get('hobbies')).push(control);
  }

  onClick(topic: HTMLInputElement, event: Event) {
    event.preventDefault();
    this.topics.push(new FormControl(topic.value));
    topic.value = '';
  }

  removeTopic(topic: FormControl) {
    let index = this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
  }

  handleKeyEnter(event: Event) {
    event.preventDefault();
  }
}
