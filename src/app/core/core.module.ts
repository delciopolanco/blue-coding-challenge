import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeCoreService } from './services/facade/facade.service';
import { FacadeCoreImplService } from './services/facade/facade-implement.service';
import { HttpService } from './services/http/http.service';
import { HttpServiceImplement } from './services/http/http-implement.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpStatusService } from './services/http-status/http-status.service';
import { HttpStatusImplService } from './services/http-status/http-status-implement.service';
import { HttpStatusInterceptor } from './services/http-status/http-status-interceptor.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: FacadeCoreService,
      useClass: FacadeCoreImplService,
    },
    {
      provide: HttpService,
      useClass: HttpServiceImplement,
    },
    {
      provide: HttpStatusService,
      useClass: HttpStatusImplService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpStatusInterceptor,
      multi: true
    },
  ],
})
export class CoreModule {}
