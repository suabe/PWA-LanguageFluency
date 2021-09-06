import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';

@Component({
  selector: 'app-commissions-referrals',
  templateUrl: './commissions-referrals.page.html',
  styleUrls: ['./commissions-referrals.page.scss'],
})
export class CommissionsReferralsPage implements OnInit {
  color = 'azul'
  constructor(
    public _user: DataUsuarioService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
  }

}
