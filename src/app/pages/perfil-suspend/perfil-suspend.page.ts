import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-suspend',
  templateUrl: './perfil-suspend.page.html',
  styleUrls: ['./perfil-suspend.page.scss'],
})
export class PerfilSuspendPage implements OnInit {
  color = 'azul';
  userPerfil
  suspendForm = new FormGroup({
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

  async suspend() {
    const  alert = await this.alertCtrl.create({
      header: 'Cuenta Suspendida',
      subHeader: 'Tucuenta ha sido suspendida',
      message: 'Recuerda que solo puedes susperderla 2 veces mas.',
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

  ionChange(data)  {
    console.log(data);
    
  }

}
