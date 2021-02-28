import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionsListComponent } from './sections-list/sections-list.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: SectionsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionManagementRoutingModule { }
