import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalificaLlamadaPageRoutingModule } from './califica-llamada-routing.module';

import { CalificaLlamadaPage } from './califica-llamada.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CalificaLlamadaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CalificaLlamadaPage]
})
export class CalificaLlamadaPageModule {}
