import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionManagementRoutingModule } from './section-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SectionsListComponent } from './sections-list/sections-list.component';


@NgModule({
  declarations: [SectionsListComponent],
  imports: [
    CommonModule,
    SectionManagementRoutingModule,
    SharedModule
  ]
})
export class SectionManagementModule { }
