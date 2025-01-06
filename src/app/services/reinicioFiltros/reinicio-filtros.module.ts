import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReinicioFiltrosService } from './reinicio-filtros.service';
import { ModuleWithProviders } from '@angular/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ReinicioFiltrosModule {
  static forRoot(): ModuleWithProviders<ReinicioFiltrosModule>{
    return  {
      ngModule: ReinicioFiltrosModule,
      providers: [
        ReinicioFiltrosService
      ]
    };
  }
 }
