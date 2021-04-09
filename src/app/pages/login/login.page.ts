import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//import { Validator } from '../../helpers/validation.helpers';
import { ToastService } from '../../services/toast.service';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  
  constructor(
    public authService: AuthenticationService,
    public router: NavController,
    public loginFormbuilder: FormBuilder,
    //private valuechecker: Validator,
    private toastservice: ToastService,
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
    
    this.authService.SignIn(this.loginform.get('email').value,this.loginform.get('password').value).then( data => {
      console.log('se logeo',data);
      if (data.user) {
        this.authService.getUserPerfil(data.user.uid);
        
        this.router.navigateRoot('inicio', {animated: true});
      } else {
        console.log('no hay usuario'); 
      }
      
      //this.router.navigateRoot('inicio', {animated: true});
    }).catch((error) => {
      //window.alert(error.message)
      this.toastservice.showToast(error.message, 2000);
      console.log(error.message);
      
    });
    
  }

}
