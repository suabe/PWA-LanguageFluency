import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-commissions-referrals',
  templateUrl: './commissions-referrals.page.html',
  styleUrls: ['./commissions-referrals.page.scss'],
})
export class CommissionsReferralsPage implements OnInit {
  color = 'azul'
  referals
  constructor(
    public _user: DataUsuarioService,
    private afstore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }

    this.getReferals()
  }

  async getReferals() {
    await this.afstore.collection('perfiles', ref => ref.where('idref', '==', this._user.dataUser.LFId )).snapshotChanges()
    .subscribe(data => {
      this.referals = data.map( result => {
        return result.payload.doc.data()
      } )
      console.log(this.referals);
      
    })
  }

}
