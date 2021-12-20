import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppState } from '@capacitor/app';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Events } from 'src/app/core/constants/event.contant';
import { ServicesId } from 'src/app/core/constants/services.contant';
import { FacadeCoreService } from 'src/app/core/services/facade/facade.service';
import { IHttpStatus } from 'src/app/core/services/http-status/http-status.service';
import { GyphyResult } from 'src/app/shared/models/gyphy-result.model';
import { Gyphy } from 'src/app/shared/models/gyphy.model';
import { EventService } from 'src/app/shared/services/event.service';
import { GiphyService } from './services/giphy/giphy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public imageStatus$: Observable<IHttpStatus>;
  public images: Array<Gyphy> = [];
  public result: GyphyResult;
  public total = 0;
  public autocompletes: Array<string> = [];

  private suscription: Subscription;

  constructor(
    private giphyService: GiphyService,
    private eventService: EventService,
    private facade: FacadeCoreService
  ) {}

  ngOnInit() {
    this.imageStatus$ = this.facade.httpStatus.listen(ServicesId.gifs);

    this.suscription = this.eventService.subscribe(
      Events.updateImage,
      this.updateImageState
    );
    this.getImages(false, event);
  }

  updateImageState = (image: Gyphy) => {
    this.images = this.images.map((_image) => {
      if (_image.id === image.id) {
        return image;
      }

      return _image;
    });
  };

  async getImages(
    isFirstLoad: boolean,
    event: any,
    search?: string,
    page?: number
  ) {
    try {
      if(search) {
        this.autocompletes.push(search);
      }

      if (
        !this.result ||
        (this.result.pagination &&
          this.result.pagination.total_count !== this.images.length)
      ) {
        this.result = await this.giphyService.getGifs(page, search);

        this.result.data.forEach((imge) => {
          this.images.push(imge);
        });

        if (isFirstLoad) {
          event.target.complete();
        }
      } else {
        event.target.disabled = true;
      }
    } catch (_) {
      // TODO
    }
  }

  doInfinite(event) {
    this.getImages(true, event, null, ++this.result.pagination.offset);
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
