import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallDetailPageRoutingModule } from './call-detail-routing.module';

import { CallDetailPage } from './call-detail.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [CallDetailPage]
})
export class CallDetailPageModule {}
