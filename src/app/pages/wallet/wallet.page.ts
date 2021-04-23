import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AgregaTarjetaPage } from '../agrega-tarjeta/agrega-tarjeta.page';
import { Plugins } from '@capacitor/core'
import '@capacitor-community/stripe';
import { StripePlugin } from '@capacitor-community/stripe';

const Stripe  = Plugins.Stripe as StripePlugin;



@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private loading: LoadingController
  ) {
    
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    
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
    
  }

  borraTarjeta() {
    
  }

}
