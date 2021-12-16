import { HttpStatusService } from '../http-status/http-status.service';
import { HttpService } from '../http/http.service';

export abstract class FacadeCoreService {
  abstract get http(): HttpService;
  abstract get httpStatus(): HttpStatusService;
}
