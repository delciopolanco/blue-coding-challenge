
import { HttpHeaders } from '@angular/common/http';

export class IHttpParams {
  constructor(
    public path: string,
    public serviceId: string = null,
    public body?: any,
    public headers?: HttpHeaders,
  ) {}
}

export abstract class HttpService {
  abstract get<T>(params: IHttpParams): Promise<T>;
  abstract post<T>(params: IHttpParams): Promise<T>;
  abstract put<T>(params: IHttpParams): Promise<T>;
  abstract delete(params: IHttpParams): Promise<unknown>;
}
