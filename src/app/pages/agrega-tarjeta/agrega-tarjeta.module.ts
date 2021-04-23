import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregaTarjetaPageRoutingModule } from './agrega-tarjeta-routing.module';

import { AgregaTarjetaPage } from './agrega-tarjeta.page';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    AgregaTarjetaPageRoutingModule
  ],
  declarations: [AgregaTarjetaPage]
})
export class AgregaTarjetaPageModule {}
