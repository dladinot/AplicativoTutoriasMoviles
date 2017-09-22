import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth}  from 'angularfire2/auth';
import {CrearPerfil} from '../../models/perfil';
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
  perfil = {} as CrearPerfil;

  constructor(
    private afAuth: AngularFireAuth, private afDatabase:AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPerfilPage');
  }

  crearPerfil(){
    this.afAuth.authState.take(1).subscribe(auth=>{
      this.afDatabase.object(`perfil/${auth.uid}`).set(this.perfil)
      //mirar que hace cuando se crea el perfil la idea es que esta vista salga una sola vez en el login cuando el usuario no tiene datos de perfil
        .then(()=>this.navCtrl.setRoot('HomePage'));

    })
  }

}
