import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { authActions } from "../../store/actions";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { RouterLink } from "@angular/router";
import { AsyncPipe, NgIf } from "@angular/common";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducer";
import { AuthService } from "../../services/auth.service";
import { combineLatest } from "rxjs";
import { BackendErrors } from "../../../shared/components/backendErrors.component";

@Component({
  selector: 'app-register',
  imports: [NgIf, ReactiveFormsModule, RouterLink, AsyncPipe, BackendErrors],
  standalone: true,
  templateUrl: './register.component.html',
})

export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private authService = inject(AuthService);

  public data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

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
    this.store.dispatch(authActions.register({ request }));
  };
};