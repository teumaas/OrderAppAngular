import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Menu } from '../interfaces/Menu.interface';
import { AuthService } from '../services/auth.service';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private APIUrl: string = environment.url;
  private httpOptions = {
    headers: new HttpHeaders({
      'content-type':  'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
  };

  constructor(private http: HttpClient, private auth: AuthService) { }

  private request(method: 'post'|'get'|'put'|'delete', type: 'menus'|'menu', menu?: Menu): Observable<any> {
    let base;

    switch (type) {
      case 'menus':
        switch (method) {
          case 'get':
            base = this.http.get(`${this.APIUrl}/api/${type}`, this.httpOptions);
          break;

          default:
            console.log('Unkown method!');
          break;
        }
      break;

      case 'menu':
        switch (method) {
            case 'post':
              base = this.http.post(`${this.APIUrl}/api/${type}`, menu, this.httpOptions);
            break;

            case 'put':
              base = this.http.put(`${this.APIUrl}/api/${type}`, menu, this.httpOptions);
            break;

            case 'get':
            base = this.http.request('get', `${this.APIUrl}/api/${type}/${menu._id}`, {
                headers: { Authorization: `Bearer ${this.auth.getToken()}` },
                body: JSON.stringify(menu)
            });
            break;

            case 'delete':
              base = this.http.request('delete', `${this.APIUrl}/api/${type}/${menu._id}`, {
                headers: { Authorization: `Bearer ${this.auth.getToken()}` },
                body: JSON.stringify(menu)
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
      map((data: Menu) => {
        return data;
      })
    );
    return request;
  }

  public getMenus(): Observable<any> {
    return this.request('get', 'menus');
  }

  public getMenu(_id: string): Observable<any> {
    const menu: Menu = {
      _id: _id
    };
    return this.request('get', 'menu', menu);
  }

  public deleteMenu(menu: Menu): Observable<any> {
    return this.request('delete', 'menu', menu);
  }

  public putMenu(menu: Menu): Observable<any> {
    return this.request('put', 'menu', menu);
  }

  public postMenu(menu: Menu): Observable<any> {
    return this.request('post', 'menu', menu);
  }
}
