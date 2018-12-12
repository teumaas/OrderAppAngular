import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Order } from '../interfaces/Order.interface';
import { AuthService } from '../services/auth.service';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private APIUrl: string = environment.url;
  private httpOptions = {
    headers: new HttpHeaders({
      'content-type':  'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
  };

  constructor(private http: HttpClient, private auth: AuthService) { }

  private request(method: 'post'|'get'|'put'|'delete', type: 'orders'|'order', order?: Order): Observable<any> {
    let base;

    switch (type) {
      case 'orders':
        switch (method) {
          case 'get':
            base = this.http.get(`${this.APIUrl}/api/${type}`, this.httpOptions);
          break;

          default:
            console.log('Unkown method!');
          break;
        }
      break;

      case 'order':
        switch (method) {
            case 'post':
              base = this.http.post(`${this.APIUrl}/api/${type}`, order, this.httpOptions);
            break;

            case 'put':
              base = this.http.put(`${this.APIUrl}/api/${type}`, order, this.httpOptions);
            break;

            case 'get':
            base = this.http.request('get', `${this.APIUrl}/api/${type}/${order._id}`, {
                headers: { Authorization: `Bearer ${this.auth.getToken()}` },
                body: JSON.stringify(order)
            });
            break;

            case 'delete':
              base = this.http.request('delete', `${this.APIUrl}/api/${type}/${order._id}`, {
                headers: { Authorization: `Bearer ${this.auth.getToken()}` },
                body: JSON.stringify(order)
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
      map((data: Order) => {
        return data;
      })
    );
    return request;
  }

  public getOrders(): Observable<any> {
    return this.request('get', 'orders');
  }

  public getOrder(_id: string): Observable<any> {
    const order: Order = {
      _id: _id
    };
    return this.request('get', 'order', order);
  }

  public deleteOrder(order: Order): Observable<any> {
    return this.request('delete', 'order', order);
  }

  public putOrder(order: Order): Observable<any> {
    return this.request('put', 'order', order);
  }

  public postOrder(order: Order): Observable<any> {
    return this.request('post', 'order', order);
  }
}
