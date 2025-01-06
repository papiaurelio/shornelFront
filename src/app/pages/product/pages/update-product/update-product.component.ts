import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromDictionaries from '@app/store/dictionaries';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';
import * as fromForm from '../../store/form';
import { ControlItem } from '@app/models/frontend';
import { ControlEntities } from '@app/shared/utils/form';
import { Store, select } from '@ngrx/store';
import { regex, regexErrors, markFormGroupTouched } from '@app/shared/utils';
import { ActivatedRoute, Params } from '@angular/router';
import { MapperService } from './services/mapper/mapper.service';


export interface ProductForm{
  id?: number | null;
  nombre: string | null;
  descripcion: string | null;
  stock: number | null;
  precio: number | null;
  categoria: number | string | null;
  marca: number | string | null;
  photoURL: string | null;
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProductComponent implements OnInit {

  loading$ !: Observable<boolean | null>;
  form !: FormGroup;
  dictionaries !: Observable<fromDictionaries.Dictionaries>;
  categories !: ControlItem[];
  marca !: ControlItem[];
  controls !: ControlEntities;
  regexErrors = regexErrors;


  constructor(
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private mapperService: MapperService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromList.getLoading));

    this.store.pipe(select(fromDictionaries.getDictionaries))
    .subscribe((data: any) => {
      if (data) {
        this.categories = data.categoria.controlItems as ControlItem[];
        this.marca = data.marca.controlItems as ControlItem[];

        this.controls = {
          categoria: {
            items: this.categories,
            changed: () => { }
          },
          marca: {
            items: this.marca,
            changed: () => { }
          },
        }
      }
    });

    this.form = this.fb.group({
      nombre: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],

      descripcion: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],


      stock: [null, {
        updateOn: 'change', validators: [
          Validators.required,
          Validators.pattern(regex.number)
        ]
      }],


      precio: [null, {
        updateOn: 'change', validators: [
          Validators.required,
          Validators.pattern(regex.number)
        ]
      }],

      photoURL: [null],
      categoria: null,
      marca: null
    })

    //para inicializar los controls...

    this.controls = {
      categoria: {
        items: this.categories,
        changed: () => { }
      },
      marca: {
        items: this.marca,
        changed: () => { }
      },
    }

    this.store.pipe(select(fromForm.getFormState))
    .subscribe(productForm => {
        if(productForm.nombre){
           const value = productForm;
           this.form.patchValue(value);
           this.form.updateValueAndValidity();
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
      const id = param.id;
      this.store.dispatch(new fromList.Read(id));
    })

  }

  onSubmit() : void {

    if(this.form.valid){
      this.loading$ = this.store.pipe(select(fromList.getLoading));

      this.router.params.subscribe( (param: Params) => {

        const value = this.form.value;

        const product : fromList.ProductUpdateRequest = {
          id: param.id,
          nombre : value.nombre,
          descripcion: value.descripcion,
          categoriaId : value.categoria,
          marcaId: value.marca,
          precio: value.precio,
          stock: value.stock,
          imagen: value.photoURL
        }

        const id = param.id;
        this.store.dispatch(new fromList.Update(id, product));

      })


    }else{
      markFormGroupTouched(this.form);
    }
  }

  onFilesChanged(url: any) : void {
    if(url){
      this.form.controls.photoURL.setValue(url);
    }
  }
}
