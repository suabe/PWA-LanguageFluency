import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import { MenuPopComponent } from './menu-pop/menu-pop.component';
import { RatingComponent } from './rating/rating.component';

import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

@NgModule({
    declarations: [
      HeaderComponent,
      MenuComponent,
      NotificationsComponent,
      MenuPopComponent,
      RatingComponent
    ],
    exports:  [
      HeaderComponent,
      MenuComponent,
      NotificationsComponent,
      MenuPopComponent,
      RatingComponent
    ],
    imports: [
      CommonModule,
      IonicModule,
      RouterModule,
      TranslateModule
    ],
    providers : [LanguageService]
  })
  export class ComponentsModule { }