import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlantskyPage } from './plantsky.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PlantskyPageRoutingModule } from './plantsky-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PlantskyPageRoutingModule
  ],
  declarations: [PlantskyPage]
})
export class PlantskyPageModule {}
