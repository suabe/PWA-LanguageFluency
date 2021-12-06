import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-ayuda-factura',
  templateUrl: './ayuda-factura.page.html',
  styleUrls: ['./ayuda-factura.page.scss'],
})
export class AyudaFacturaPage implements OnInit {
  color = 'azul'
  loader: any;
  facturaForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    rfc: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
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

  async factura() {
    this.loader = await this.loadingCtrl.create({
      message: 'Enviando...',
      mode: 'ios'
    })
    this.loader.present()
    let factura = {
      from: this._user.userID,
      name: this.facturaForm.get('name').value,
      rfc: this.facturaForm.get('rfc').value,
      address: this.facturaForm.get('address').value,
      message: this.facturaForm.get('message').value,
      status: 'pending',
      creationTime: new Date().getTime()
    }
    
    this.fbstore.collection('invoice').add(factura).then(async invoice => {
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
    
    //this.modalCtrl.dismiss()
  }

  cancelar() {
    this.modalCtrl.dismiss()
  }

}
