import {  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import * as fromDictionaries from '@app/store/dictionaries';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';
import * as fromForm from '../../store/form';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { MapperService } from '../update-product/services/mapper/mapper.service';
// import { ControlItem } from '@app/models/frontend';
import { Pagination } from '@app/pages/shop/store/list';
import { HttpParams } from '@angular/common/http';

import * as fromUser from '../../../../../app/store/user';

import * as fromList2 from '../../../shop/store/list';
import { CarritoComprasService } from '../../../../services/carritoCompras/carrito-compras.service';
import { ItemCarrito } from '@app/models/backend';
import { NotificationService } from '@app/services';
import { UserService } from '@app/services/Users/user.service';




@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProductComponent implements OnInit {

  loading$!: Observable<boolean | null>;
  // dictionaries !: Observable<fromDictionaries.Dictionaries>;
  // categorias!:  ControlItem[];
  // marcas!:  ControlItem[];
  producto!: fromForm.ProductForm;
  cantidad: number = 1; // Inicializar cantidad a 1


  // agregando recomendados
  pagination$ !: Observable<Pagination>;
  params = new HttpParams();

  user$ !: Observable<fromUser.UserResponse>;

  carritoActual: ItemCarrito[] = [];
  isAuthorized$!: Observable<boolean>;

  id !: number;

  constructor(
    private store: Store<fromRoot.State>,
    private router: ActivatedRoute,
    private mapperService: MapperService,
    private cdr: ChangeDetectorRef,
    private _carritoService : CarritoComprasService,
    private _notification : NotificationService,
    private _userService: UserService,


  ) {
    this.isAuthorized$ = this._userService.isAuthorized$;
  }



  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromList.getLoading));
    this.obtenerCarritoActual();

    // this.store.pipe(select(fromDictionaries.getDictionaries))
    //   .subscribe((data: any) => {
    //   if (data) {
    //     this.categorias = data.categoria.controlItems as ControlItem[];
    //     this.marcas = data.marca.controlItems as ControlItem[];
    //   }
    // });

    this.store.pipe(select(fromForm.getFormState))
    .subscribe(productForm => {
        if(productForm.nombre){
          this.producto = productForm;
           this.cdr.detectChanges();
        }
    });

    this.store.pipe(select(fromList.getProduct))
    .subscribe(product => {
      if(product){
        const form  = this.mapperService.productToForm(product);
        this.store.dispatch(new fromForm.Set(form));
      }
    })

    this.router.params.subscribe( (param: Params) => {
      this.id = param.id;
      const id = param.id;
      this.store.dispatch(new fromList.Read(id));
    })

    this.user$ = this.store.pipe(select(fromUser.getUser)) as Observable<fromUser.UserResponse>;


    // this.loading$ = this.store.pipe(select(fromList.getLoading));
    this.pagination$ = this.store.pipe(select(fromList2.getShop)) as Observable<Pagination>;
    this.params = this.params.set('pageIndex', 1);
    this.params = this.params.set('pageSize', 6);
    this.params = this.params.set('sort', 'precioDesc');

    this.store.dispatch(new fromList2.Read(this.params, this.params.toString()));

  }

  obtenerCarritoActual(): void {
    this._carritoService.getCarritoCompra2().subscribe(
      carrito => {
        this.carritoActual = carrito;
        console.log('Carrito actual:', this.carritoActual);
      },
      error => {
        console.error('Error al obtener carrito:', error);
      }
    );
  }

  onClickAgregarCarrito(): void {
    const nuevoItem = {
      Id: this.id,
      producto: 'Camisa verano',
      precio: 10.5,
      cantidad: this.cantidad,
      imagen: '',
      marca: 'nike',
      categoria: 'camisa'
    };

    // Agregar el nuevo item al carrito actual
    const nuevosItems = [...this.carritoActual, nuevoItem];
    // Agregar nuevos items al carrito actual
    this._carritoService.agregarAlCarrito(nuevosItems).subscribe(
      response => {
        this._notification.success('Producto agregado al carrito.');

        // Limpiar el item temporal
      this.cantidad = 1; // Reiniciar la cantidad a su valor inicial

      // Actualizar el carrito actual
      this.carritoActual = nuevosItems;

      },
      error => {
        this._notification.error('Inicia sesión para agregar un');
      }
    );
  }

}
