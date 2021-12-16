import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { HttpStatusService, HttpStatusType, IHttpStatus } from './http-status.service';

@Injectable()
export class HttpStatusImplService extends HttpStatusService {

  private requestStatus: BehaviorSubject<Map<string, IHttpStatus>>;
  private baseValue = {
    loading: false,
    success: false,
    empty: false,
    error: false,
  };

  constructor() {
    super();
    this.requestStatus = new BehaviorSubject<Map<string, IHttpStatus>>(new Map<string, IHttpStatus>());
  }

  change(key: string, type: HttpStatusType, message?: string, status?: number): void {
    const newStatus = {
      ...this.baseValue,
      ...{ [type]: true },
      ...(type === 'error' ? { status, message} : {})
    };

    const newStatusValues = this.requestStatus.getValue();
    newStatusValues.set(key, newStatus);
    this.requestStatus.next(newStatusValues);
  }

  listen(key: string): Observable<IHttpStatus> {
    return this.getListener(key).pipe(
      finalize(() => this.removeItem(key))
    );
  }

  setInternalError(key: string, message: string) {
    this.change(key, 'error', message);
  }

  private getListener(key: string): Observable<IHttpStatus> {
    const current = this.requestStatus.getValue();

    if (!current.has(key)) {
      current.set(key, this.baseValue);
      this.requestStatus.next(current);
    }

    return this.requestStatus.pipe(
      map(e => e.get(key))
    );
  }

  private removeItem(key: string): void {
    const tmpValue = this.requestStatus.getValue();
    tmpValue.delete(key);
    this.requestStatus.next(tmpValue);
  }

}
