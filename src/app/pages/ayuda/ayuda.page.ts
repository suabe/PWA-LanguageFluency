import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { ModalController } from '@ionic/angular';
import { AyudaSoportePage } from '../ayuda-soporte/ayuda-soporte.page';
import { AyudaFacturaPage } from '../ayuda-factura/ayuda-factura.page';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {
  color = 'azul';
  constructor(
    public _user: DataUsuarioService,
    public modalCtrl: ModalController
  ) { }
  
  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
  }

  ngOnInit() {
  }

  async soporte() {
    const modal = await this.modalCtrl.create({
      component: AyudaSoportePage
    })

    await modal.present()
  }

  async factura() {
    const modal = await this.modalCtrl.create({
      component: AyudaFacturaPage
    })
    await modal.present()
  }
  

}
