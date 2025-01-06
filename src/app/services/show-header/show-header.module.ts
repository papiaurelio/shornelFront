import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHeaderService } from './HeaderService.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ShowHeaderModule {

  static forRoot(): ModuleWithProviders<ShowHeaderModule>{
    return  {
      ngModule: ShowHeaderModule,
      providers: [
        ShowHeaderService
      ]
    };
  }
}
