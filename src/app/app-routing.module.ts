import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'productos',
    loadChildren: () => import('./modules/product-management/product-management.module').then((m) => m.ProductManagementModule),
  },
  {
    path: 'inventario',
    loadChildren: () => import('./modules/inventary/inventary.module').then((m) => m.InventaryModule),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
