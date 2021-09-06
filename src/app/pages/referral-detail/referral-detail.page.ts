import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';

@Component({
  selector: 'app-referral-detail',
  templateUrl: './referral-detail.page.html',
  styleUrls: ['./referral-detail.page.scss'],
})
export class ReferralDetailPage implements OnInit {
  color = 'azul';
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
