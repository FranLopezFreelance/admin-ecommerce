import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Section } from 'src/app/models/Section';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  constructor(
    private http: HttpClient
  ) { }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(`${environment.baseUrl}/sections`).pipe(
      map((product: Section[]) => {
        return product.map(( p: Section) => new Section(p));
      })
    );
  }
}
