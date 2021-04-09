import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private modalCtrl: ModalController
  ) {
    
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.validaTarjeta();
  }

  async validaTarjeta() {
    await Stripe.setPublishableKey({key: 'pk_test_51IdzQvFjLGC5FmHqNEcCIDKir8SZhCPCKJe6Z9M07rfukQtstQfzllgTJktH7IkVHy0c8PTSIIPHEGDbO319mfOZ00DL0fDLYQ'});
    const res = await Stripe.createCardToken({
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 25,
      cvc: '224',
    });
    console.log(res,'tarjeta');
    
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
