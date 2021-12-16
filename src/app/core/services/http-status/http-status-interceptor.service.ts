import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FacadeCoreService } from '../facade/facade.service';

@Injectable()
export class HttpStatusInterceptor implements HttpInterceptor {

  constructor(
    private facade: FacadeCoreService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = request.url.split('&');
    const serviceName = url ? url.pop() : '';
    const serviceId = serviceName.split('=')[1];

    if  (!serviceId) {
      return next.handle(request);
    }

    return next.handle(request)
      .pipe(
        map((response) => {
          if (response instanceof HttpResponse) {
            const { status } = response;
            const result = status === 204 ? 'empty' : 'success';
            this.facade.httpStatus.change(serviceId, result, null, status);
            return response;
          }
        }),
        catchError(err => {
          const status = err?.headers?.error;
          this.facade.httpStatus.change(serviceId, 'error', 'There was an error', status);
          return throwError(err);
        })
      );
  }
}
