import { NgModule } from '@angular/core';
import { PrivatePageRoutingModule } from './private-routing.module';
import { PrivatePage } from './private.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { GiphyService } from './dashboard/services/giphy/giphy.service';

@NgModule({
  imports: [
    SharedModule,
    PrivatePageRoutingModule
  ],
  declarations: [PrivatePage],
  providers: [GiphyService]
})
export class PrivatePageModule {}
