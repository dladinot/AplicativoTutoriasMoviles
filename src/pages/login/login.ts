import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, AlertController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { UserModel } from '../../models/user-model';
import { RegistroPage } from '../registro/registro';
import { HomePage } from '../home/home';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth}  from 'angularfire2/auth';
import { CrearPerfilPage } from '../crear-perfil/crear-perfil';



/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  infoPerfil: FirebaseObjectObservable<any>

  userModel: UserModel;
  splash = true;
  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase:AngularFireDatabase,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public navParams: NavParams,
    public menu: MenuController) {
    this.userModel = new UserModel();

  }

  signIn() {
    let loading = this.loadingCtrl.create({
        content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.authService.signInWithEmailAndPassword(this.userModel).then(result => {
        loading.dismiss();
        console.log(result.uid);

        //verifica si existe perfil creado o no
        this.infoPerfil=this.afDatabase.object(`perfil/${result.uid}`,{preserveSnapshot:true})
        this.infoPerfil.subscribe(snapshot => {
        if(snapshot.exists()) {
            this.navCtrl.setRoot(HomePage);
            //console.log('existe')
        } else {
            //console.log('no existe')
            this.navCtrl.setRoot(CrearPerfilPage);
        }
        });



    }).catch(error => {
        loading.dismiss();

        console.log(error);
        this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
    });
}

  signUp() {
        this.navCtrl.push(RegistroPage);
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
    setTimeout(() => this.splash = false, 4000);
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewDidEnter(){
    this.menu.enable(false)
  }
  ionViewDidLeave(){
    this.menu.enable(true)
  }
}
