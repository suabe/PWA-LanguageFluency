import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DataUsuarioService } from './services/data-usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private fbauth: AngularFireAuth,
    private route: Router,
    private _user: DataUsuarioService
  ) {    
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this._user.isAuthenticated.subscribe(state => {
      //   if (state) {
      //     this.route.navigate(['inicio'])
      //   } else {
      //     this.route.navigate(['login'])
      //   }
      // })
    });
  }
}
