import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlansPageRoutingModule } from './add-plans-routing.module';

import { AddPlansPage } from './add-plans.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlansPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    
  ],
  declarations: [AddPlansPage]
})
export class AddPlansPageModule {}
