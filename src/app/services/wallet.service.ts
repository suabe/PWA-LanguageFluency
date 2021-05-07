import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WalletService {

  uid = ''
  wallet:any = ''

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    private http: HttpClient
  ) { 
    this.ngFireAuth.authState.subscribe((user: any ) => {
      this.uid = user.uid
    })
  }

  async getWallet() {
    await this.afStore.collection('wallet').doc(this.uid).ref.get().then( doc => {
      if (doc.exists) {
        //console.log(doc.data());
        return this.wallet = doc.data()
      } else {
        console.log('Sin datos...');
        
      }
    } )
  }
}
