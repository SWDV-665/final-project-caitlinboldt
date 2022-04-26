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

  plants = [];
  errorMessage: string;

  constructor(private modalCtrl: ModalController, public plantDataService: PlantService) {
    this.loadPlants();
    plantDataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadPlants();
    });
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modal.present();
  }

  loadPlants() {
    this.plantDataService.getPlants()
    .subscribe(
      plants => this.plants = plants,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      error => this.errorMessage = <any>error
    );
  }
}
