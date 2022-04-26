import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  plants: any = [];

  constructor() { }

  getPlants() {
    return this.plants;
  }

  addPlant(plant) {
    this.plants.push(plant);
  }
}
