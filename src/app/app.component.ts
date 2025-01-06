
import { Component, OnInit, NgZone } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUser from './store/user';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { ShowHeaderService } from './services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  openMenu = false;

  user$ !: Observable<fromUser.UserResponse>;
  isAuthorized$ !: Observable<boolean>;
  showHeader: boolean = true;


  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private headerService: ShowHeaderService,
    private ngZone: NgZone
  ){
  }

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
        });
      }
    });

    this.user$ = this.store.pipe(select(fromUser.getUser)) as Observable<fromUser.UserResponse>;
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized)) as Observable<boolean>;

    this.store.dispatch(new fromDictionaries.Read());

    this.store.dispatch(new fromUser.Init());

    this.headerService.showHeader$.subscribe(show => this.showHeader = show);
  }

  onSignOut() : void {
    localStorage.removeItem('token');
    this.store.dispatch(new fromUser.SignOut());

    this.router.navigate(['/auth/login']);
  }
}
