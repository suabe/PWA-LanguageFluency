import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-ayuda-soporte',
  templateUrl: './ayuda-soporte.page.html',
  styleUrls: ['./ayuda-soporte.page.scss'],
})
export class AyudaSoportePage implements OnInit {
  color = 'azul'
  loader: any;
  soporteForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    message: new FormControl('',[Validators.required])
  })
  constructor(
    public _user: DataUsuarioService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private fbstore: AngularFirestore,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
  }

  async soporte() {
    this.loader = await this.loadingCtrl.create({
      message: 'Enviando...',
      mode: 'ios'
    })
    this.loader.present()
    let msg = {
      from: this._user.userID,
      name: this.soporteForm.get('name').value,
      message: this.soporteForm.get('message').value,
      status: 'notAnswered',
      creationTime: new Date().getTime()
    }
    this.fbstore.collection('support').add(msg).then(async support => {
      this.loadingCtrl.dismiss()
      const alert = await this.alertCtrl.create({
        header: 'Solicitud enviada',
        message: 'Estamos procesando tu solicitud, la respuesta sera enviada a tu e-mail',
        buttons:[
          {
            text: 'Ok',
            handler: () => {
              this.modalCtrl.dismiss()              
            }
          }
        ],
        mode: 'ios'
      })
      await alert.present()
    }).catch( async (error) => {
      this.loadingCtrl.dismiss()
      const alert = await this.alertCtrl.create({
        header: 'Error en la solicitud',
        message: error,
        buttons:[
          {
            text: 'Ok',
            handler: () => {
              this.modalCtrl.dismiss()              
            }
          }
        ],
        mode: 'ios'
      })
      await alert.present()
    })
  }

  cancelar() {
    this.modalCtrl.dismiss()
  }

}
