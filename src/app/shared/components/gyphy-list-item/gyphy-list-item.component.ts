import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageModalComponent } from '../../modals/image-content.component';
import { Gyphy } from '../../models/gyphy.model';

@Component({
  selector: 'app-gyphy-list-item',
  templateUrl: './gyphy-list-item.component.html',
  styleUrls: ['./gyphy-list-item.component.scss'],
})
export class GyphyListItemComponent implements OnInit {
  @Input() image: Gyphy;

  constructor(private readonly modalController: ModalController) { }

  ngOnInit() {}

  async openModal(opts = {}) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      swipeToClose: true,
      backdropDismiss: true,
      componentProps: {
        image: this.image,
      }
    });
    return await modal.present();
  }
}
