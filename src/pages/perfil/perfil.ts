import { Profile } from '../../models/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  firstName: string;
  lastName: string;
  phoneNumber: string;
  ciudad: string;
  profesion: string;
  skypeUser: string;
  profile = {} as Profile;
  previusProfile = {} as Profile;
  profileData: FirebaseObjectObservable<Profile>
  boolInputs: boolean;
  boolButton: boolean;
  boolButton2: boolean;
  testCheckboxOpen: boolean;
  testCheckboxResult;
  public disponible: boolean;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams) {
      this.boolInputs = true;
      this.boolButton = false;
      this.boolButton = false;

      this.afAuth.authState.subscribe(data => {
        this.profileData = this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});
        this.profileData.subscribe(data => {
          this.setData(data);
        })

      })


  }
  ionViewWillLoad(){

  this.afAuth.authState.take(1).subscribe(data =>{
    this.profileData = this.afDatabase.object(`profile/${data.uid}`)
    //subscribe obtiene info más especifica
    this.profileData.subscribe(snapshot => {

      this.disponible=snapshot.disponible;

    });
    //disponible tarda en cargarse por ello sale undefined primero y en unos segundos se asigna la variable

  })


}


  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  setData(data) {
    this.firstName = data.val().firstName;
    this.lastName = data.val().lastName;
    this.phoneNumber = data.val().phoneNumber;
    this.skypeUser = data.val().skypeUser;
    this.ciudad = data.val().ciudad;
    this.profesion = data.val().profesion;
  }
  notify(event)
    {
      if(event.checked){
        this.disponible=true;
        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDatabase.object(`profile/${auth.uid}/disponible`).set(true);
        });
      }
      else{
        this.disponible=false;
        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDatabase.object(`profile/${auth.uid}/disponible`).set(false);
        });
      }
    }


    getDisponible(){
      return !this.disponible;
    }



  updateProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.profile.boolLogin = true;
      this.afDatabase.object(`profile/${auth.uid}/disponible`).set(true);

      /*.then(
        () => this.navCtrl.setRoot('HomePage')
      )*/
    });
  }

  enableInputs() {
    this.boolInputs = false;
    this.boolButton2 = false;
    this.boolButton = true;
  }
  //mirar como conservar asignaturas luego de haberlas guardado
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
        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDatabase.object(`profile/${auth.uid}/asignaturas`).set(data);
        });
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }

}
