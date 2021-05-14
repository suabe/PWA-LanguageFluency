import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilPageRoutingModule } from './editar-perfil-routing.module';

import { EditarPerfilPage } from './editar-perfil.page';
import {IonicTelInputModule} from 'ionic-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditarPerfilPageRoutingModule,
    IonicTelInputModule
  ],
  declarations: [EditarPerfilPage]
})
export class EditarPerfilPageModule {}
