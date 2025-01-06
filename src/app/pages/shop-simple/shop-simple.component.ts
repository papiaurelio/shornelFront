import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../shop/store/list';
import { HttpParams } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import * as fromList from '../shop/store/list';
import * as fromRoot from '@app/store';
import * as fromUser from '../../../app/store/user';


@Component({
  selector: 'app-shop-simple',
  templateUrl: './shop-simple.component.html',
  styleUrls: ['./shop-simple.component.scss']
})
export class ShopSimpleComponent implements OnInit {
  loading$ !: Observable<boolean | null>;
  pagination$ !: Observable<Pagination>;
  params = new HttpParams();

  user$ !: Observable<fromUser.UserResponse>;

  constructor( private store: Store<fromList.ListState>,
    private storeRoot: Store<fromRoot.State>,) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(fromUser.getUser)) as Observable<fromUser.UserResponse>;


    this.loading$ = this.store.pipe(select(fromList.getLoading));
    this.pagination$ = this.store.pipe(select(fromList.getShop)) as Observable<Pagination>;
    this.params = this.params.set('pageIndex', 1);
    this.params = this.params.set('pageSize', 9);

    this.store.dispatch(new fromList.Read(this.params, this.params.toString()));
  }



}
