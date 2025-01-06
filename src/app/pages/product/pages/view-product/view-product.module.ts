import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProductRoutingModule } from './view-product-routing.module';
import { ViewProductComponent } from './view-product.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, InputModule, SelectModule } from '@app/shared/controls';
import { ButtonModule } from '@app/shared/buttons';
import { SpinnerModule } from '@app/shared/indicators';
import { PopupsModule } from '@app/shared';
import { LoadingShornelModule } from '@app/components/loading-shornel/loading-shornel.module';
import { MapperService } from '../update-product/services/mapper/mapper.service';
import { ShopModule } from '@app/pages/shop/shop.module';



@NgModule({
  declarations: [
    ViewProductComponent
  ],
  imports: [
    CommonModule,
    ViewProductRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    ButtonModule,
    SpinnerModule,
    PopupsModule,
    SelectModule,
    LoadingShornelModule,
    FormsModule,
    ShopModule
  ],
  providers:[
    MapperService
  ]
})
export class ViewProductModule { }
