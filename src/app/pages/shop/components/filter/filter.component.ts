import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ControlEntities } from '@app/shared/utils/form';
import { Dictionaries } from '@app/store/dictionaries';
import {ControlItem} from '@app/models/frontend';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromList from '../../store/list';
import * as fromRoot from '@app/store';
import { MatSelectionListChange } from '@angular/material/list';

import {ReinicioFiltrosService} from '@app/services/reinicioFiltros/reinicio-filtros.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  @Input() dictionaries !: Dictionaries | null;
  form!: FormGroup
  controls !: ControlEntities
  items !: ControlItem[];
  categoria !: ControlItem[];
  marca !: ControlItem[];
  paginatorParams !: HttpParams;
  private destroy = new Subject<any>();


  constructor(
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,

    private eventServices: ReinicioFiltrosService
  ) { }

  ngOnInit(): void {

    this.store.pipe(takeUntil(this.destroy)).pipe(select(fromList.getPaginationRequest))
    .subscribe((data:any) => {
      this.paginatorParams = data
    })

    this.categoria = this.dictionaries?.categoria.controlItems as ControlItem[];
    this.marca = this.dictionaries?.marca.controlItems as ControlItem[];

    this.items = [
      {value: 'precioAsc', label: 'Precio más bajo'},
      {value: 'precioDesc', label: 'Precio más alto'},
      {value: 'nombreAsc', label: 'Nombre A-Z'},
    ]

    this.form = this.fb.group({
      sort: [null, {
        updateOn: 'change', validators:[]
      }],
      categoria: null,
      marca: null
    })

    this.controls = {
      sort: {
        items: this.items,
        changed: () => {
          this.paginatorParams = this.paginatorParams.delete('sort');
          this.paginatorParams = this.paginatorParams.set('sort', this.form.value.sort);
          this.store.dispatch(new fromList.Read(this.paginatorParams, this.paginatorParams.toString()));
        }
      }
    }


  }

  onCategoriasSelectionChange(ob: MatSelectionListChange){
    this.paginatorParams = this.paginatorParams.delete('categoria');
    this.paginatorParams = this.paginatorParams.delete('pageIndex');
    this.paginatorParams = this.paginatorParams.set('categoria', this.form.get('categoria')?.value);
    this.paginatorParams = this.paginatorParams.set('pageIndex', 1);


    this.store.dispatch(new fromList.Read(this.paginatorParams, this.paginatorParams.toString()));
  }

  onMarcasSelectionChange(ob: MatSelectionListChange){
    this.paginatorParams = this.paginatorParams.delete('marca');
    this.paginatorParams = this.paginatorParams.delete('pageIndex');
    this.paginatorParams = this.paginatorParams.set('marca', this.form.get('marca')?.value);

    this.paginatorParams = this.paginatorParams.set('pageIndex', 1);

    this.store.dispatch(new fromList.Read(this.paginatorParams, this.paginatorParams.toString()));
  }

  reinicarFiltros() : void {
    this.paginatorParams = this.paginatorParams.delete('marca');
    this.paginatorParams = this.paginatorParams.delete('categoria');
    this.paginatorParams = this.paginatorParams.delete('sort');
    this.paginatorParams = this.paginatorParams.delete('pageIndex');

    this.store.dispatch(new fromList.Read(this.paginatorParams, this.paginatorParams.toString()));
    this.form.reset();
    this.botonReinicioFiltros();
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  botonReinicioFiltros() {
    this.eventServices.emitirReinicio();
  }

}
