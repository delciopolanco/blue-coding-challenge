import { Observable } from 'rxjs';

export type HttpStatusType = 'loading' | 'success' | 'empty' | 'error';

export interface IHttpStatus {
  loading: boolean;
  success: boolean;
  empty: boolean;
  error: boolean;
  status?: number;
  message?: string;
}

export abstract class HttpStatusService {
  abstract listen(key: string): Observable<IHttpStatus>;
  abstract change(key: string, type: HttpStatusType, message?: string, status?: number): void;
  abstract setInternalError(key: string, message?: string, status?: number): void;
}
