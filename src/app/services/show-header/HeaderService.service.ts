import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowHeaderService {
  private _showHeader = new BehaviorSubject<boolean>(true);
  showHeader$ = this._showHeader.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const childRoute = this.route.root.firstChild;
      if (childRoute?.snapshot.data.showHeader !== undefined) {
        this._showHeader.next(childRoute.snapshot.data.showHeader);
      } else {
        this._showHeader.next(true); // valor por defecto
      }
    });
  }
}
