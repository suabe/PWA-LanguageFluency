import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  
  constructor(
    public afStrore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    private http: HttpClient
  ) { }


  detalle( id:string ) {
    return this.afStrore.collection('calls').doc(id).snapshotChanges()
  }

  complemento(uri:string) {
    var url = 'https://api.twilio.com/2010-04-01/Accounts/AC22ae1dad8bd832a2ecd25b28742feddc/Calls/'+uri+'.json';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('AC22ae1dad8bd832a2ecd25b28742feddc:84e565cb348fe86545ebfd53617bb4ca')
      })
    }
    return this.http.get(url,httpOptions);
  }

  recordings(uri:string){
    var url = 'https://api.twilio.com/2010-04-01/Accounts/AC22ae1dad8bd832a2ecd25b28742feddc/Calls/'+uri+'/Recordings.json';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('AC22ae1dad8bd832a2ecd25b28742feddc:84e565cb348fe86545ebfd53617bb4ca')
      })
    }
    return this.http.get(url,httpOptions);
  }


}
