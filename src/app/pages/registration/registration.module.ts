import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
import {IonicTelInputModule} from 'ionic-tel-input';
import { TranslateModule } from '@ngx-translate/core';
import{ ArchwizardModule } from 'angular-archwizard'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    ReactiveFormsModule,
    IonicTelInputModule,
    ArchwizardModule,
    TranslateModule
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}
