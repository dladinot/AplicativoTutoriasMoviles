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
  public listaTutores=[];
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, private afDatabase:AngularFireDatabase
  ) {
    this.asignatura=this.navParams.get("asignatura");
    /*this.tutores = this.afDatabase.list(`profile`,{
      query:{
        orderByChild: 'disponible',
        equalTo: true
      }
    });
    */



  }
  ionViewWillLoad(){

  this.afAuth.authState.take(1).subscribe(data =>{
    this.tutores = this.afDatabase.object(`asignaturas/${this.asignatura}`, {preserveSnapshot: true})
    this.tutores.subscribe(snapshots => {
        snapshots.forEach(snapshot=>{
          this.consultaTutor=this.afDatabase.object(`profile/SlHGkc3ZK0hHxH2s1sowpgGuJfA3`, {preserveSnapshot: true})
          this.consultaTutor.subscribe(info=>{
            info.forEach(childSnapshot=>{

              var item = childSnapshot.val();
              item.key=childSnapshot.key;
              console.log(childSnapshot.key);
              this.listaTutores.push(item);      
            })

            console.log(this.listaTutores);
          })
          console.log(snapshot.key);
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
