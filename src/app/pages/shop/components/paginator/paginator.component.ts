import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Pagination } from '../../store/list';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';
import {Subject} from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/list';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {

  @Input() pagination !: Pagination;
  @ViewChild(MatPaginator) matPaginator !: MatPaginator;
  paginatorParams !: HttpParams;
  private destroy = new Subject<any>();

  pageCount = 0;
  pageSize = 6;
  pageCombo = [6,10];
  sort = "nombreAsc";


  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.store.pipe(takeUntil(this.destroy)).pipe(select(fromList.getPaginationRequest))
    .subscribe((data: any) => {
      this.paginatorParams = data
    })

    this.store.pipe(takeUntil(this.destroy)).pipe(select(fromList.getShop))
    .subscribe( (data: any) => {
      this.pageSize = data.pageSize;
      this.pageCount = data.count;
      if(this.matPaginator){
        this.matPaginator.pageIndex = data.pageIndex -1;
      }
    })
  }

  eventoPaginador(event: PageEvent): void {
    this.paginatorParams = this.paginatorParams.delete('pageIndex');
    this.paginatorParams = this.paginatorParams.delete('pageSize');

    this.paginatorParams = this.paginatorParams.set('pageIndex', event.pageIndex +1);
    //this.paginatorParams = this.paginatorParams.set('pageSize', event.pageSize);

    this.store.dispatch(new fromList.Read(this.paginatorParams, this.paginatorParams.toString()));

  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

}
