import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

const MODULES = [
  MatDialogModule, MatButtonModule, DragDropModule
];

@NgModule({
  declarations: [],
  imports: [ MODULES ],
  exports: [ MODULES ]
})
export class MaterialModule { }
