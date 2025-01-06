import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/list';
import { takeUntil } from 'rxjs/operators';

import {ReinicioFiltrosService} from '@app/services/reinicioFiltros/reinicio-filtros.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {

  filtro !: boolean;
  form !: FormGroup;
  paginatorParams !: HttpParams;
  private destroy = new Subject<any>();

  constructor(
    private fb : FormBuilder,
    private store: Store<fromRoot.State>,

    private eventServices: ReinicioFiltrosService ) {

   }

  ngOnInit(): void {
      this.store.pipe(takeUntil(this.destroy)).pipe(select(fromList.getPaginationRequest))
      .subscribe( (data:any) => {
         this.paginatorParams = data;
      })

      this.form = this.fb.group({
        search: [null, {
          updateOn: 'change', validators: []
        }]
      })

      this.eventServices.reinicioClicked$.subscribe( () =>{
        this.form = this.fb.group({
          search: [null, {
            updateOn: 'change', validators: []
          }]
        }),
        this.onSubmit();
      })

  }



  public onSubmit(): void {
    const value = this.form.value;
    this.paginatorParams = this.paginatorParams.delete('search');
    this.paginatorParams = this.paginatorParams.delete('pageIndex');

    this.paginatorParams = this.paginatorParams.set('pageIndex', 1);

    if (value.search !== null && value.search.trim() !== ''){
      this.paginatorParams = this.paginatorParams.set('search', value.search.trim());
    }

    this.store.dispatch(new fromList.Read(this.paginatorParams, this.paginatorParams.toString()));
  }

  ngOnDestroy():void {
    this.destroy.next(null);
    this.destroy.complete();
  }


}


