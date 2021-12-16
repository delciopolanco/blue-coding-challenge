import { Inject, Injectable } from '@angular/core';
import { HttpStatusService } from '../http-status/http-status.service';
import { HttpService } from '../http/http.service';
import { FacadeCoreService } from './facade.service';

@Injectable()
export class FacadeCoreImplService extends FacadeCoreService {

  constructor(
    @Inject(HttpService) private httpSvc: HttpService,
    @Inject(HttpStatusService) private httpStatusSvc: HttpStatusService) {
    super();
  }

  get http(): HttpService {
    return this.httpSvc;
  }

  get httpStatus(): HttpStatusService {
    return this.httpStatusSvc;
  }
}
