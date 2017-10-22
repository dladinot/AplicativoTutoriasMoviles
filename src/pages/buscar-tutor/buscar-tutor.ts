import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth}  from 'angularfire2/auth';
import { AuthService } from '../../providers/auth-service';
import {AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database'
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
  public tutores: FirebaseObjectObservable<any>;
  public consultaTutor: FirebaseObjectObservable<any>;
  public infoTutores=[];
  //public listaTutores: FirebaseListObservable<any>;
  public listaTutores=[];
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, private afDatabase:AngularFireDatabase
  ) {
    this.asignatura=this.navParams.get("asignatura");
/*
    this.listaTutores = this.afDatabase.list(`profile`,{
      query:{
        orderByChild: 'disponible',
        equalTo: true
      }
    });
    this.listaTutores.subscribe(snapshot=>{
        console.log(snapshot);
    })

*/

  }
  ionViewWillLoad(){
  //Hay bug cuando se actualiza la información en tiempo real
  this.afAuth.authState.take(1).subscribe(data =>{
    this.tutores = this.afDatabase.object(`asignaturas/${this.asignatura}`, {preserveSnapshot: true});
    this.tutores.subscribe(snapshots => {
        snapshots.forEach(snapshot=>{
          console.log(snapshot.key);
          var padre=snapshot.key;
          this.consultaTutor=this.afDatabase.object(`profile/${snapshot.key}`, {preserveSnapshot: true});
          this.consultaTutor.subscribe(info=>{
            info.forEach(childSnapshot=>{
              var value=childSnapshot.val();
              var key = childSnapshot.key;
              this.infoTutores[key]=value;
            })
            this.listaTutores.push(this.infoTutores);
            console.log(this.listaTutores);
          })

          //this.afDatabase.object(`profile/${snapshot.key}`);

        })
    });

  })

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarTutorPage');
    console.log(this.asignatura);

  }

}
