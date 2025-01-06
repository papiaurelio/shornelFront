import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as fromRoot from '@app/store';
import { Store, select } from "@ngrx/store";
import * as fromUser from '@app/store/user';
import { filter, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication();
  }

  private checkAuthentication(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(fromUser.getUser),
      map(user => {
        if (!user) {
          // Usuario no autenticado, redirigir a la página de login
          return this.router.createUrlTree(['auth/login']);
        } else if (!user.administrador) {
          // Usuario autenticado pero no es administrador, redirigir a otra página o mostrar mensaje de error
          // Aquí puedes decidir qué hacer en este caso específico
          return this.router.createUrlTree(['/']); // Por ejemplo, redirigir a la página principal
        } else {
          // Usuario autenticado y es administrador, permitir el acceso
          return true;
        }
      })
    );
  }


 }
