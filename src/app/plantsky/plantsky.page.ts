import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { PlantService } from '../api/plant.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'plantsky.page.html',
  styleUrls: ['plantsky.page.scss']
})
export class PlantskyPage {

  constructor(private modalCtrl: ModalController, public plantDataService: PlantService) {}

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modal.present();
  }

  loadPlants() {
    return this.plantDataService.getPlants();
  }
}
