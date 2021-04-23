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
    public fbauth: AngularFireAuth,
    public ngroute: Router
  ) {
    // const authfbObserver = fbauth.authState.subscribe( user => {
    //   if (user) {
    //     //console.log(user);
    //     this.ngroute.navigate(['inicio']);
    //     authfbObserver.unsubscribe();
    //   } else {
    //     console.log('Sin usuario', user);
    //     this.ngroute.navigate(['login']);
    //     authfbObserver.unsubscribe();
    //   }
    // });
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    });
  }
}
