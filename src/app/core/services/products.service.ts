import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.class';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
    return this.http.put<Product>(`${environment.baseUrl}/products/${id}`, data).pipe(
      tap(res => console.log(res))
    );
  }

  createProduct(data: any): Observable<Product> {
    return this.http.post<Product>(`${environment.baseUrl}/products`, data).pipe(
      tap(res => console.log(res))
    );
  }
}
