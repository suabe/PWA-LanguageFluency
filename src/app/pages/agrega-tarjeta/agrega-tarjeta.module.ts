import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregaTarjetaPageRoutingModule } from './agrega-tarjeta-routing.module';

import { AgregaTarjetaPage } from './agrega-tarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregaTarjetaPageRoutingModule
  ],
  declarations: [AgregaTarjetaPage]
})
export class AgregaTarjetaPageModule {}
