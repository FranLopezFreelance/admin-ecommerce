import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventaryComponent } from './inventary/inventary.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InventaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaryRoutingModule { }
