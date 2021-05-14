import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ToastService } from '../../services/toast.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonSlides, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  @ViewChild('sliderRegistro') slides: IonSlides;
  fillUser = {};
  fillConv = {};
  countryCode = '';
  registroForm = new FormGroup({
    email: new FormControl( '',[Validators.required,Validators.email]),
    password: new FormControl ('', [Validators.required]),
    name: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    birthDate: new FormControl('',Validators.required),
    bio: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required,Validators.minLength(10)])
  });
  constructor(
    private authService: AuthenticationService,
    public addnewFormbuilder: FormBuilder,
    private toastservice: ToastService,
    private fbstore: AngularFirestore,
    public router:  Router,
    private menu: MenuController
  ) { 
    
  }

  ngOnInit() {
    //this.slides.lockSwipes(true);
    
  }
  ionViewDidEnter() {
    this.slides.lockSwipes(true);
    this.getIndex();
  }

  ionViewWillEnter() {
    this.menu.enable(false,'primerMenu');
  }

  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)      
    .then((res) => {
      // Do something here
      this.authService.SendVerificationMail();
    }).catch((error) => {
      window.alert(error.message)
    })
  }

  registro(rol: string) {
    let usuario = {
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value,
      name: this.registroForm.get('name').value,
      lastName: this.registroForm.get('lastName').value,
      gender: this.registroForm.get('gender').value,
      birthDtate: this.registroForm.get('birthDate').value,
      phone: this.registroForm.get('phone').value,
      bio: this.registroForm.get('bio').value,
      code: this.countryCode,
      role: rol
    }
    // console.log(usuario);
    
    this.authService.RegisterUser(usuario.email, usuario.password)      
    .then(async (res) => {
      // Do something here
      
      console.log('se registro usuario',res.user.uid);
      try {
        await this.fbstore.doc('perfiles/'+res.user.uid).set(usuario).then(data => {
          console.log('se creo perfil',data);
          this.authService.SendVerificationMail();
          this.router.navigate(['login']);  
        })

      }catch(error) {
        this.toastservice.showToast(error.message, 2000);
      }
      
    }).catch((error) => {
      //window.alert(error.message)
      this.toastservice.showToast(error.message, 2000);
    })
    
  }

  mostratRegCli() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
    this.getIndex();
  }

  mostratRegConv() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
    this.getIndex();
  }

  async getIndex() {
    await this.slides.getActiveIndex().then(slide => {
      if (slide === 0) {
        this.fillUser = 'solid';
        this.fillConv = 'outline'
        
      } if (slide === 1) {
        // console.log('conver');
        this.fillUser = 'outline';
        this.fillConv = 'solid'
      }
      
    })
  }

  telInputObject(obj) {
    console.log('telInputObject',obj);
    // obj.intlTelInput('setCountry', 'mx');
  }
  onCountryChange(obj) {
    console.log('onCountryChange',obj);
   //this.countryCode = obj.dialCode
  }
  hasError(obj) {
    //console.log('hasError',obj);
    if (obj) {
      console.log('sin error');
      this.registroForm.controls['phone'].setErrors(null)
    } else {
      console.log('hay error');
      this.registroForm.controls['phone'].setErrors({'incorrect': true})
    }
  }

  getNumber(obj) {
    console.log('getNumber',obj);
    this.countryCode = obj
  }

}
