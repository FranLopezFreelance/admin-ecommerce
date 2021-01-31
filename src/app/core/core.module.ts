import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BlockUIModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule
  ],
  exports: [NavbarComponent, BlockUIModule, ToastrModule]
})
export class CoreModule { }
