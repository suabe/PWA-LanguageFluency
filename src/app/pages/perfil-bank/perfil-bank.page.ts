import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';

@Component({
  selector: 'app-perfil-bank',
  templateUrl: './perfil-bank.page.html',
  styleUrls: ['./perfil-bank.page.scss'],
})
export class PerfilBankPage implements OnInit {
  userPerfil
  constructor(
    private _user: DataUsuarioService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userPerfil = this._user.dataUser 
  }

}
