import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class DataUsuarioService {

  dataUser:  User = {};
  cargo: false;

  constructor(
    public afStrore: AngularFirestore,
    public ngFireAuth: AngularFireAuth
  ) { 
    //console.log('Data User  Listo');
    this.ngFireAuth.authState.subscribe((user: any) => {
      if (user) {
        console.log(user.uid);
      try {
        this.afStrore.doc('perfiles/'+user.uid).valueChanges().subscribe( result => {
          this.dataUser = result;
          console.log(this.dataUser);
          
        })
      } catch (error) {
        console.log(error.message);
        
      }
      } else {
        console.log('no hau usuario');
        
      }
      
    })
    
    
    
    
  }
}
