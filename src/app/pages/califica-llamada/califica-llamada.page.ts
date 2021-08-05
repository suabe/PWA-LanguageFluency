import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataUsuarioService } from '../../services/data-usuario.service';

@Component({
  selector: 'app-califica-llamada',
  templateUrl: './califica-llamada.page.html',
  styleUrls: ['./califica-llamada.page.scss'],
})
export class CalificaLlamadaPage implements OnInit {

  calificaForm = new FormGroup({});
  @Input() iUid;
  @Input() imTel;
  @Input() name;
  @Input() lastName;
  @Input() bio;
  @Input() foto;
  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private _user: DataUsuarioService
  ) { 
    
  }

  ngOnInit() {
    this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/llamadaSaliente', {
      source: this._user.dataUser.code,//Numero del Speaker con codigo de pais
      speId: this._user.userID,//UID del speaker
      destination: this.imTel,//Numero del Improver, con codigo de pais
      impId: this.iUid//UID del Improver
    }).subscribe( async (data: any) => {
      // console.log(data);
      
    } )
    // console.log(this.imTel);
    
  }

  calificar() {
    console.log(this.calificaForm.get);
    
    this.modalCtrl.dismiss();
  }

}
