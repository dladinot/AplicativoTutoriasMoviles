import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Nav } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { BuscarTutorPage } from "../buscar-tutor/buscar-tutor";
import { InicioPage } from "../inicio/inicio";
import { PerfilPage } from "../perfil/perfil";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  asignatura:string;

  constructor(private afAuth: AngularFireAuth,private toast: ToastController,
     public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data.email){
        this.toast.create({
          message: `Bienvenido ha Tutorias Móviles: ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: `Ningún usuario autenticado.`,
          duration: 3000
        }).present();
      }

    });
  }

  buscarTutor(){
    console.log(this.asignatura);
    this.navCtrl.push(BuscarTutorPage,{asignatura:this.asignatura});

  }

}
