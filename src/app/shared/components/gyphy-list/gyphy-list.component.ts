import { Component, Input } from '@angular/core';
import { Gyphy } from '../../models/gyphy.model';

@Component({
  selector: 'app-gyphy-list',
  templateUrl: './gyphy-list.component.html',
  styleUrls: ['./gyphy-list.component.scss'],
})
export class GyphyListComponent  {
  @Input() images: Array<Gyphy>;
  @Input() isLoading: boolean;

  constructor() { }

}
