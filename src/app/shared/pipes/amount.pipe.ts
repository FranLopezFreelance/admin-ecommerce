import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

  transform(amount: number | any): string {
    if (amount) {
      return '$ ' + new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 }).format(amount);
    } else {
      return '$ 0,00';
    }
  }

}
