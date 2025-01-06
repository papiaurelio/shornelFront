import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { environment } from '@src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import * as fromActions from './save.actions';
import { ProductCreateRequest, ProductResponse, ProductUpdateRequest } from './save.models';

import { NotificationService } from "@app/services";

type Action = fromActions.All;

@Injectable()
export class ListEffects {

  constructor(
    private action: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private notification: NotificationService
  ) { }

  create: Observable<Action> = createEffect(() =>
    this.action.pipe(
      ofType(fromActions.Types.CREATE),
      map((action: fromActions.Create) => action.product),
      switchMap((request: ProductCreateRequest) =>
        this.httpClient.post<ProductResponse>(`${environment.url}/api/Producto`, request)
          .pipe(
            delay(1000),
            tap( (product: ProductResponse) => {
                this.router.navigate(['/shop']);
                this.notification.success('Registro de producto exitoso');
            }),
            map((product: ProductResponse) => new fromActions.CreateSuccess(product)),
            catchError(err => of(new fromActions.CreateError(err.message)))
          )
      )
    )
  );


  update: Observable<Action> = createEffect(() =>
    this.action.pipe(
      ofType(fromActions.Types.UPDATE),
      switchMap((action: fromActions.Update) =>
        this.httpClient.put<ProductResponse>(`${environment.url}/api/Producto/${action.id}`, action.product)
          .pipe(
            delay(1000),
            map((product: ProductResponse) => {

              this.notification.success('Producto actualizado');
              return new fromActions.UpdateSuccess(product)

            }),
            catchError(err =>{
              const errorMessage = err.error.message; // Acceder al mensaje de error específico
              this.notification.error(err.error.message);
              return of(new fromActions.UpdateError(err.message))
            })
          )
      )
    )
  );



  read: Observable<Action> = createEffect(() =>
    this.action.pipe(
      ofType(fromActions.Types.READ),
      map((action: fromActions.Read) => action.id),
      switchMap((id: string) =>
        this.httpClient.get<ProductResponse>(`${environment.url}/api/Producto/${id}`)
          .pipe(
            delay(1000),
            map((product: ProductResponse) => new fromActions.ReadSuccess(product)),
            catchError(err => of(new fromActions.ReadError(err.message)))
          )
      )
    )
  );






}
