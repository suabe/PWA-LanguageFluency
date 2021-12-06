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
        return { 
          uid: result.payload.doc.id,
          name: result.payload.doc.data()['name'],
          lastName: result.payload.doc.data()['lastName'],
          status: result.payload.doc.data()['status'],
          LFId: result.payload.doc.data()['LFId']
        }
      } )
      for (let index = 0; index < this.referals.length; index++) {
        this.afstore.collection('plans', ref => ref.where('uid','==',this.referals[index]['uid'])).snapshotChanges().subscribe( plans => {
          this.referals[index]['plans'] = plans.map( result => {
            return result.payload.doc.data()
          })
        } )
        this.referals[index];
        
      }
      console.log(this.referals);
      
    })
  }

}
