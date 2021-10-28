import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DataUsuarioService } from './services/data-usuario.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  listLang = [
    { text: 'English', flag: 'assets/imags/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/imags/flags/spain.jpg', lang: 'es' },
  ];
  splitPaneState: any ;
  constructor(
    private platform: Platform,
    private fbauth: AngularFireAuth,
    private ngroute: Router,
    public _user: DataUsuarioService,
    public languageService: LanguageService
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

  doLogout() {
    
    return this.fbauth.signOut().then(() => {
      // this.ngroute.navigate(['/login']);
      this.ngroute.navigateByUrl("/login");
    });
  }

  setLanguage(lang) {
    
    this.languageService.setLanguage(lang.detail.value);

    
  }
}
