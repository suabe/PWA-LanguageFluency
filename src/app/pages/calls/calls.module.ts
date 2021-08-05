import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallsPageRoutingModule } from './calls-routing.module';

import { CallsPage } from './calls.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallsPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [CallsPage]
})
export class CallsPageModule {}
