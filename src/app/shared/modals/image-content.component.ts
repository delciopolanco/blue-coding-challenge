import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Gyphy } from '../models/gyphy.model';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-content.component.html'
})
export class ImageModalComponent implements OnInit {
  @Input() image: Gyphy;

  constructor(private readonly modalController: ModalController) { }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss();
  }
}
