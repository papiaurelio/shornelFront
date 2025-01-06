import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopSimpleRoutingModule } from './shop-simple-routing.module';
import { ShopSimpleComponent } from './shop-simple.component';
import { ShopModule } from '../shop/shop.module';
import { FooterModule } from '@app/components/footer/footer.module';
import { SpinnerModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingShornelModule } from '@app/components/loading-shornel/loading-shornel.module';


@NgModule({
  declarations: [
    ShopSimpleComponent
  ],
  imports: [
    CommonModule,
    ShopSimpleRoutingModule,
    ShopModule,
    FooterModule,
    SpinnerModule,
    ReactiveFormsModule,
    LoadingShornelModule
  ]
})
export class ShopSimpleModule { }
