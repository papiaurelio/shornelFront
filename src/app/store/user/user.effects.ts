import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationService } from "@app/services";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { environment } from "@src/environments/environment";
import { Observable, of } from "rxjs";
import { catchError, switchMap, tap, map } from "rxjs/operators";
import * as fromActions from './user.actions';
import { UserResponse } from "./user.models";

type Action = fromActions.All;

@Injectable()
export class UserEffects {
    constructor(
      private actions: Actions,
      private router: Router,
      private httpClient: HttpClient,
      private notification: NotificationService
    ){}

    signUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGIN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.user),
      switchMap(userData =>
        this.httpClient.post<UserResponse>(`${environment.url}/api/Usuario/Registrar`, userData)
          .pipe(
            tap((response: UserResponse) => {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/shop']);
              this.notification.success('Registro exitoso');
            }),
            map((response: UserResponse) => new fromActions.SignUpEmailSuccess(response.id, response || null)),
            //catchError(err => of(new fromActions.SignUpEmailError(err.message)))

            catchError(err => {
              const errorMessage = err.error.message; // Acceder al mensaje de error específico

              this.notification.error(err.error.message);
              return of(new fromActions.SignUpEmailError(errorMessage));
            })

          )
      )
    )
  );

  signInEmail: Observable<Action> = createEffect(() =>
  this.actions.pipe(
    ofType(fromActions.Types.SIGIN_IN_EMAIL),
    map((action: fromActions.SignInEmail) => action.credentials),
    switchMap(credentials =>
      this.httpClient.post<UserResponse>(`${environment.url}/api/Usuario/login`, credentials)
        .pipe(
          tap((response: UserResponse) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/shop']);
            this.notification.success('Inicio de sesión exitoso');
          }),
          map((response: UserResponse) => new fromActions.SignInEmailSuccess(response.id, response || null)),
          //catchError(err => of(new fromActions.SignInEmailError(err.message)))

          catchError(err => {
            const errorMessage = err.error.message; // Acceder al mensaje de error específico

            this.notification.error(err.error.message);
            return of(new fromActions.SignInEmailError(errorMessage));
          })
        )
    )
  )
  );


  init: Observable<Action> = createEffect(() =>
  this.actions.pipe(
    ofType(fromActions.Types.INIT),
    switchMap(async () => localStorage.getItem('token')),
    switchMap(token => {

      if (token) {
        return this.httpClient.get<UserResponse>(`${environment.url}/api/Usuario`)
          .pipe(
            tap((user: UserResponse) => {
              //console.log('data del usuario en sesion que viene del servidor=>', user);
            }),
            map((user: UserResponse) => new fromActions.InitAuthorized(user.id, user || null)),
            //catchError(err => of(new fromActions.InitError(err.message)))
            catchError(err => {
              const errorMessage = err.error.message; // Acceder al mensaje de error específico

              this.notification.error(err.error.message);
              return of(new fromActions.InitError(errorMessage));
            })

          )
      } else {
        return of(new fromActions.InitUnauthorized());
      }
    }
    )
  )
  );


}






