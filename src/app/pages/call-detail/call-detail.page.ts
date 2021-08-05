import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallsService } from '../../services/calls.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';


@Component({
  selector: 'app-call-detail',
  templateUrl: './call-detail.page.html',
  styleUrls: ['./call-detail.page.scss'],
})
export class CallDetailPage implements OnInit {
  call
  complemento
  speaker
  recordings
  url
  constructor(
    private route: ActivatedRoute,
    private _calls: CallsService,
    private fbstore: AngularFirestore,
    private _user: DataUsuarioService
  ) { }

  ngOnInit() {
    this.speaker = this._user.dataUser
    this.route.params.subscribe( param => {      
      this._calls.detalle(param.id).subscribe(llamada => {
        this.call = llamada.payload.data();
        this.fbstore.collection('perfiles').doc(this.call['inmpId']).snapshotChanges().subscribe( impro => {
          this.call['improver'] = impro.payload.data()
          console.log(this.call);
        })
      })
      this._calls.complemento(param.id).subscribe(compe => {
        this.complemento =  compe
      })
      this._calls.recordings(param.id).subscribe(grab => {
        this.recordings = grab
        console.log(this.recordings['recordings'][0]['sid']);
        this.url = "https://api.twilio.com/2010-04-01/Accounts/AC22ae1dad8bd832a2ecd25b28742feddc/Recordings/"+this.recordings['recordings'][0]['sid']+".mp3"
      })
    })
  }

}
