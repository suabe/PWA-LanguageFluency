import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//import { Validator } from '../../helpers/validation.helpers';
import { ToastService } from '../../services/toast.service';
import { MenuController, NavController } from '@ionic/angular';
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
  
  constructor(
    public authService: AuthenticationService,
    public navCtrl: Router,
    public loginFormbuilder: FormBuilder,
    //private valuechecker: Validator,
    public toastservice: ToastService,
    public menu: MenuController
  ) { 
    /*this.loginform = this.loginFormbuilder.group({
      email: ['', Validators.required, this.valuechecker.emailCheck],
      password: ['', Validators.required, '']
    })*/
    //this.menu.enable(false,'primerMenu');
  }
  
  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.menu.enable(false,'primerMenu');
  }

  doLogin() {
    //console.log(this.loginform.get('email').value);
    
    return this.authService.SignIn(this.loginform.get('email').value,this.loginform.get('password').value).then( data => {
      //console.log('se logeo',data);
      this.navCtrl.navigate(['/inicio']);
      // if (data.user) {
      //   // this.redirectUser(data.user.emailVerified)
      //   //this.authService.getUserPerfil(data.user.uid);
        
      // } else {
      //   console.log('no hay usuario'); 
      // }
      
      //this.router.navigateRoot('inicio', {animated: true});
    }).catch((error) => {
      //window.alert(error.message)
      this.toastservice.showToast(error.message, 2000);
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
