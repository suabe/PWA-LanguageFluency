import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { AgregaTarjetaPage } from '../agrega-tarjeta/agrega-tarjeta.page';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.page.html',
  styleUrls: ['./add-plans.page.scss'],
})
export class AddPlansPage implements OnInit {
  wallet
  precio
  loader
  termCond
  privacidad
  customPopoverOptions: any = {
    cssClass: 'popPlans'
  }
  constructor(
    public modalCtrl: ModalController,
    public afStore: AngularFirestore,
    public _user: DataUsuarioService,
    public http: HttpClient,
    public _toast: ToastService,
    public loading: LoadingController,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) { }

  ngOnInit() {
    
  }
  
  ionViewWillEnter() {
    this.getWallet()
    console.log(this._user.userID);
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

  contrata() {
    
  }

}
