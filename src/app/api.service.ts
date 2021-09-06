import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse}from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiRoot:string;
  constructor(
    private _HttpClient:HttpClient,
  ) { 
    this.apiRoot='http://localhost:3000/api/v1';
  }
  postRequest<T>(url: string, body: any, options?: IRequestOptions): Promise<T> {
    const { apiRoot, headers } = this.getApiRootAndHeaders(options);
    return this._HttpClient
      .post(`${apiRoot}/${url}`, body, { headers })
      .toPromise()
      .then(res => res as T)
      .catch(err => this.handleCatchError<T>(err));
  }

  getRequest<T>(url: string, options?: IRequestOptions): Promise<T> {
    const { apiRoot, headers } = this.getApiRootAndHeaders(options);
    return this._HttpClient
      .get(`${apiRoot}/${url}`, { headers })
      .toPromise()
      .then(res => res as T)
      .catch(err => this.handleCatchError<T>(err));
  }

  putRequest<T>(url: string, body: any, options?: IRequestOptions): Promise<T> {
    const { apiRoot, headers } = this.getApiRootAndHeaders(options);
    return this._HttpClient
      .put(`${apiRoot}/${url}`, body, { headers })
      .toPromise()
      .then(res => res as T)
      .catch(err => this.handleCatchError<T>(err));
  }

  deleteRequest<T>(url: string, options?: IRequestOptions): Promise<T> {
    const { apiRoot, headers } = this.getApiRootAndHeaders(options);
    return this._HttpClient
      .delete(`${apiRoot}/${url}`, { headers })
      .toPromise()
      .then(res => res as T)
      .catch(err => this.handleCatchError<T>(err));
  }

  // handle errors
  private handleCatchError<T>(err: HttpErrorResponse) {
      if ((err.status === 404) || (err.status === 0 && err.url === null)) {
        // tslint:disable-next-line: no-console
        console.log('HttpError', 'Server not available');
      }
      if ((err.status === 401)) {
        // tslint:disable-next-line: no-console
        console.log('HttpError', 'Unauthorized');
      }
      if (err.status !== 0 && err.status !== 200 && err.status !== 401 && err.status !== 404) {
        // tslint:disable-next-line: no-console
        console.log('HttpError', 'Server Error');
      }
    
    return {} as T;
  }

  private getApiRootAndHeaders(options?: IRequestOptions): IRequestOptions {
    return {

      apiRoot: (options && options.apiRoot) ? options.apiRoot : this.apiRoot,
      headers: (options && options.headers) ? options.headers : new HttpHeaders()
    };
  }
}


interface IRequestOptions {
  headers?: HttpHeaders;
  apiRoot?: string;
}

