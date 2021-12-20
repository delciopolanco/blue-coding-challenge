import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() close: boolean;
  @Input() back: boolean;

  @Output() closeEmmiter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() backEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  closeHandler() {
    this.closeEmmiter.emit(true);
  }

  backHandler() {
    this.backEmitter.emit(true);
  }

}
