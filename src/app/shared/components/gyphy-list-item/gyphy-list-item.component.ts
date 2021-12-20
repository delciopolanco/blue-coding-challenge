import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Events } from 'src/app/core/constants/event.contant';
import { ImageModalComponent } from '../../modals/image-content.component';
import { Gyphy } from '../../models/gyphy.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-gyphy-list-item',
  templateUrl: './gyphy-list-item.component.html',
  styleUrls: ['./gyphy-list-item.component.scss'],
})
export class GyphyListItemComponent {
  @Input() image: Gyphy;
  @Output() imagesChanges: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  constructor(
    private readonly modalController: ModalController,
    private readonly eventService: EventService
  ) {}

  async openModal(opts = {}) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      swipeToClose: true,
      backdropDismiss: true,
      componentProps: {
        image: this.image,
      },
    });
    return await modal.present();
  }

  imgLoaded() {
    this.image.isLoaded = true;
    this.eventService.publish(Events.updateImage, this.image);
  }
}
