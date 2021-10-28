import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-referral-detail',
  templateUrl: './referral-detail.page.html',
  styleUrls: ['./referral-detail.page.scss'],
})
export class ReferralDetailPage implements OnInit {
  color = 'azul';
  referal
  constructor(
    public _user: DataUsuarioService,
    private route: ActivatedRoute,
    private fbstore: AngularFirestore
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.fbstore.collection('perfiles', ref => ref.where('LFId','==',param.id)).snapshotChanges().subscribe( impro => {
        this.referal = impro.map( result => {
          const perfil = result.payload.doc.data()
          const uid = result.payload.doc.id
          return  {perfil,uid}
        } )
        this.fbstore.collection('plans', ref => ref.where('uid','==',this.referal[0]['uid'])).snapshotChanges().subscribe( plans => {
          this.referal['plans'] = plans.map( result => {
            return result.payload.doc.data()
          })
        } )
        console.log(this.referal);
      })
    })
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
  }

}
