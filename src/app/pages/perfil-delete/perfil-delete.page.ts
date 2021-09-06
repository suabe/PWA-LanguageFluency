import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-delete',
  templateUrl: './perfil-delete.page.html',
  styleUrls: ['./perfil-delete.page.scss'],
})
export class PerfilDeletePage implements OnInit {
  color = 'azul';
  userPerfil
  deleteForm = new FormGroup({
    password: new FormControl ('', [Validators.required]),
    motivo: new FormControl ('', [Validators.required])
  })
  constructor(
    public _user: DataUsuarioService,
    public addnewFormbuilder: FormBuilder,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
    this.userPerfil = this._user.dataUser 
  }

  async delete() {
    const  alert = await this.alertCtrl.create({
      header: 'Cuenta Eliminada',
      message: 'Tucuenta ha sido eliminada',      
      mode: 'ios',
      buttons: [        
        {
          text: 'Ok',
          handler: (blah) => {
            console.log('Boton Ok');
          }
        }
      ]
    });
    await alert.present();
  }

}
