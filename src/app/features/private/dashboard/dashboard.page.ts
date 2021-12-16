import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ServicesId } from 'src/app/core/constants/services.contant';
import { FacadeCoreService } from 'src/app/core/services/facade/facade.service';
import { IHttpStatus } from 'src/app/core/services/http-status/http-status.service';
import { GyphyResult } from 'src/app/shared/models/gyphy-result.model';
import { Gyphy } from 'src/app/shared/models/gyphy.model';
import intoChunck from 'src/app/shared/Utils/chuncks.utils';
import { GiphyService } from './services/giphy/giphy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public imageStatus$: Observable<IHttpStatus>;
  public images: Array<Array<Gyphy>> = [];
  public result: GyphyResult;

  constructor(
    private giphyService: GiphyService,
    private facade: FacadeCoreService ) {}

  ngOnInit() {
    this.imageStatus$ = this.facade.httpStatus.listen(ServicesId.gifs);
    this.getImages();
  }

  async searchImages(search: string) {
    try {
      this.images = [];
      this.result = await this.giphyService.searchGifs(search);
      this.images =  intoChunck(this.result.data, 10);
    } catch (error) {
      // TODO
    }
  }

  async getImages(page?: number) {
    try {
      this.result = await this.giphyService.getGifs(page);
      const newImages = intoChunck(this.result.data, 10);
      this.images  = [...this.images, ...newImages];
    } catch (_) {
      // TODO
    }
  }

  loadData(event: any) {
    setTimeout(() => {
      console.log('Done');

      event.target.complete();

      if (this.result.pagination.total_count !== this.result.data.length) {
        event.target.disabled = true;
        this.getImages(++this.result.pagination.offset);
      }
    }, 500);
  }
}
