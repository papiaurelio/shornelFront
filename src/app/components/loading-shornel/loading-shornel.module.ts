import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingShornelComponent } from './loading-shornel.component';



@NgModule({
  declarations: [LoadingShornelComponent],
  imports: [
    CommonModule
  ],
  exports:[
    LoadingShornelComponent
  ]
})
export class LoadingShornelModule { }
