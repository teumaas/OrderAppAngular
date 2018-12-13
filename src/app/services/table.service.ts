import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Table } from '../interfaces/Table.interface';
import { AuthService } from '../services/auth.service';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private APIUrl: string = environment.url;
  private httpOptions = {
    headers: new HttpHeaders({
      'content-type':  'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
  };

  constructor(private http: HttpClient, private auth: AuthService) { }

  private request(method: 'post'|'get'|'put'|'delete', type: 'tables'|'table', table?: Table): Observable<any> {
    let base;

    switch (type) {
      case 'tables':
        switch (method) {
          case 'get':
            base = this.http.get(`${this.APIUrl}/api/${type}`, this.httpOptions);
          break;

          default:
            console.log('Unkown method!');
          break;
        }
      break;

      case 'table':
        switch (method) {
            case 'post':
              base = this.http.post(`${this.APIUrl}/api/${type}`, table, this.httpOptions);
            break;

            case 'put':
              base = this.http.put(`${this.APIUrl}/api/${type}`, table, this.httpOptions);
            break;

            case 'get':
            base = this.http.request('get', `${this.APIUrl}/api/${type}/${table._id}`, {
                headers: { Authorization: `Bearer ${this.auth.getToken()}` },
                body: JSON.stringify(table)
            });
            break;

            case 'delete':
              base = this.http.request('delete', `${this.APIUrl}/api/${type}/${table._id}`, {
                headers: { Authorization: `Bearer ${this.auth.getToken()}` },
                body: JSON.stringify(table)
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
      map((data: Table) => {
        return data;
      })
    );
    return request;
  }

  public getTables(): Observable<any> {
    return this.request('get', 'tables');
  }

  public getTable(_id: string): Observable<any> {
    const table: Table = {
      _id: _id
    };
    return this.request('get', 'table', table);
  }

  public deleteTable(table: Table): Observable<any> {
    return this.request('delete', 'table', table);
  }

  public putTable(table: Table): Observable<any> {
    return this.request('put', 'table', table);
  }

  public postTable(table: Table): Observable<any> {
    return this.request('post', 'table', table);
  }
}
