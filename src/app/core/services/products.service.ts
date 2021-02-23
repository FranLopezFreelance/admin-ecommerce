import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.class';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Price } from 'src/app/models/Presentation.class';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/products`).pipe(
      map((product: Product[]) => {
        return product.map(( p: Product) => new Product(p));
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.baseUrl}/products/${id}`).pipe(
      map((product: Product) => new Product(product))
    );
  }

  updateProduct(id: string | undefined, data: any): Observable<Product> {
    return this.http.put<Product>(`${environment.baseUrl}/products/${id}`, data);
  }

  createProduct(data: any): Observable<Product> {
    return this.http.post<Product>(`${environment.baseUrl}/products`, data);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.baseUrl}/products/${id}`);
  }

  createPrice(data: any): Observable<Price> {
    return this.http.post<Price>(`${environment.baseUrl}/prices`, data);
  }

  deletePrice(id: number): Observable<Price> {
    return this.http.delete<Price>(`${environment.baseUrl}/prices/${id}`);
  }

  getPrices(id: number): Observable<Price[]> {
    return this.http.get<Price[]>(`${environment.baseUrl}/presentations/prices/${id}`);
  }
}
