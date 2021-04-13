import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopoverController, MenuController, ModalController } from '@ionic/angular';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { CalificaLlamadaPage } from '../califica-llamada/califica-llamada.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  slideOptions = {
    
  };
  userList = [];
  //userPerfil = JSON.parse(localStorage.getItem('perfil'));
  constructor(
    public ngroute: Router,
    private fbauth: AngularFireAuth,
    private popoverCtrl: PopoverController,
    private menu: MenuController,
    private fbstore: AngularFirestore,
    private toastservice: ToastService,
    public _user: DataUsuarioService,
    private modalCtrl: ModalController
  ) { }

  async getClientes() {
    try {
      await this.fbstore.collection('perfiles', ref => ref.where('role', '==', 'cliente')).snapshotChanges()
      .subscribe(data => {
        //console.log(data);
        this.userList = data.map( result => {
          //console.log(result);
          return {
            userId: result.payload.doc.id,
            userName: result.payload.doc.data()['name'],
            userLastName: result.payload.doc.data()['lastName']
          }
        })
      });
      
    } catch (error) {
      this.toastservice.showToast(error.message, 2000)
    }
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menu.enable(true,'primerMenu');
    this.getClientes();
    
  }

  async mostrarNot(evento) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: evento,
      mode: 'ios',
      backdropDismiss: false
    });

    await popover.present();

    //const {data} = await popover.onDidDismiss();
    const {data} = await popover.onWillDismiss();
    console.log('Padre:', data);
    
  }

  llamarCliente(userId) {
    this.toastservice.showToast('Llamando...',5000)
    setTimeout(async () => {
      const modal = await this.modalCtrl.create({
        component: CalificaLlamadaPage
      });
      await modal.present();
    }, 3000);
    console.log(userId);
    
  }

  async doLogout(): Promise<void> {
    localStorage.removeItem('perfil');
    await this.fbauth.signOut().then(() => {
      this.ngroute.navigate(['login']);
    });
  }

}
