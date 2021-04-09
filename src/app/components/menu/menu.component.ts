import { Component, OnInit } from '@angular/core';
import { PopoverController, MenuController } from '@ionic/angular';
import { MenuPopComponent } from '../menu-pop/menu-pop.component';

import { DataUsuarioService } from '../../services/data-usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  
  
  constructor(
    public _user: DataUsuarioService,
    private popoverCtrl: PopoverController,
    public menu: MenuController
  ) {
    
    
    
    
    
   }
   ionViewDidEnter() {
     
   }
  ngOnInit() {
    

  }

  

  async showMenuPop( evento ) {
    const popover = await this.popoverCtrl.create({
      component: MenuPopComponent,
      event: evento,
      mode: 'ios',
      backdropDismiss: false
    });

    await popover.present();
  }

}
