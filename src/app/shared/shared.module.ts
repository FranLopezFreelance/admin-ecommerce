import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountPipe } from './pipes/amount.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AmountPipe],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [AmountPipe, FormsModule]
})
export class SharedModule { }
