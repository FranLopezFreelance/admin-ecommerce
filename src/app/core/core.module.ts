import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { CUSTOM_ERROR_MESSAGES, NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CUSTOM_ERRORS } from '../shared/helpers/custom-errors';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { CustomCurrencyMaskConfig } from '../shared/helpers/currency-options';
import { SectionHeaderComponent } from './components/section-header/section-header.component';

@NgModule({
  declarations: [NavbarComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CurrencyMaskModule,
    BlockUIModule.forRoot(),
    ToastrModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
  ],
  exports: [
    NavbarComponent,
    SectionHeaderComponent,
    BlockUIModule,
    ToastrModule,
    CurrencyMaskModule
  ],
  providers: [{
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true
    },
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig
    }
  ],
})
export class CoreModule { }
