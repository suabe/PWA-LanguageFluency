import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalificaLlamadaPage } from '../califica-llamada/califica-llamada.page';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.page.html',
  styleUrls: ['./sesiones.page.scss'],
})
export class SesionesPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async calificaCliente(userId) {
    const modal = await this.modalCtrl.create({
      component: CalificaLlamadaPage
    });
    await modal.present();
    console.log(userId);
    

  }

}
