import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path:"",
    children:[
      {
        path:'administrador',
        loadChildren: () => import ('./pages/admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/shop'
      },

    ],
    data: {showHeader: false}
  },

  {
    path:"",
    children:[
      {
        path:'producto',
        loadChildren: () => import ('./pages/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'contacto',
        loadChildren: () => import('./pages/demo/demo.module').then( m => m.DemoModule)
      },
      {
        path:'auth',
        loadChildren: () => import ('./pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path:'busqueda-avanzada',
        loadChildren: () => import ('./pages/shop/shop.module').then(m => m.ShopModule)
      },
      {
        path:'shop',
        loadChildren: () => import ('./pages/shop-simple/shop-simple.module').then(m => m.ShopSimpleModule)
      },
      {
        path: 'static',
        loadChildren: () => import('./pages/static/static.module').then( m => m.StaticModule)
      },
      {
        path: 'carrito-compras',
        loadChildren: () => import('./pages/carrito-compras/carrito-compras.module').then( m => m.CarritoComprasModule)
      },

      {
        path: 'mis-ordenes',
        loadChildren: () => import('./pages/ordenes/ordenes/ordenes.module').then( m => m.OrdenesModule)
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/shop'
      },

    ],
    data: {showHeader: true}
  },

  {
    path: '**',
    pathMatch: "full",
    redirectTo : "static/404"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
