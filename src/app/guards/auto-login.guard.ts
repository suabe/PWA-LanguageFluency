import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataUsuarioService } from '../services/data-usuario.service';
import { filter, map, take } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private _user : DataUsuarioService,
    private router: NavController  
  ){}
  canLoad(): Observable<boolean> | boolean  {
    return this._user.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          
          this.router.navigateRoot('/inicio', {animated: true});
        } else {
          
          return true;
        }
      })
    )
  }
}
