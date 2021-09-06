import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';

@Component({
  selector: 'app-wallet-pagos',
  templateUrl: './wallet-pagos.page.html',
  styleUrls: ['./wallet-pagos.page.scss'],
})
export class WalletPagosPage implements OnInit {
  pagos = []
  constructor(
    private afStore: AngularFirestore,
    private _user: DataUsuarioService
  ) { }
  
  ionViewWillEnter() {
    this.getPagos()
  }
  ngOnInit() {
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
