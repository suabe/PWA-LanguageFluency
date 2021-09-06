import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataUsuarioService {

  dataUser:  User = {};
  cargo: false;
  userID = '';
  isAuthenticated: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(null);
  isLogin: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(null);
  emailVerified: false;
  constructor(
    public afStrore: AngularFirestore,
    public ngFireAuth: AngularFireAuth
  ) { 
    //console.log('Data User  Listo');
    this.ngFireAuth.authState.subscribe((user: any) => {
      if (user) {
        //console.log('Servicio ',user);
      try {
        this.afStrore.doc('perfiles/'+user.uid).valueChanges().subscribe( result => {
          this.dataUser = result;
          this.userID = user.uid;
          this.isAuthenticated.next(true);
          this.isLogin.next(true);
          this.emailVerified = user.emailVerified;
          // console.log(this.emailVerified);
        })
      } catch (error) {
        console.log(error.message);
        this.isAuthenticated.next(false);
      }
      } else {
        //console.log('no hau usuario');
        this.isAuthenticated.next(false);
      }
      
    })
    
    
    
    
  }
}
