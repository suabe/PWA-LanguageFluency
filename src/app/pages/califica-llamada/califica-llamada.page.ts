import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-califica-llamada',
  templateUrl: './califica-llamada.page.html',
  styleUrls: ['./califica-llamada.page.scss'],
})
export class CalificaLlamadaPage implements OnInit {

  calificaForm = new FormGroup({
    fluency: new FormControl (null, [Validators.required]),
    pronunciation: new FormControl (null, [Validators.required]),
    grammar: new FormControl (null, [Validators.required]),
    //avg: new FormControl (null, [Validators.required])
  });
  @Input() iUid;
  @Input() imTel;
  @Input() name;
  @Input() lastName;
  @Input() bio;
  @Input() creado;
  @Input() gender;
  @Input() country;
  @Input() foto;
  min;
  seg;
  fl
  pr
  gr
  avg
  callId
  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private _user: DataUsuarioService,
    private fbstore: AngularFirestore,
    public toastservice: ToastService
  ) { 
    
  }

  ngOnInit() {
    this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/llamadaSaliente', {
      source: this._user.dataUser.code,//Numero del Speaker con codigo de pais
      speId: this._user.userID,//UID del speaker
      destination: this.imTel,//Numero del Improver, con codigo de pais
      impId: this.iUid//UID del Improver
    }).subscribe( async (data: any) => {
      //console.log(data.sid);
      this.callId = data.sid
    } )
    // console.log(this.imTel);
    this.contador()
    
  }

  async calificar() {
    let califica = {
      fl: this.fl,
      pr: this.pr,
      gr: this.gr,
      avg: this.avg
    }
    try {
      await this.fbstore.collection('calls').doc(this.callId).update({calImp: califica}).then(data=>{
        this.modalCtrl.dismiss();
        //console.log('exito?');
        
      })  
    } catch (error) {
      this.modalCtrl.dismiss();
      this.toastservice.showToast(error,5000);
    }
    
    //console.log(this.calificaForm.value);
    
    
  }

  contador() {
    var tiempo = new Date('2020-01-01 00:00')
    var padLeft = n => "00".substring(0, "00".length - n.length) + n;

    var interval = setInterval(() => {
      // Asignar el valor de minutos
      var minutes = padLeft(tiempo.getMinutes() + "");
      // Asignqr el valor de segundos
      var seconds = padLeft(tiempo.getSeconds() + "");
      
      // console.log(minutes, seconds);
      // Restarle a la fecha actual 1000 milisegundos
      tiempo = new Date(tiempo.getTime() + 1000);

      // if( seconds == '05' ) {
      //   clearInterval(interval); 
      // }
      this.seg =  seconds 
      this.min = minutes
    }, 1000)

    
  }

  changefl(fl) {
    this.fl = fl
    //console.log(fl);
    this.calculateavg()
  }

  changepr(pr) {
    this.pr = pr
    //console.log(pr);
    this.calculateavg()
  }

  changegr(gr) {
    this.gr = gr
    //console.log(gr);
    this.calculateavg()
  }

  calculateavg() {
    this.avg = (this.fl+this.gr+this.pr)/3
    //console.log(this.avg);
  }

}
