import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AgregaPlanPage } from '../agrega-plan/agrega-plan.page';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {
  planes 
  constructor(
    public _user: DataUsuarioService,
    public fbstore: AngularFirestore,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getPlans()
  }

  getPlans() {
    try {
      this.fbstore.collection('plans', ref => ref.where('uid', '==', this._user.userID )).snapshotChanges()
      .subscribe( data => {
        this.planes = data.map( result => {
          return result.payload.doc.data()
        })
        
      } )
    } catch (error) {
      console.log('erro');
      
    }
  }

  agregar() {
    
  }

  eliminar() {

  }

  editar() {

  }


}
