import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlansPageRoutingModule } from './plans-routing.module';

import { PlansPage } from './plans.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ArchwizardModule } from 'angular-archwizard';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlansPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    ArchwizardModule,
    ReactiveFormsModule
  ],
  declarations: [PlansPage]
})
export class PlansPageModule {}
