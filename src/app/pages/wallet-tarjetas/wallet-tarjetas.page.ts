import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AgregaTarjetaPage } from '../agrega-tarjeta/agrega-tarjeta.page';

@Component({
  selector: 'app-wallet-tarjetas',
  templateUrl: './wallet-tarjetas.page.html',
  styleUrls: ['./wallet-tarjetas.page.scss'],
})
export class WalletTarjetasPage implements OnInit {
  wallet:any = ''
  constructor(  
    private afStore: AngularFirestore,
    public _user: DataUsuarioService,
    public modalCtrl: ModalController
  ) { }
  
  ionViewWillEnter() {
    this.getWallet()    
  }
  ngOnInit() {
  }

  async getWallet() {
    await this.afStore.collection('wallet', ref => ref.where('uid', '==', this._user.userID )).snapshotChanges()
    .subscribe( data => {
      this.wallet = data.map( result => {
        return result.payload.doc.data()
      })
    } )
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
    // console.log('Datos a guardar', data);
    // window.location.reload();
  }

  borraTarjeta() {
    
  }


}
