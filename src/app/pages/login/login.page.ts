import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//import { Validator } from '../../helpers/validation.helpers';
import { ToastService } from '../../services/toast.service';
import { MenuController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private alert: AlertController
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
      //console.log('se logeo',data);
      this.loadingCtrl.dismiss();
      this.navCtrl.navigate(['/']).then(() => {
        window.location.reload();
      });
      // if (data.user) {
      //   // this.redirectUser(data.user.emailVerified)
      //   //this.authService.getUserPerfil(data.user.uid);
        
      // } else {
      //   console.log('no hay usuario'); 
      // }
      
      //this.router.navigateRoot('inicio', {animated: true});
    }).catch(async (error) => {
      this.loadingCtrl.dismiss();
      const alerta = this.alert.create({
        mode: 'ios',
        header: 'Error',
        subHeader: 'No se puydo inciar sessiòn.',
        message: error.message,
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
      //window.alert(error.message)
      //this.toastservice.showToast(error.message, 2000);
      //console.log(error.message);
      
    });
    
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.navCtrl.navigate(['/inicio']);
    } else {
      this.toastservice.showToast('Email no verificado, por favor revisa tu buzon',4000)
    }
  }

}
