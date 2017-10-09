import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {AngularFireAuth}  from 'angularfire2/auth';
import {CrearPerfil} from '../../models/perfil';
import { AuthService } from '../../providers/auth-service';
import {AngularFireDatabase} from 'angularfire2/database'
import { HomePage } from '../home/home';

/**
 * Generated class for the EditarPerfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'crear-perfil.html',
})
export class CrearPerfilPage {
  //OJO!! algunos campos de crear perfil estan em models/perfil.ts
  perfil = {} as CrearPerfil;

  constructor(
    private afAuth: AngularFireAuth, private afDatabase:AngularFireDatabase,
    public alertCtrl: AlertController,public authService: AuthService,
    public navCtrl: NavController, public navParams: NavParams) {
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
    console.log('ionViewDidLoad CrearPerfilPage');
  }
  crearPerfil(){
    this.afAuth.authState.take(1).subscribe(auth=>{
      this.perfil.disponible=false;
      this.afDatabase.object(`perfil/${auth.uid}`).set(this.perfil)
        .then(()=>this.navCtrl.setRoot(HomePage));
          this.alert("Registro Exitoso",this.perfil.nombre);
    })
  }
}
