import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { PlantService } from '../api/plant.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  plant = {
    name: '',
    description: '',
    daysToWater: '',
    clickedImage: ''
  };

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private modalCtrl: ModalController, private camera: Camera, public plantDataService: PlantService) { }

  addPhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.plant.clickedImage = base64Image;
    }, (err) => {
      console.log(err);
    });
  }

  onChange(event, type){
    this.plant[type] = event.target.value;
  };

  close() {
    this.plantDataService.addPlant(this.plant);
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }
}
