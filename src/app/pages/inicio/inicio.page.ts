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
  impro:any  = ''
  userList = [];
  callList = [];
  userPerfil
  //userPerfil = JSON.parse(localStorage.getItem('perfil'));
  emailVerified: false;
  color = 'azul';
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

  
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.userPerfil = this._user.dataUser
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
      this.getCallsImp()
    } else {
      this.getPlans();
    }
    this.verifica();
    this.menu.enable(true,'primerMenu');
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
    //console.log('Padre:', data);
    
  }
  
  llamarCliente(user) {
    this.toastservice.showToast('Llamando...',5000)
    setTimeout(async () => {
      const modal = await this.modalCtrl.create({
        component: CalificaLlamadaPage,
        componentProps: user
      });
      await modal.present();
    }, 2000);
    //console.log(user);
    
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
    if (!this._user.dataUser.mtoken) {
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

    

    async getPlans() {
      try {
        this.fbstore.collection('plans', ref => ref.where('activa', '==', true)
                                                    .where('enllamada', '==', false)
                                                    .where('idioma', 'in' , this._user.dataUser.idioma)).snapshotChanges()
        .subscribe( data => {
          this.userList = data.map( result => {
            return {
              planID: result.payload.doc.id,
              iUid: result.payload.doc.data()['uid'],
              plan: result.payload.doc.data()
            }            
          })
          for (let index = 0; index < this.userList.length; index++) {
            this.fbstore.collection('perfiles').doc(this.userList[index]['iUid']).snapshotChanges().subscribe(perfil => {
              this.userList[index]['name'] = perfil.payload.data()['name'];
              this.userList[index]['lastName'] = perfil.payload.data()['lastName'];
              this.userList[index]['foto'] = perfil.payload.data()['foto'];
              this.userList[index]['imTel'] = perfil.payload.data()['code'];
              this.userList[index]['bio'] = perfil.payload.data()['bio'];
              this.userList[index]['creado'] = perfil.payload.data()['creado'];
              this.userList[index]['gender'] = perfil.payload.data()['gender'];
              this.userList[index]['country'] = perfil.payload.data()['country'];
              
            })
            
          }
          // console.log(this.userList);
        });
        
      } catch (error) {
        this.toastservice.showToast(error.message, 2000)
      }
  }

  async getCallsImp() {
    try {
      this.fbstore.collection('calls', ref => ref.where('inmpId', '==', this._user.userID)).snapshotChanges()
      .subscribe( data => {
        this.callList = data.map( result => {
          return result.payload.doc.data()
        })
      } )
    } catch (error) {
      this.toastservice.showToast(error.message, 2000)
    }
  }

  async contador() {
    var padLeft = n => "0000000".substring(0, "0000000".length - n.length) + n;
    try {
      this.fbstore.collection('perfiles', ref => ref.where('role', '==', 'cliente')).snapshotChanges().subscribe(data =>{
        let contador = data.length
        // console.log('Usuarios', 'I'+padLeft(contador + ""));
        
      })
    } catch (error) {
      
    }
  }
  
}
