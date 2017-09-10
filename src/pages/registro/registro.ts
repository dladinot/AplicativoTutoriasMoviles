import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController,AlertController ,NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { UserModel } from '../../models/user-model';



/**
 * Generated class for the RegistroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  userModel: UserModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthService) {
    this.userModel = new UserModel();
  }
  signUp() {
        let loading = this.loadingCtrl.create({
            content: 'Creando cuenta. Por favor, espere...'
        });
        loading.present();

        this.authService.createUserWithEmailAndPassword(this.userModel).then(result => {
            loading.dismiss();

            this.navCtrl.push(LoginPage);
            this.alert('Información','Registro exitoso, ahora puede iniciar sesión');
            console.log('Registro ok');
        }).catch(error => {
            loading.dismiss();

            console.log(error);
            this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
        });
    }
    alert(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

}
