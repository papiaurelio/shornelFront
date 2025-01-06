import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoComprasRoutingModule } from './carrito-compras-routing.module';
import { CarritoComprasComponent } from './carrito-compras.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from '@app/components/footer/footer.module';
import { LoadingShornelModule } from '@app/components/loading-shornel/loading-shornel.module';


@NgModule({
  declarations: [
    CarritoComprasComponent
  ],
  imports: [
    CommonModule,
    CarritoComprasRoutingModule,
    HttpClientModule,
    FooterModule,
    LoadingShornelModule
  ]
})
export class CarritoComprasModule { }
