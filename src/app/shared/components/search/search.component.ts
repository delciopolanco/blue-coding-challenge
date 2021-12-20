import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() placeHolder: string;
  @Output() searchHandler: EventEmitter<string> = new EventEmitter<string>();

  public autocompletes: Array<string> = [];

  constructor() { }

  ngOnInit() {}

  search($event: any) {
    this.searchHandler.emit($event.detail.value);
    this.autocompletes.push($event.detail.value);
  }
}
