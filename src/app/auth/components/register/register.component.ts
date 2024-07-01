import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { register } from "../../store/actions";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { RouterLink } from "@angular/router";
import { AuthStateInterface } from "../../types/authState.interface";
import { AsyncPipe } from "@angular/common";
import { selectIsSubmitting } from "../../store/reducer";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  standalone: true,
  templateUrl: './register.component.html',
})

export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store<{ auth: AuthStateInterface }>);

  public isSubmitting$ = this.store.select(selectIsSubmitting);

  public form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  public onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(register({ request }));
  };
};