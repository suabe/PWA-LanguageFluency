import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agrega-plan-modal',
  templateUrl: './agrega-plan-modal.page.html',
  styleUrls: ['./agrega-plan-modal.page.scss'],
})
export class AgregaPlanModalPage implements OnInit {
  
  @Input() plan;
  contratarForm = new FormGroup({
    idioma: new FormControl('', [Validators.required]),
    horario: new FormControl('',Validators.required),
    horario2: new FormControl('',Validators.required),
    tarjeta: new FormControl('',Validators.required)
  })
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  contratar() {
    this.modalCtrl.dismiss();
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

}
