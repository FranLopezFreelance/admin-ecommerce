import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const MODULES = [
  MatDialogModule, MatButtonModule
];

@NgModule({
  declarations: [],
  imports: [ MODULES ],
  exports: [ MODULES ]
})
export class MaterialModule { }
