import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantskyPage } from './plantsky.page';

const routes: Routes = [
  {
    path: '',
    component: PlantskyPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantskyPageRoutingModule {}
