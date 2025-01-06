import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProductRoutingModule } from './update-product-routing.module';
import { UpdateProductComponent } from './update-product.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, InputModule, SelectModule } from '@app/shared/controls';
import { ButtonModule } from '@app/shared/buttons';
import { SpinnerModule } from '@app/shared/indicators';
import { PopupsModule, UserPhotoModule } from '@app/shared';
import { MapperService } from './services/mapper/mapper.service';
import { LoadingShornelModule } from '@app/components/loading-shornel/loading-shornel.module';


@NgModule({
  declarations: [
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    UpdateProductRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    ButtonModule,
    SpinnerModule,
    PopupsModule,
    UserPhotoModule,
    SelectModule,
    LoadingShornelModule
  ],
  providers:[
    MapperService
  ]
})
export class UpdateProductModule { }
