import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth}  from 'angularfire2/auth';
import { AuthService } from '../../providers/auth-service';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database'
/**
 * Generated class for the BuscarTutorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar-tutor',
  templateUrl: 'buscar-tutor.html',
})
export class BuscarTutorPage {

  asignatura: string;
  public tutores: FirebaseListObservable<any>;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, private afDatabase:AngularFireDatabase
  ) {
    this.asignatura=this.navParams.get("asignatura");
    this.tutores = this.afDatabase.list(`profile`,{
      query:{
        orderByChild: 'disponible',
        equalTo: true
      }
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarTutorPage');
    console.log(this.asignatura);

  }

}
