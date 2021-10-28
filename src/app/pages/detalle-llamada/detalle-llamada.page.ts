import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallsService } from '../../services/calls.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { ModalController } from '@ionic/angular';
import { CallRatePage } from '../call-rate/call-rate.page';

@Component({
  selector: 'app-detalle-llamada',
  templateUrl: './detalle-llamada.page.html',
  styleUrls: ['./detalle-llamada.page.scss'],
})
export class DetalleLlamadaPage implements OnInit {
  call
  complemento
  callChild
  speaker
  recordings
  recordings2
  url
  url2
  constructor(
    private route: ActivatedRoute,
    private _calls: CallsService,
    private fbstore: AngularFirestore,
    private _user: DataUsuarioService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.speaker = this._user.dataUser
    this.route.params.subscribe( param => {      
      this._calls.detalle(param.id).subscribe(llamada => {
        this.call = llamada.payload.data();
        this.fbstore.collection('perfiles').doc(this.call['speId']).snapshotChanges().subscribe( speak => {
          this.call['speaker'] = speak.payload.data()
          //  console.log(this.call);
        })
      })
      this._calls.complemento(param.id).subscribe(compe => {
        this.complemento =  compe
        //console.log(this.complemento);
      })
      
      this._calls.childCall(param.id).subscribe((child:any) => {
        //console.log(child.calls[0]);
        this.callChild = child.calls[0]
        this._calls.recordings(this.callChild['sid']).subscribe(grab => {
          this.recordings2 = grab          
          //console.log(this.recordings['recordings'][0]['sid']);
         
          this.url2 = "https://api.twilio.com/2010-04-01/Accounts/AC22ae1dad8bd832a2ecd25b28742feddc/Recordings/"+this.recordings['recordings'][0]['sid']+".mp3"
        })
      })

      this._calls.recordings(param.id).subscribe(grab => {
        this.recordings = grab          
        //console.log(this.recordings['recordings'][0]['sid']);
       
       
        this.url = "https://api.twilio.com/2010-04-01/Accounts/AC22ae1dad8bd832a2ecd25b28742feddc/Recordings/"+this.recordings['recordings'][0]['sid']+".mp3"
      })

      
    })
  }

  async calificaSpeker() {
    console.log(this.call);
    
    const modal = await this.modal.create({
      component: CallRatePage,
      componentProps: this.call
    });
    await modal.present();
  }

}
