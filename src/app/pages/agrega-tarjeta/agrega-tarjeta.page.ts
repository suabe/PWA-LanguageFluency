import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agrega-tarjeta',
  templateUrl: './agrega-tarjeta.page.html',
  styleUrls: ['./agrega-tarjeta.page.scss'],
})
export class AgregaTarjetaPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  guardar() {
    this.modalCtrl.dismiss({
      tarjeta: '4242'
    });
  }

}
