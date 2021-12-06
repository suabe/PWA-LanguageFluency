import { Component, OnInit } from '@angular/core';
import { PopoverController, MenuController, NavController } from '@ionic/angular';
import { MenuPopComponent } from '../menu-pop/menu-pop.component';

import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  cookieValue;
  flagvalue;
  countryName;
  lang;
  listLang = [
    { text: 'English', flag: 'assets/imags/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/imags/flags/spain.jpg', lang: 'es' },
  ];
  
  constructor(
    public _user: DataUsuarioService,
    private popoverCtrl: PopoverController,
    public menu: MenuController,
    private fbauth: AngularFireAuth,
    public ngroute: Router,
    public languageService:LanguageService,
    private auThService: AuthenticationService
  ) {}
  
  ionViewDidEnter() {}

  ngOnInit() {}

  status() {}

  async showMenuPop( evento ) {
    const popover = await this.popoverCtrl.create({
      component: MenuPopComponent,
      event: evento,
      mode: 'ios',
      backdropDismiss: false
    });

    await popover.present();
    const {data} = await popover.onWillDismiss();
    if (data.salir) {
      console.log('salir');
      //this.menu.close();
      // await this.fbauth.signOut().then(() => {
      //   this.ngroute.navigate(['/login'], { replaceUrl: true });
      // });
      this.doLogout()
    }
    //console.log('Padre:', data);
  }

  doLogout() {
    
    this.auThService.SignOut()
  }

  setLanguage(lang) {
    
    this.languageService.setLanguage(lang.detail.value);

    
  }

}
