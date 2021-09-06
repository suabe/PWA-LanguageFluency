import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleLlamadaPageRoutingModule } from './detalle-llamada-routing.module';

import { DetalleLlamadaPage } from './detalle-llamada.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleLlamadaPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [DetalleLlamadaPage]
})
export class DetalleLlamadaPageModule {}
