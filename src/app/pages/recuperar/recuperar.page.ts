import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  recuperaForm = new FormGroup({
    email: new FormControl( '',[Validators.required,Validators.email])
  });

  constructor(
    private athService: AuthenticationService,
    private toastService: ToastService,
    private router: NavController,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  recuperar() {
    this.athService.PasswordRecover(this.recuperaForm.get('email').value).then( data => {
      this.alerta();
    }).catch((error) => {
      this.toastService.showToast('¡Tenemos un error, verifica el e-mail!',4000);
      console.log(error);
      
    });
  }

  async alerta() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Recuperar Contraseña',
      message: 'Has iniciado el proceso para recuperar tu contraseña, se te ha enviado un email con las instrucciones aseguir.',
      buttons: [
        {
          text: 'Ok',
          handler: (blah) => {
            console.log('Boton Ok');
            this.router.navigateRoot('login',{animated: true});
          }
        }
      ]
    });

    await alert.present();
  }

}
