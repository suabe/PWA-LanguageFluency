import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  notifications: any;
  constructor(
    private afstore: AngularFirestore,
    private _user: DataUsuarioService
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getNotifications()
  }

  async getNotifications() {
    if (this._user.dataUser.role === 'cliente') {
      const grupo = 'imp';
      await this.afstore.collection('notifications', ref => ref.where('grupo','in',[grupo,'all']).orderBy('created','desc')).snapshotChanges()
      .subscribe( data => {
        this.notifications = data.map( result => {
          return {
            nid: result.payload.doc.id,
            title: result.payload.doc.data()['title'],
            message: result.payload.doc.data()['message'],
            created: result.payload.doc.data()['created']
          }
        })
      })
    } if (this._user.dataUser.role === 'conversador') {
      const grupo = 'spe';
      await this.afstore.collection('notifications', ref => ref.where('grupo','in',[grupo,'all']).orderBy('created','desc')).snapshotChanges()
      .subscribe( data => {
        this.notifications = data.map( result => {
          return {
            nid: result.payload.doc.id,
            title: result.payload.doc.data()['title'],
            message: result.payload.doc.data()['message'],
            created: result.payload.doc.data()['created']
          }
        })
      })
    }
    
    
    
  }

}
