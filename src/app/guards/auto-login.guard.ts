import { Injectable } from '@angular/core';
import { Router, CanLoad , ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataUsuarioService } from '../services/data-usuario.service';
import { filter, map, take } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad  {
  constructor(
    private _user : DataUsuarioService,
    private router: Router  
  ){}
  canLoad(): Observable<boolean> | boolean  {
    return this._user.isLogin.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          
          this.router.navigate(['/inicio']);
        } else {
          
          return true;
        }
      })
    )
    
  }
}
