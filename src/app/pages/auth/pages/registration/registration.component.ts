import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexErrors, regex, markFormGroupTouched } from '@app/shared/utils';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  form !: FormGroup;
  regexErrors = regexErrors;
  loading$ !: Observable<boolean | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
      this.loading$ = this.store.pipe(select(fromUser.getLoading));

      this.form = this.fb.group({
        email: [null, {
          updateOn: 'change', validators: [
            Validators.required,
            Validators.maxLength(128),
            Validators.pattern(regex.email)
          ]
        }],
        username: [null, {
          updateOn: 'change', validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(128),
          ]
        }],
        nombre: [null, {
          updateOn: 'change', validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(128),
          ]
        }],
        apellido: [null, {
          updateOn: 'change', validators: [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(128),
          ]
        }],
        password: [null, {
          updateOn: 'change', validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password)
          ]
        }],
        passwordRepeat: [null, {
          updateOn: 'change', validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password)
          ]
        }],


      }, {validator: this.repeatPasswordValidator})


  }


  private repeatPasswordValidator(group: FormGroup): {[key: string]: boolean} | null {
    const password = group.get('password');
    const passwordRepeat = group.get('passwordRepeat');

    return passwordRepeat?.value && password?.value !== passwordRepeat.value
          ? {repeat : true}
          : null;
  }


  onSubmit() : void {

      if( this.form.valid){
        const value = this.form.value;

        const userCreateRequest: fromUser.UserCreateRequest = {
          email : value.email,
          password: value.password,
          nombres: value.nombre,
          apellidos: value.apellido,
          username: value.username,
          //administrador: value.administrador
        }

        this.store.dispatch(new fromUser.SignUpEmail(userCreateRequest));

      }else{
        markFormGroupTouched(this.form);
      }


  }


}
