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
  asignaturasDisponibles: Array<string>;
  asignaturasNoDisponibles: Array<string>=new Array();
  userID:string;



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
    this.userID=data.uid;
    this.profileData = this.afDatabase.object(`profile/${data.uid}`)
    //subscribe obtiene info más especifica
    this.profileData.subscribe(snapshot => {

      console.log(snapshot);
      this.disponible=snapshot.disponible;

    });
    //disponible tarda en cargarse por ello sale undefined primero y en unos segundos se asigna la variable

  })


}


  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    console.log(this.asignaturasDisponibles);
  }

  setData(data) {
    this.firstName = data.val().firstName;
    this.lastName = data.val().lastName;
    this.phoneNumber = data.val().phoneNumber;
    this.skypeUser = data.val().skypeUser;
    this.ciudad = data.val().ciudad;
    this.profesion = data.val().profesion;
    this.asignaturasDisponibles=data.val().asignaturas;
    console.log("asignaturas disponibles:"+this.asignaturasDisponibles);
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

  prueba(){
    this.afAuth.authState.take(1).subscribe(auth => {

      this.afDatabase.object('asignaturas/algebra/'+this.userID).remove();

    });
  }
  //mirar como conservar asignaturas luego de haberlas guardado
  showCheckbox() {

    let alert = this.alertCtrl.create();
    alert.setTitle('¿En que asignaturas puedes ofrecer asesoría?');

    alert.addInput({
      type: 'checkbox',
      label: 'Algebra',
      value: 'algebra',

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

    if(this.asignaturasDisponibles!=null){


        let siguiente=0;
        for(let asignatura of alert.data.inputs){
          if(asignatura.value==this.asignaturasDisponibles[siguiente]){
            asignatura.checked=true;
            siguiente=siguiente+1;
          }

        }
      }
    //console.log(alert.data.inputs);
    alert.addButton({
      text: 'Confirmar',
      handler: data => {
        console.log('Checkbox data:', data);

        for(let asignatura of alert.data.inputs){
          if(asignatura.checked==false){
            this.asignaturasNoDisponibles.push(asignatura.value);
          }
        }
        console.log("asignaturas no disp"+this.asignaturasNoDisponibles);
        //console.log(this.asignaturasDisponibles.indexOf("programacion") > -1);

        if(this.asignaturasDisponibles!=null){
            let siguiente=0;
            for(let asignatura of this.asignaturasNoDisponibles){

              if(this.asignaturasDisponibles.indexOf(this.asignaturasNoDisponibles[siguiente])>-1){
                console.log("Se ha removido: "+this.asignaturasNoDisponibles[siguiente]);

                this.afDatabase.object('asignaturas/'+this.asignaturasNoDisponibles[siguiente]+'/'+this.userID).remove();
                console.log("Se ha removido: "+this.asignaturasNoDisponibles[siguiente]);

              }
              siguiente=siguiente+1;

            }
        }

        this.afAuth.authState.take(1).subscribe(auth => {

          for(let asignatura of data){

            this.afDatabase.object('asignaturas/'+asignatura).update({[auth.uid]:true});


          }
          this.afDatabase.object(`profile/${auth.uid}/asignaturas`).set(data);

        });
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
        this.asignaturasNoDisponibles=[];
      }
    });
    alert.present();
  }

}
