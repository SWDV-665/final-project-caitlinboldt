/* eslint-disable @typescript-eslint/naming-convention */
// declare const Buffer;
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { PlantService } from '../api/plant.service';
import * as aws from 'aws-sdk';
import { v1 } from 'uuid';
import { environment } from '../../environments/environment';

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

  s3 = new aws.S3({
    accessKeyId: environment.accessKeyId,
    secretAccessKey: environment.secretAccessKeyId,
  });

  constructor(private modalCtrl: ModalController, private camera: Camera, public plantDataService: PlantService) { }

  addPhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      const buf = Buffer.from(imageData, 'base64');
      const key = v1();
      const params = {
        Bucket: 'plantsky-images',
        Key: key,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      };
      this.s3.putObject(params).promise();
      this.plant.clickedImage = `https://plantsky-images.s3.us-west-1.amazonaws.com/${key}`;
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
