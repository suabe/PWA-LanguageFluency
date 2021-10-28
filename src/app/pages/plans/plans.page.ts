import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AgregaPlanPage } from '../agrega-plan/agrega-plan.page';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {
  planes: any; 
  loading: any;
  constructor(
    public _user: DataUsuarioService,
    public fbstore: AngularFirestore,
    public modalCtrl: ModalController,
    private alert: AlertController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private toast: ToastService
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

  async eliminar(susc) {
    console.log(susc);
    
    const alert = await this.alert.create({
      header: 'Eliminar Plan',
      message: '¿Deseas eliminar este plan?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Cancelado');
            
          }
        },
        {
          text: 'Aceptar',
          handler: (emininar) => {
            this.presentLoading('...Espere');
            this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/deletePlan',{
              plan: susc.plan
            }).subscribe( async (data:any) => {
              if (data.id) {
                let update = {
                  activa: false,
                  status: data.status,
                  canceled_at: data.canceled_at
                }

                await this.fbstore.collection('plans').doc(susc.plan).update(update).then( data => {
                  this.loading.dismiss();              
                  this.toast.showToast('Plan elimidano', 3500);
                })

              } else {
                this.loading.dismiss();
                this.toast.showToast('Error al eliminar', 3500);
              }
            } )
          }
        }
      ]
    })

    await alert.present();
  }

  editar(plan) {
    //plan.close()
  }

  async presentLoading( message: string ) {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      message
    });
    this.loading.present();
  }


}
