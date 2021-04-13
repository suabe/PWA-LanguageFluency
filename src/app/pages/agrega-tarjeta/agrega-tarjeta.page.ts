import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { HttpClient} from '@angular/common/http';

declare var Stripe;

@Component({
  selector: 'app-agrega-tarjeta',
  templateUrl: './agrega-tarjeta.page.html',
  styleUrls: ['./agrega-tarjeta.page.scss'],
})
export class AgregaTarjetaPage implements OnInit {
  stripe: any;
  disabled: boolean = true;
  loader: any;
  card: any;
  name: string = "";
  email: string = "";
  constructor(
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private alertc: AlertController,
    private toastService: ToastService,
    private http: HttpClient
  ) {
    this.stripe = new Stripe('pk_test_51IdzQvFjLGC5FmHqNEcCIDKir8SZhCPCKJe6Z9M07rfukQtstQfzllgTJktH7IkVHy0c8PTSIIPHEGDbO319mfOZ00DL0fDLYQ')
   }

  ngOnInit() {
    this.setupStripe();
  }

  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#fff',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    this.card = elements.create('card', { style: style, hidePostalCode: true });

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
        this.disabled = true;
      } else {
        displayError.textContent = '';
        this.disabled = false;
      }

      var form = document.getElementById('payment-form');

      form.addEventListener('submit', async event => {
        event.preventDefault();
        const alert = await this.alertc.create({
          header: '¿Desea guardar?',
          message: 'Se guardaran solo los datos escenciales.',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Cancelado');
              }
            },{
              text: 'Si, guardar',
              handler: async () => {
                this.loader = await this.loading.create({
                  message: 'Procezando...'
                });
                this.loader.present();

                this.stripe.createSource(this.card).then(result => {
                  if (result.error) {
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                    this.loading.dismiss();
                  } else {
                    console.log(result);
                    this.modalCtrl.dismiss();
                    //this.attachSourceNewCustomer(result);
                  }
                })
              }
            }
          ]
        });
        await alert.present();
      });

    });
  }

  attachSourceNewCustomer(result) {
    
  }

  guardar() {
    this.modalCtrl.dismiss({
      tarjeta: '4242'
    });
  }

}
