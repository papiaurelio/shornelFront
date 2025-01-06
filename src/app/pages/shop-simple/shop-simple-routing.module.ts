import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopSimpleComponent } from './shop-simple.component';

const routes: Routes = [
  {
    path: '',
    component: ShopSimpleComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopSimpleRoutingModule { }
