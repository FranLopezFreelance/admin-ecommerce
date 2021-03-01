import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountPipe } from './pipes/amount.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

@NgModule({
  declarations: [AmountPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgBootstrapFormValidationModule,
  ],
  exports: [
    AmountPipe,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgBootstrapFormValidationModule
  ]
})
export class SharedModule { }
