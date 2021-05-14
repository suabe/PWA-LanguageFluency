import { Component, OnInit } from '@angular/core';
import { PopoverController, MenuController, NavController } from '@ionic/angular';
import { MenuPopComponent } from '../menu-pop/menu-pop.component';

import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  
  
  constructor(
    public _user: DataUsuarioService,
    private popoverCtrl: PopoverController,
    public menu: MenuController,
    private fbauth: AngularFireAuth,
    public ngroute: NavController
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
    
    return this.fbauth.signOut().then(() => {
      this.ngroute.navigateRoot('/login', { animated: true });
    });
  }

}
