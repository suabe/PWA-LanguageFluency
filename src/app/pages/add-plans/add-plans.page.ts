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
import { LfidValidator } from './lfid.validator';

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
        schedule: new FormControl('')
      }),
      en: new FormGroup({
        ln: new FormControl(undefined),
        plan: new FormControl(''),
        schedule: new FormControl('')
      }),
      fr: new FormGroup({
        ln: new FormControl(undefined),
        plan: new FormControl(''),
        schedule: new FormControl('')
      }),
      cn: new FormGroup({
        ln: new FormControl(undefined),
        plan: new FormControl(''),
        schedule: new FormControl('')
      }),
    }),
    idref: new FormControl('',[Validators.minLength(8)]),
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
    let referido
    if (this.addPlans.get('idref').value) {
      console.log('capturo');
      this._user.buscaLFId(this.addPlans.get('idref').value).subscribe(user => {
        referido = user.map(result => { return result.payload.doc.data()})
        //console.log('capturo? ',this.addPlans.get('idref').value);
        
        if (referido.length >= 1) {
          console.log('con referido',referido);
          this.contratar(planes)
        } else {
          console.log('sin referido ',referido);
          this._toast.showToast('¡El ID de referido no existe!', 5000);
          this.loader.dismiss();
        }

      })
    } else {
      console.log('no capturo');
      this.contratar(planes)
    }
    
      
    
  }

  async contratar(planes) {
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
          creadaDate: new Date(),
          uid: this._user.userID,
          status: data.status,
          start_date: data.start_date,
          customer: data.customer,
          idioma: plan,
          schedule: this.addPlans.get('planes.'+plan+'.schedule').value,
          idref: this.addPlans.get('idref').value
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

}
