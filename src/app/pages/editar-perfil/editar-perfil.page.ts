import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { DataUsuarioService } from '../../services/data-usuario.service';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  color = 'azul';
  countryCode = '';
  registroForm = new FormGroup({
    email: new FormControl( '',[Validators.required,Validators.email]),
    name: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    birthDate: new FormControl('',Validators.required),
    bio: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    horario: new FormControl('',Validators.required),
    horario2: new FormControl('',Validators.required)
  });
  improForm = new FormGroup({
    email: new FormControl( '',[Validators.required,Validators.email]),
    name: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    birthDate: new FormControl('',Validators.required),
    bio: new FormControl('',Validators.required),
    idref: new FormControl(''),
    // spei: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required,Validators.minLength(10)])
  })
  constructor(
    private modalCtr: ModalController,
    public _user: DataUsuarioService,
    public alerCtrl: AlertController
  ) { }
  
  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
    this.registroForm.setValue({
      email: this._user.dataUser.email,
      name: this._user.dataUser.name,
      lastName: this._user.dataUser.lastName,
      gender: this._user.dataUser.gender,
      birthDate: this._user.dataUser.birthDate,
      bio: this._user.dataUser.bio,
      phone: this._user.dataUser.phone,
      horario: this._user.dataUser.horario,
      horario2: this._user.dataUser.horario2,
    })
  }

  ngOnInit() {
  }

  async actualiza() {
    const alert = await this.alerCtrl.create({
      mode: 'ios',
      header: 'Confirmar cambios',
      subHeader: 'Ingresa tu contraseña',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.modalCtr.dismiss();
          }
        }
      ]
    })

    await alert.present();
  }

  cerrarModal() {
    this.modalCtr.dismiss();
  }

  telInputObject(obj) {
    console.log('telInputObject',obj);
    // obj.intlTelInput('setCountry', 'mx');
  }
  onCountryChange(obj) {
    console.log('onCountryChange',obj);
   //this.countryCode = obj.dialCode
  }
  hasError(obj) {
    //console.log('hasError',obj);
    if (obj) {
      console.log('sin error');
      this.registroForm.controls['phone'].setErrors(null)
    } else {
      console.log('hay error');
      this.registroForm.controls['phone'].setErrors({'incorrect': true})
    }
  }

  getNumber(obj) {
    console.log('getNumber',obj);
    this.countryCode = obj
  }


}
