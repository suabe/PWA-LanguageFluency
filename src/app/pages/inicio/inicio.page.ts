import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopoverController, MenuController, ModalController, AlertController } from '@ionic/angular';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { CalificaLlamadaPage } from '../califica-llamada/califica-llamada.page';
import { MessagingService } from '../../services/messaging.service';

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
  emailVerified: false;
  constructor(
    public ngroute: Router,
    private fbauth: AngularFireAuth,
    private popoverCtrl: PopoverController,
    private menu: MenuController,
    private fbstore: AngularFirestore,
    private toastservice: ToastService,
    public _user: DataUsuarioService,
    private modalCtrl: ModalController,
    public messagingService: MessagingService,
    public alertCtrl: AlertController
  ) { 
    this.listenForMessages();
  }

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
    this.verifica();
    this.menu.enable(true,'primerMenu');
    this.getClientes();
    this.requestPermission();
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
    
    await this.fbauth.signOut().then(() => {
      this.ngroute.navigate(['login']);
    });
  }

  verifica() {
    this.emailVerified = this._user.emailVerified
    if (!this.emailVerified) {
      
      this.toastservice.showToast('Email no verificado, por favor revisa tu buzon',4000);
    }
  }

  listenForMessages() {
    this.messagingService.getMessages().subscribe(async (msg: any) => {
      const alert = await this.alertCtrl.create({
        header: msg.notification.title,
        subHeader: msg.notification.body,
        message: msg.data.info,
        buttons: ['OK'],
        mode: 'ios',
        backdropDismiss: false,
        animated: true
      });
 
      await alert.present();
    });
  }


  requestPermission() {
    this.messagingService.requestPermission().subscribe(
      async token => {
        this.toastservice.showToast('Got your token', 2000);
        
      },
      async (err) => {
        this.toastservice.showToast(err, 2000);
      }
    );
  }

}
