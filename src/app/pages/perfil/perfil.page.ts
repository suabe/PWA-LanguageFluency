import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public uId: string;
  userData: any;
  userPerfil = {
    birthDtate: "",
    email: "",
    gender: "",
    lastName: "",
    name: "",
    password: "",
    phone: "",
    role: "",
    spei: ""
  }
  speiForm = new FormGroup({
    spei: new FormControl ('', [Validators.required,Validators.minLength(16)]),
  });
  constructor(
    public ngFireAuth: AngularFireAuth,
    private fbstore: AngularFirestore,
    private toastservice: ToastService,
    public addnewFormbuilder: FormBuilder
  ) { 
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if (userLocal) {
      this.uId = userLocal.uid;
      // console.log(userLocal.uid);
    } else {
      this.uId = '';
      // console.log(userLocal);
    }
  }

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    this.getPerfil(this.uId);
  }

  async getPerfil(uid: string) {
    try{
      await this.fbstore.doc('perfiles/'+uid).valueChanges().subscribe( result => {
        this.userPerfil.birthDtate = result['birthDtate'];
        this.userPerfil.email = result['email'];
        this.userPerfil.gender = result['gender'];
        this.userPerfil.lastName = result['lastName'];
        this.userPerfil.name = result['name'];
        this.userPerfil.phone = result['phone'];
        this.userPerfil.role = result['role'];
        this.userPerfil.spei = result['spei'];
      } )
    }catch(error) {
      this.toastservice.showToast(error.message, 2000);
    }
  }

  async agregaSpei() {
    let dataSpei = {
      spei: this.speiForm.get('spei').value
    }
    try {
      await this.fbstore.doc('perfiles/'+this.uId).update(dataSpei).then(data => {
        // console.log(data);
        window.location.reload();
      })
    } catch (error) {
      this.toastservice.showToast(error.message, 2000);
    }
  }
}
