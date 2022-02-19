import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, LoadingController } from '@ionic/angular';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.page.html',
  styleUrls: ['./plan-edit.page.scss'],
})
export class PlanEditPage implements OnInit {
  @Input() plan;
  @Input() customer;
  @Input() schedule;
  loading
  wallet
  planData
  editaPlanForm = new FormGroup({
    tarjeta: new FormControl('',[Validators.required]),
    schedule: new FormControl('',[Validators.required])
  })
  constructor(
    private afStore: AngularFirestore,
    private modalCtrl: ModalController,
    public _user: DataUsuarioService,
    private http: HttpClient,
    public _toast: ToastService,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getPlan();
    this.getWallet();
    
  }

  ionViewWillEnter() {    
    this.getPlan();
    this.getWallet();
    this.editaPlanForm.setValue({
      tarjeta: this.customer,
      schedule: this.schedule
    })
  }

  async getPlan() {
    await this.afStore.collection('plans').doc(this.plan).snapshotChanges()
    .subscribe( datta => {
      this.planData = datta.payload.data()
    })
  }

  async getWallet() {
    await this.afStore.collection('wallet', ref => ref.where('uid', '==', this._user.userID )).snapshotChanges()
    .subscribe( data => {
      this.wallet = data.map( result => {
        return result.payload.doc.data()
      })
    } )
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  async editarPlan() {
    this.presentLoading('...Procesando');
    this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/updatePlan',{
      plan: this.plan,
      customer: this.editaPlanForm.get('tarjeta').value
    }).subscribe(async (data:any) => {
      console.log('Guardar =>',data);
      //Falta guardar en firebase
      console.log(this.editaPlanForm.get('schedule').value);
      let planActual = {
        schedule: this.editaPlanForm.get('schedule').value
      }
      this.afStore.collection('plans').doc(this.plan).update(planActual).then()
      this.loading.dismiss()
      this.modalCtrl.dismiss();
    })
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
