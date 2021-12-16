import { Injectable } from '@angular/core';
import { ServicesId } from 'src/app/core/constants/services.contant';
import { FacadeCoreService } from 'src/app/core/services/facade/facade.service';
import { IHttpParams } from 'src/app/core/services/http/http.service';
import { GyphyResult } from 'src/app/shared/models/gyphy-result.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class GiphyService {
  constructor(private readonly facade: FacadeCoreService) {}

  getGifs(page: number = 0): Promise<GyphyResult> {
    const params = new IHttpParams(
      `${ServicesId.gifs}/trending?api_key=${environment.key}&limit=${environment.pageSize}&offset=${page}`,
      ServicesId.gifs
    );
    return this.facade.http.get<GyphyResult>(params);
  }

  searchGifs(search: string): Promise<GyphyResult> {
    const params = new IHttpParams(
      `${ServicesId.gifs}/trending?api_key=${environment.key}&limit=${environment.pageSize}&q=${search}`,
      ServicesId.gifs
    );
    return this.facade.http.get<GyphyResult>(params);
  }
}
