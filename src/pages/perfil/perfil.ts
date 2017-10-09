import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {CrearPerfil} from '../../models/perfil';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth}  from 'angularfire2/auth';
import {UsuarioProvider} from '../../providers/usuario/usuario';

/**
 * Generated class for the PerfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  //o EditarPerfil
  //algunos campos de crear perfil estan em models/perfil.ts
  infoPerfil: FirebaseObjectObservable<CrearPerfil>;
  public disponible: boolean;
  testCheckboxOpen: boolean;
  testCheckboxResult;
  idUsuario;

  constructor(
    private afAuth: AngularFireAuth, private afDatabase:AngularFireDatabase,
    public usp: UsuarioProvider,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  }

  irEditarPerfil(){

    this.afDatabase.object(`perfil/${this.idUsuario}/disponible`).set(true);

  }

  ionViewWillLoad(){
    this.afAuth.authState.take(1).subscribe(data =>{
      this.idUsuario=data.uid;
      this.infoPerfil = this.afDatabase.object(`perfil/${this.idUsuario}`)
      //subscribe obtiene info más especifica
      this.infoPerfil.subscribe(snapshot => {

        this.disponible=snapshot.disponible;

      });
      //disponible tarda en cargarse por ello sale undefined primero y en unos segundos se asigna la variable

    })


  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad PerfilPage');


  }
  notify(event)
    {
      if(event.checked){
        this.disponible=true;
        //ojo recarga la vista de nuevo
        this.afDatabase.object(`perfil/${this.idUsuario}/disponible`).set(true);
      }
      else{
        this.disponible=false;
        this.afDatabase.object(`perfil/${this.idUsuario}/disponible`).set(false);

      }
    }
    getDisponible(){
      return !this.disponible;
    }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('¿En que asignaturas puedes ofrecer asesoría?');

    alert.addInput({
      type: 'checkbox',
      label: 'Algebra',
      value: 'algebra',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Trigonometría',
      value: 'trigonometria'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Programación',
      value: 'programacion'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Inglés',
      value: 'ingles'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Física',
      value: 'fisica'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Geometría',
      value: 'geometria'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Estadística',
      value: 'estadistica'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Ecuaciones diferenciales',
      value: 'ecuaciones'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Química',
      value: 'quimica'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Biología',
      value: 'biologia'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Probabilidad',
      value: 'probabilidad'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Economía',
      value: 'economia'
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Confirmar',
      handler: data => {
        console.log('Checkbox data:', data);
        //destruye la vista actual y toca volver a cargarla
        //this.afDatabase.object(`perfil/${this.idUsuario}/asignaturas`).set(data).then(()=>this.navCtrl.push(PerfilPage));
        this.usp.setAsignaturas(this.idUsuario,data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }

}
