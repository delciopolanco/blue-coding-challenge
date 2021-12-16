import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators/';
import { environment } from 'src/environments/environment';
import { HttpStatusService } from '../http-status/http-status.service';
import { IHttpParams, HttpService } from './http.service';

@Injectable()
export class HttpServiceImplement implements HttpService {
  private baseUrl: string = environment.api;

  constructor(
    private httpClient: HttpClient,
    private httpsStatusSvc: HttpStatusService
  ) {}

  get<T>(params: IHttpParams): Promise<T> {
    const httpParams = this.buildHeaders(params);
    return this.dispatcher(
      this.httpClient.get<T>(`${this.baseUrl}/${params.path}&serviceId=${params.serviceId}`, {
        headers: httpParams,
      }),
      params.serviceId
    );
  }
  post<T>(params: IHttpParams): Promise<T> {
    const httpParams = this.buildHeaders(params);
    return this.dispatcher(
      this.httpClient.post<T>(`${this.baseUrl}/${params.path}&serviceId=${params.serviceId}`, params.body, {
        headers: httpParams,
      }),
      params.serviceId
    );
  }
  put<T>(params: IHttpParams): Promise<T> {
    const httpParams = this.buildHeaders(params);
    return this.dispatcher(
      this.httpClient.put<T>(`${this.baseUrl}/${params.path}`, params.body, {
        headers: httpParams,
      }),
      params.serviceId
    );
  }
  delete(params: IHttpParams): Promise<unknown> {
    const httpParams = this.buildHeaders(params);
    return this.dispatcher(
      this.httpClient.delete(`${this.baseUrl}/${params.path}`, {
        headers: httpParams,
      }),
      params.serviceId
    );
  }

  private buildHeaders(params: IHttpParams) {
    const httpHeaders = {
      ...params.headers,
    };

    return new HttpHeaders(httpHeaders);
  }

  private async dispatcher<T>(
    obs: Observable<any>,
    serviceId?: any
  ): Promise<T | any> {
    if (serviceId) {
      this.httpsStatusSvc.change(serviceId, 'loading');
    }

    return obs
      .pipe(
        timeout(60000),
        map((response: unknown) => {
          if (!response) {
            return Promise.resolve(null);
          }

          return Promise.resolve(response);
        }),
        catchError((error: HttpErrorResponse) => Promise.reject(error))
      )
      .toPromise();
  }
}
