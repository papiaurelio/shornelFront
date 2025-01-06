import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@app/guards/admin/admin.guard';

const routes: Routes = [
  {
    path: 'nuevo',
    loadChildren: () => import('./pages/new-product/new-product.module').then(m => m.NewProductModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'actualizar/:id',
    loadChildren: () => import('./pages/update-product/update-product.module').then(m => m.UpdateProductModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'info/:id',
    loadChildren: () => import('./pages/view-product/view-product.module').then(m => m.ViewProductModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
