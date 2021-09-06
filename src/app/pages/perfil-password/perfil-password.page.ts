import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataUsuarioService } from '../../services/data-usuario.service';

@Component({
  selector: 'app-perfil-password',
  templateUrl: './perfil-password.page.html',
  styleUrls: ['./perfil-password.page.scss'],
})
export class PerfilPasswordPage implements OnInit {
  cambioPswForm = new FormGroup({})
  color = 'azul';
  constructor(
    private alertCtl: AlertController,
    public route: Router,
    public _user: DataUsuarioService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
  }

  async cambioPsw() {
    let alert = await this.alertCtl.create({
      cssClass: 'my-custom-class',
      header: '¡Cambio de contraseña!',
      message: 'Tu contraseña se ha modificado.',
      mode: 'ios',
      buttons: [
        {
          text: 'Aceptar',
          handler: (blah) => {
            console.log('Boton Ok');
            this.route.navigate(['/perfil-options'])
          }
        }
      ]
    })
    await alert.present();
  }

}
