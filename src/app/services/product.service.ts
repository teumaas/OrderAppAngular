import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Product } from '../interfaces/Product.interface';
import { AuthService } from '../services/auth.service';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private APIUrl: string = environment.url;
  private httpOptions = {
    headers: new HttpHeaders({
      'content-type':  'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
  };

  constructor(private http: HttpClient, private auth: AuthService) { }

  private request(method: 'post'|'get'|'put'|'delete', type: 'products'|'product', product?: Product): Observable<any> {
    let base;

    switch (type) {
      case 'products':
        switch (method) {
          case 'get':
            base = this.http.get(`${this.APIUrl}/api/${type}`, this.httpOptions);
          break;

          default:
            console.log('Unkown method!');
          break;
        }
      break;

      case 'product':
        switch (method) {
            case 'post':
              base = this.http.post(`${this.APIUrl}/api/${type}`, product, this.httpOptions);
            break;

            case 'put':
              base = this.http.put(`${this.APIUrl}/api/${type}`, product, this.httpOptions);
            break;

            case 'get':
            base = this.http.request('get', `${this.APIUrl}/api/${type}/${product._id}`, {
                headers: { Authorization: `Bearer ${this.auth.getToken()}` },
                body: product
            });
            break;

            case 'delete':
              base = this.http.request('delete', `${this.APIUrl}/api/${type}/${product._id}`, {
                headers: { Authorization: `Bearer ${this.auth.getToken()}` },
                body: product
              });
            break;

            default:
              console.log('Unkown method!');
            break;
        }
      break;

      default:
        console.log('Unkown type!');
      break;
    }

    const request = base.pipe(
      map((data: Product) => {
        return data;
      })
    );
    return request;
  }

  public getProducts(): Observable<any> {
    return this.request('get', 'products');
  }

  public getProduct(_id: string): Observable<any> {
    const product: Product = {
      _id: _id,
      name: '',
      brand: '',
      price: 0,
      description: '',
    };
    return this.request('get', 'product', product);
  }

  public deleteProduct(product: Product): Observable<any> {
    return this.request('delete', 'product', product);
  }

  public putProduct(product: Product): Observable<any> {
    return this.request('put', 'product', product);
  }

  public postProduct(product: Product): Observable<any> {
    return this.request('post', 'product', product);
  }
}
