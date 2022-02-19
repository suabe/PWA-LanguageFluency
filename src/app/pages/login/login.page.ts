import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//import { Validator } from '../../helpers/validation.helpers';
import { ToastService } from '../../services/toast.service';
import { MenuController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import ErrorFirebase  from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginform = new FormGroup({
    email: new FormControl('seiyasuabe@icloud.com'),
    password: new FormControl('NETnet123'),
  });
  splitPaneState
  loader: any;
  constructor(
    public authService: AuthenticationService,
    public navCtrl: Router,
    public loginFormbuilder: FormBuilder,
    //private valuechecker: Validator,
    public toastservice: ToastService,
    public menu: MenuController,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private afstore: AngularFirestore,
    private http: HttpClient
  ) { 
    /*this.loginform = this.loginFormbuilder.group({
      email: ['', Validators.required, this.valuechecker.emailCheck],
      password: ['', Validators.required, '']
    })*/
    //this.menu.enable(false,'primerMenu');
  }
  
  ngOnInit() {
    this.menu.enable(false,'primerMenu');
  }

  ngOnDestroy() {
    this.menu.enable(true,'main');
  }

  ionViewWillEnter() {
    this.menu.enable(false,'main');
    this.splitPaneState = false;
  }

  async doLogin() {
    //console.log(this.loginform.get('email').value);
    this.loader = await this.loadingCtrl.create({
      message: 'Procesando...',
      mode: 'ios'
    })
    this.loader.present();
    return this.authService.SignIn(this.loginform.get('email').value,this.loginform.get('password').value).then( data => {
      this.afstore.collection('perfiles').doc(data.user.uid).get().subscribe( async user =>  {
        //console.log(user.data()['name']);
        if (user.data()['status'] == 'canceled') {
          this.loadingCtrl.dismiss();
          this.authService.SignOut();
          const alerta = this.alert.create({
            mode: 'ios',
            header: 'Error',
            subHeader: 'No se puydo inciar sessiòn.',
            message: 'Tu cuenta esta Cancelada, para aclaraciones comunicate con soprte.',
            buttons: [          
              {
                text: 'Ok',
                handler: (blah) => {
                  console.log('Boton Ok');
                }
              }
            ]
          });
          await (await alerta).present()
        } else if (user.data()['status'] == 'suspended') {
          this.loadingCtrl.dismiss();
          this.authService.SignOut();
          const alerta = this.alert.create({
            mode: 'ios',
            header: 'Error',
            subHeader: 'No se puydo inciar sessiòn.',
            message: 'Tu cuenta esta Suspendida, para aclaraciones comunicate con soprte.',
            buttons: [          
              {
                text: 'Ok',
                handler: (blah) => {
                  console.log('Boton Ok');
                }
              }
            ]
          });
          await (await alerta).present()
        } else {
          this.loadingCtrl.dismiss();
          this.navCtrl.navigate(['/']);
        }
        
      })
      
    }).catch(async (error) => {
      this.loadingCtrl.dismiss();
      let erorTans = this.getError(error.code);
      const alerta = this.alert.create({
        mode: 'ios',
        header: 'Error',
        subHeader: 'No se puydo inciar sessiòn.',
        message: erorTans,
        buttons: [          
          {
            text: 'Ok',
            handler: (blah) => {
              console.log('Boton Ok');
            }
          }
        ]
      });
      await (await alerta).present()
      
      
    });
    
  }

  getError(code) {
    console.log(ErrorFirebase[code]);
    return ErrorFirebase[code]
    
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.navCtrl.navigate(['/inicio']);
    } else {
      this.toastservice.showToast('Email no verificado, por favor revisa tu buzon',4000)
    }
  }

}
