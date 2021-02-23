import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  deleteProduct: EventEmitter<number | null> = new EventEmitter();

}
