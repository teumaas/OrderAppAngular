import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Category } from '../interfaces/Category.interface';
import { AuthService } from '../services/auth.service';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private APIUrl: string = environment.url;
  private httpOptions = {
    headers: new HttpHeaders({
      'content-type':  'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
  };

  constructor(private http: HttpClient, private auth: AuthService) { }

  private request(method: 'post'|'get'|'put'|'delete', type: 'categories'|'category', category?: Category): Observable<any> {
    let base;

    switch (type) {
      case 'categories':
        switch (method) {
          case 'get':
            base = this.http.get(`${this.APIUrl}/api/${type}`, this.httpOptions);
          break;

          default:
            console.log('Unkown method!');
          break;
        }
      break;

      case 'category':
        switch (method) {
            case 'post':
              base = this.http.post(`${this.APIUrl}/api/${type}`, category, this.httpOptions);
            break;

            case 'put':
              base = this.http.put(`${this.APIUrl}/api/${type}`, category, this.httpOptions);
            break;

            case 'get':
            base = this.http.request('get', `${this.APIUrl}/api/${type}/${category._id}`, {
                headers: { Authorization: `Bearer ${this.auth.getToken()}` },
                body: JSON.stringify(category)
            });
            break;

            case 'delete':
              base = this.http.request('delete', `${this.APIUrl}/api/${type}/${category._id}`, {
                headers: { Authorization: `Bearer ${this.auth.getToken()}` },
                body: JSON.stringify(category)
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
      map((data: Category) => {
        return data;
      })
    );
    return request;
  }

  public getCategories(): Observable<any> {
    return this.request('get', 'categories');
  }

  public getCategory(_id: string): Observable<any> {
    const category: Category = {
      _id: _id
    };
    return this.request('get', 'category', category);
  }

  public deleteCategory(category: Category): Observable<any> {
    return this.request('delete', 'category', category);
  }

  public putCategory(category: Category): Observable<any> {
    return this.request('put', 'category', category);
  }

  public postCategory(category: Category): Observable<any> {
    return this.request('post', 'category', category);
  }
}
