import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { AgregaTarjetaPage } from '../agrega-tarjeta/agrega-tarjeta.page';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.page.html',
  styleUrls: ['./add-plans.page.scss'],
})
export class AddPlansPage implements OnInit {
  wallet
  planes
  precio
  loader
  termCond
  privacidad
  customPopoverOptions: any = {
    cssClass: 'popPlans'
  }
  addPlans = new FormGroup({
    planes: new FormGroup({
      es: new FormGroup({
        ln: new FormControl(undefined),
        plan: new FormControl(''),
      }),
      en: new FormGroup({
        ln: new FormControl(undefined),
        plan: new FormControl(''),
      }),
      fr: new FormGroup({
        ln: new FormControl(undefined),
        plan: new FormControl(''),
      }),
      cn: new FormGroup({
        ln: new FormControl(undefined),
        plan: new FormControl(''),
      }),
    }),
    tarjeta: new FormControl('',[Validators.required]),
    termCond: new FormControl(undefined,[Validators.required]),
    privacidad: new FormControl(undefined,[Validators.required])
  })
  constructor(
    private router: Router,
    public modalCtrl: ModalController,
    public afStore: AngularFirestore,
    public _user: DataUsuarioService,
    private menu: MenuController,
    public http: HttpClient,
    public _toast: ToastService,
    public loading: LoadingController,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { }

  ngOnInit() {
    this.menu.enable(false,'main');
  }
  
  ionViewWillEnter() {
    this.getWallet()
    this.getPlans()
    console.log('planes =>',);
    if (!this.planes) {
      this.menu.enable(false,'main');
    } else {
      this.menu.enable(true,'main');
    }
  }

  ngOnDestroy() {
    this.menu.enable(true,'main');
  }

  getPlans() {
    try {
      this.afStore.collection('plans', ref => ref.where('uid', '==', this._user.userID )).snapshotChanges()
      .subscribe( data => {
        this.planes = data.map( result => {
          return result.payload.doc.data()
        })
        
      } )
      
      
      
    } catch (error) {
      console.log('erro');
      
    }
  }

  async getWallet() {
    await this.afStore.collection('wallet', ref => ref.where('uid', '==', this._user.userID )).snapshotChanges()
    .subscribe( data => {
      this.wallet = data.map( result => {
        return result.payload.doc.data()
      })
      
      
    } )
  }

  async addCard() {
    const modal = await this.modalCtrl.create({
      component: AgregaTarjetaPage,
      componentProps: {
        item: 'item'
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();
  }

  openModal(modal) {
    this.modalService.open(modal);
  }

  closeModal(modal) {
    if (modal == 'term') {
      this.termCond = true
    }
    if (modal == 'priv') {
      this.privacidad = true
    }
    this.modalService.dismissAll()
    console.log(modal);
  }

  async contrata() {
    this.loader = await this.loading.create({
      message: 'Procesando...',
      mode: 'ios',
      spinner: 'bubbles'
    })
    this.loader.present()
    let planes = this.addPlans.get('planes').value;
    for( let plan in planes ) {
      //console.log('=>',this.addPlans.get('planes.'+plan+'.ln').value);
      if (this.addPlans.get('planes.'+plan+'.ln').value) {
        console.log(this.addPlans.get('planes.'+plan).value);
        this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/crearPlan', {
      customer: this.addPlans.get('tarjeta').value,
      priceId: this.addPlans.get('planes.'+plan+'.plan').value
    }).subscribe( async (data: any) => {
      if (data.id) {
        let plans = {
          plan: data.id,
          activa: true,
          price: this.addPlans.get('planes.'+plan+'.plan').value,
          enllamada: false,
          creada: data.created,
          uid: this._user.userID,
          status: data.status,
          start_date: data.start_date,
          customer: data.customer,
          idioma: plan,
          start: 'aa',
          end: 'aa'
        }
        await this.afStore.collection('plans').doc(data.id).set(plans).then( data => {
          this.loader.dismiss();
          this._toast.showToast('¡Se ha agregado un nuevo plan!', 5000);
          this.router.navigate(['plans'])
        })
      } else {
        this.loader.dismiss();
        this._toast.showToast('¡Error al crear plan!', 5000);
        this.router.navigate(['plans'])
      }
      
    } )
      }  
      
    }  
    
  }

  async contratar() {
    this.loader = await this.loading.create({
      message: 'Procesando...',
      mode: 'ios',
      spinner: 'bubbles'
    })
    this.loader.present()
    this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/crearPlan', {
      customer: 'aa',
      priceId: this.precio
    }).subscribe( async (data: any) => {
      if (data.id) {
        let plan = {
          plan: data.id,
          activa: true,
          price: this.precio,
          enllamada: false,
          creada: data.created,
          uid: this._user.userID,
          status: data.status,
          start_date: data.start_date,
          customer: data.customer,
          idioma: 'aa',
          start: 'aa',
          end: 'aa'
        }
        await this.afStore.collection('plans').doc(data.id).set(plan).then( data => {
          this.loader.dismiss();
          this.modalCtrl.dismiss();
          this._toast.showToast('¡Se ha agregado un nuevo plan!', 5000)
        })
      } else {
        this.loader.dismiss();
        this.modalCtrl.dismiss();
        this._toast.showToast('¡Error al crear plan!', 5000)
      }
      
    } )
    //this.modalCtrl.dismiss();
  }

}
