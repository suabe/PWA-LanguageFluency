import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-califica-llamada',
  templateUrl: './califica-llamada.page.html',
  styleUrls: ['./califica-llamada.page.scss'],
})
export class CalificaLlamadaPage implements OnInit {

  calificaForm = new FormGroup({});

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  calificar() {
    console.log(this.calificaForm.get);
    
    this.modalCtrl.dismiss();
  }

}
