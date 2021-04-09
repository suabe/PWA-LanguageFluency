import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-pop',
  templateUrl: './menu-pop.component.html',
  styleUrls: ['./menu-pop.component.scss'],
})
export class MenuPopComponent implements OnInit {

  constructor(
    private popoverCtrl: PopoverController,
    private fbauth: AngularFireAuth,
    public route: Router,
    private menu: MenuController
  ) { }

  ngOnInit() {}

  async salir(): Promise<void> {
    localStorage.removeItem('perfil');
    await this.fbauth.signOut().then(() => {
      this.popoverCtrl.dismiss();
      this.menu.close('primerMenu');
      this.route.navigate(['login']);
      localStorage.removeItem('perfil');
    });
  }

  config() {
    this.popoverCtrl.dismiss();
  }

  ayuda() {
    this.popoverCtrl.dismiss();
  }

}
