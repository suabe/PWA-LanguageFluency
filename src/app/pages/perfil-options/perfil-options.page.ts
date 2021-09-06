import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil.page';

@Component({
  selector: 'app-perfil-options',
  templateUrl: './perfil-options.page.html',
  styleUrls: ['./perfil-options.page.scss'],
})
export class PerfilOptionsPage implements OnInit {
  userPerfil
  color = 'azul';
  constructor(
    private fbauth: AngularFireAuth,
    public _user: DataUsuarioService,
    private modalCtrl: ModalController
  ) { 
    
   }

  ngOnInit() {
    
    
    
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
    this.userPerfil = this._user.dataUser
    
  }

  async editarPerfil() {
    const  modal = await this.modalCtrl.create({
      component: EditarPerfilPage,
      animated: true,
      backdropDismiss: false,
      mode: 'ios'
    });

    await modal.present();
    
  }

}
