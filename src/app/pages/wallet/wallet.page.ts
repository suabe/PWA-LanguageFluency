import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AgregaTarjetaPage } from '../agrega-tarjeta/agrega-tarjeta.page';
import { Plugins } from '@capacitor/core'
import '@capacitor-community/stripe';
import { StripePlugin } from '@capacitor-community/stripe';
import { WalletService } from '../../services/wallet.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';

const Stripe  = Plugins.Stripe as StripePlugin;


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  wallet:any = ''
  pagos = []
  constructor(
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private afStore: AngularFirestore,
    private _user: DataUsuarioService
  ) {
    
   }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getWallet()
    this.getPagos()
  }

 

  async agregaTarjeta() {
    const modal = await this.modalCtrl.create({
      component: AgregaTarjetaPage,
      componentProps: {
        item: 'item'
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();
    console.log('Datos a guardar', data);
    window.location.reload();
  }

  borraTarjeta() {
    
  }

  async getWallet() {
    await this.afStore.collection('wallet').doc(this._user.userID).ref.get().then( doc => {
      if (doc.exists) {
        //console.log(doc.data());
        return this.wallet = doc.data()
      } else {
        console.log('Sin datos...');
        
      }
    } )
  }

  async getPagos() {
    await  this.afStore.collection('pagos', ref => ref.where('uid','==',this._user.userID)).snapshotChanges()
    .subscribe( data => {
      this.pagos = data.map( result => {
        // console.log('Pagos=>',result);
        return {
          invoice: result.payload.doc.data()['invoice'],
          pagado: result.payload.doc.data()['amount_paid'],
          created: result.payload.doc.data()['created']
        }
      })
    } )
  }

}
