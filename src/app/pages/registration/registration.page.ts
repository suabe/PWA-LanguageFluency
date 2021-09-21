import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms'
import { ToastService } from '../../services/toast.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonSlides, MenuController } from '@ionic/angular';
import { Validator } from '../../helpers/validation.helpers';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class RegistrationPage implements OnInit {
  @ViewChild('sliderRegistro') slides: IonSlides;
  fillUser = {};
  fillConv = {};
  countryCode = '';
  country = '';
  registroForm = new FormGroup({
    email: new FormControl( '',[Validators.required,Validators.email]),
    password: new FormControl ('', [Validators.required]),
    name: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    birthDate: new FormControl('',Validators.required),
    bio: new FormControl('',Validators.required),
    idref: new FormControl(''),
    // spei: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    // horario: new FormControl('',Validators.required),
    // horario2: new FormControl('',Validators.required),
    // idioma: new FormControl('',Validators.required),
    termCond: new FormControl(undefined,[Validators.required]),
    privacidad: new FormControl(undefined,[Validators.required])
  });
  registroSPForm = new FormGroup({
    email: new FormControl( '',[Validators.required,Validators.email]),
    password: new FormControl ('', [Validators.required]),
    name: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    birthDate: new FormControl('',Validators.required),
    // bio: new FormControl('',Validators.required),
    // spei: new FormControl('',Validators.required),
    // cinbanck: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    // horario: new FormControl('',Validators.required),
    // horario2: new FormControl('',Validators.required),
    idioma: new FormControl('',Validators.required),
    termCond: new FormControl(undefined,[Validators.required]),
    privacidad: new FormControl(undefined,[Validators.required])
  });
  termCond
  privacidad
  constructor(
    private authService: AuthenticationService,
    public addnewFormbuilder: FormBuilder,
    public toastservice: ToastService,
    private fbstore: AngularFirestore,
    public router:  Router,
    private menu: MenuController,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
    config.scrollable = true;
  }

  checkCheckbox(c: AbstractControl){
    if(c.get('termsAndConditions').value == false){
      return false;
    }else return true;
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
      idref: this.registroForm.get('idref').value,
      code: this.countryCode,
      country: this.country,
      role: rol,
      status: 'active',
      creado: new Date().getTime()
    }
    // console.log(usuario);

    this.authService.RegisterUser(usuario.email, usuario.password)
    .then(async (res) => {
      // Do something here

      console.log('se registro usuario',res.user.uid);
      try {
        await this.fbstore.doc('perfiles/'+res.user.uid).set(usuario).then(data => {
          //console.log('se creo perfil',data);
          //this.authService.SendVerificationMail();
          //this.router.navigate(['agrega-plan']);
          this.router.navigate(['add-plans']);
        })

      }catch(error) {
        this.toastservice.showToast(error.message, 2000);
      }

    }).catch((error) => {
      //window.alert(error.message)
      this.toastservice.showToast(error.message, 2000);
    })

  }

  registroSpeaker() {
    let usuario = {
      email: this.registroSPForm.get('email').value,
      password: this.registroSPForm.get('password').value,
      name: this.registroSPForm.get('name').value,
      lastName: this.registroSPForm.get('lastName').value,
      gender: this.registroSPForm.get('gender').value,
      birthDtate: this.registroSPForm.get('birthDate').value,
      phone: this.registroSPForm.get('phone').value,
      // bio: this.registroSPForm.get('bio').value,
      spei: this.registroSPForm.get('spei').value,
      // cinbanck: this.registroSPForm.get('spei').value,
      idioma: this.registroSPForm.get('idioma').value,
      code: this.countryCode,
      country: this.country,
      creado: new Date()
    }

    return this.fbstore.collection('potenciales').add(usuario).then( (potencialID) => {
      this.router.navigate(['login']);
      this.toastservice.showToast('Registro Exitoso, te hemos enviado a tu correo las instrucciones para completar tu Registro', 5000)
    }).catch( (error) => {
      console.error('Error writing new message to database', error);
    })
  }

  mostraMenu() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
    this.getIndex();
  }

  mostratRegCli() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
    this.getIndex();
  }

  mostratRegConv() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2);
    this.slides.lockSwipes(true);
    this.getIndex();
  }

  async getIndex() {
    await this.slides.getActiveIndex().then(slide => {
      if (slide === 0) {
        this.fillUser = 'naranja';
        this.fillConv = 'outline'

      } if (slide === 2) {
        // console.log('conver');
        this.fillUser = 'azul';
        this.fillConv = 'solid'
      }

    })
  }

  telInputObject(obj) {
    console.log('telInputObject',obj);
    
    // obj.intlTelInput('setCountry', 'mx');
  }
  onCountryChange(obj) {
    console.log('onCountryChange',obj.iso2);
    this.country = obj.iso2
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

  openModal(modal) {
    this.modalService.open(modal);
  }

  closeModal(modal) {
    if (modal == 'term') {
      this.termCond = true
    }
    if (modal == 'priv') {
      this.privacidad = true
    }
    this.modalService.dismissAll()
    console.log(modal);
  }

}
